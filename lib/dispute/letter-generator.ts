import { anthropic } from '@/lib/anthropic'
import { getProcessorRules, getWinningStrategy } from './reason-codes'
import { Dispute, Evidence, Processor, ReasonCategory } from '@prisma/client'

type DisputeWithEvidence = Dispute & { evidence: Evidence[] }

function buildSystemPrompt(dispute: DisputeWithEvidence): string {
  return `You are a world-class chargeback dispute specialist with a documented 70%+ win rate across thousands of Southeast Asian merchant disputes. You know Visa, Mastercard, and every regional processor's dispute resolution rules deeply.

PROCESSOR: ${dispute.processor}
COUNTRY: ${dispute.country}
REASON CODE: ${dispute.reasonCode}
REASON CATEGORY: ${dispute.reasonCategory}

PROCESSOR-SPECIFIC RULES:
${getProcessorRules(dispute.processor, dispute.reasonCategory)}

WINNING STRATEGY FOR "${dispute.reasonCategory}":
${getWinningStrategy(dispute.reasonCategory)}

MANDATORY LETTER FORMAT:
1. Date + Reference number (use Dispute ID) + To/From headers
2. Subject line: "FORMAL CHARGEBACK REBUTTAL — [DISPUTE ID]"
3. Opening: Professional, assertive statement of intent to dispute
4. Evidence section: Numbered list, each point citing specific evidence
5. Legal argument: Reference Visa/Mastercard dispute resolution rules by name
6. Closing: Explicit request for reversal, acknowledge deadline
7. Professional signature block

RULES:
- Never admit fault, never apologize
- Always reference card network rules (Visa Core Rules, Mastercard Rules) by name
- Every claim must cite specific evidence
- Be assertive but professional throughout
- Maximum 600 words for letter body
- Write as if a seasoned disputes attorney wrote this`
}

function buildUserPrompt(dispute: DisputeWithEvidence): string {
  return `GENERATE THE COMPLETE DISPUTE REBUTTAL LETTER:

TRANSACTION:
Amount: ${dispute.currency} ${dispute.amount}
Transaction Date: ${new Date(dispute.transactionDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
Chargeback Date: ${new Date(dispute.chargebackDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
Response Deadline: ${new Date(dispute.evidenceDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
Customer: ${dispute.customerEmail || 'Cardholder'}
Processor Dispute ID: ${dispute.processorDisputeId}
Dispute Reason: ${dispute.reasonDescription || dispute.reasonCategory}

EVIDENCE ON FILE:
${dispute.evidence.map((e, i) => `${i + 1}. ${e.type.replace(/_/g, ' ')}: ${e.content}`).join('\n')}

Write the complete, ready-to-submit dispute letter now.`
}

export async function generateDisputeLetter(dispute: DisputeWithEvidence): Promise<string> {
  const systemPrompt = buildSystemPrompt(dispute)
  const userPrompt = buildUserPrompt(dispute)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: systemPrompt + '\n\n---\n\n' + userPrompt,
    }],
  })

  return response.content[0].type === 'text' ? response.content[0].text : ''
}

export async function translateLetter(letter: string, language: string): Promise<string> {
  const langNames: Record<string, string> = {
    'id': 'formal Bahasa Indonesia',
    'th': 'formal Thai',
    'tl': 'formal Filipino (Tagalog)',
    'ms': 'formal Bahasa Melayu',
  }

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2500,
    messages: [{
      role: 'user',
      content: `Translate this dispute letter to ${langNames[language] || language}.

Rules:
- Maintain formal business/legal tone throughout
- Preserve ALL reference numbers, dates, and amounts EXACTLY as written (do not translate these)
- Keep any English legal citations (e.g., "Visa Core Rules 11.2") unchanged
- Adapt formal address conventions for ${language} business culture

LETTER TO TRANSLATE:
${letter}`,
    }],
  })

  return response.content[0].type === 'text' ? response.content[0].text : letter
}

export async function generatePreventionInsights(
  recentDisputes: { reasonCategory: string; status: string }[]
): Promise<string[]> {
  const summary = recentDisputes.reduce<Record<string, number>>((acc, d) => {
    acc[d.reasonCategory] = (acc[d.reasonCategory] || 0) + 1
    return acc
  }, {})

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Based on these recent chargeback reasons for an Asian e-commerce merchant:
${Object.entries(summary).map(([k, v]) => `- ${k}: ${v} disputes`).join('\n')}

Generate exactly 5 specific, actionable prevention recommendations.
Each recommendation should be 1-2 sentences, practical, and directly address the top dispute reasons.
Return as a JSON array of strings only, no other text.`,
    }],
  })

  try {
    const text = response.content[0].type === 'text' ? response.content[0].text : '[]'
    return JSON.parse(text.match(/\[[\s\S]*\]/)?.[0] || '[]')
  } catch {
    return [
      'Add delivery confirmation requirements for orders over $100.',
      'Implement 3DS authentication for all card transactions.',
      'Send post-delivery satisfaction emails within 24 hours.',
      'Clearly display your refund policy on the checkout page.',
      'Require signature confirmation for high-value shipments.',
    ]
  }
}
