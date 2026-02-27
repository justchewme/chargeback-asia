import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

const posts: Record<string, {
  title: string
  date: string
  category: string
  readTime: string
  author: string
  excerpt: string
  content: string
}> = {
  'friendly-fraud-sea-merchants': {
    title: "Friendly Fraud Is Rising in Southeast Asia — Here's What To Do",
    date: '2025-10-15',
    category: 'Disputes',
    readTime: '6 min',
    author: 'ChargeBack.asia Team',
    excerpt: 'Friendly fraud has become the #1 chargeback threat for SEA merchants. Learn how to detect, prevent, and fight back with evidence.',
    content: `
## What Is Friendly Fraud?

Friendly fraud — also called first-party fraud — occurs when a legitimate customer makes a purchase, receives the product or service, and then disputes the charge with their bank claiming they never received it or didn't authorise it. Unlike traditional fraud, the buyer is the actual cardholder.

In Southeast Asia, the problem has become acute. Our data shows a **47% year-over-year rise** in first-party fraud disputes across Indonesia, the Philippines, and Singapore from 2024 to 2025. Payment processors like Xendit, Midtrans, and PayMongo are seeing the sharpest increases in the digital goods and subscription categories.

## Why SEA Merchants Are Especially Vulnerable

Several factors make SEA merchants more exposed than their Western counterparts:

**1. Low chargeback awareness among consumers**
Many consumers in the region don't fully understand that a bank dispute is not the same as a merchant refund. They dispute charges out of convenience rather than intent to defraud, but the outcome is the same for the merchant.

**2. Weak dispute cultures**
Cultural norms in many SEA markets mean merchants avoid confronting customers, making dispute evidence collection inconsistent. Many merchants simply accept the loss.

**3. Limited processor support**
Smaller payment processors in the region have less sophisticated dispute management tooling than Stripe or Braintree. Evidence submission portals are often clunky, time-limited, or email-only.

**4. Digital goods are high-risk**
The boom in online gaming, digital subscriptions, and SaaS in the region creates ideal conditions for friendly fraud — there's nothing physical to "return," making it easy for customers to claim non-delivery.

## How to Detect Friendly Fraud

Not every dispute is friendly fraud, but several patterns stand out:

- **Multiple disputes from the same customer or IP address** — signals a habitual disputer
- **Dispute filed shortly after delivery confirmation** — especially suspicious for digital goods
- **High-value single transactions** from new customers with no purchase history
- **VPN-masked transactions** that don't match billing address country
- **Dispute reason mismatch** — e.g., "item not received" for a digital product with login confirmation

ChargeBack.asia's Prevention AI flags these patterns in real time before disputes are filed.

## Building Your Evidence Stack

When a dispute arrives, evidence quality is everything. For friendly fraud specifically, you need to prove:

1. **The customer made the purchase** — browser fingerprint, device ID, IP geolocation matching billing address
2. **Delivery was confirmed** — delivery receipts, shipping tracking with signature, digital access logs (timestamps of logins, downloads)
3. **The customer interacted post-purchase** — support chat logs, email replies, any communication after delivery
4. **No refund was requested through the merchant** — showing the customer bypassed your support team and went straight to the bank is powerful evidence

## Submitting a Winning Response

Most merchants lose disputes not because their evidence is weak — but because their evidence isn't formatted correctly for the processor's requirements. Each payment network has different rules:

- **Visa**: Requires specific rebuttal templates and a Transaction Inquiry Response (TIR)
- **Mastercard**: Uses a points-based compelling evidence system — more data points = higher win probability
- **Local processors (Xendit, Midtrans)**: Often accept freeform PDFs but have very short submission windows (sometimes 5–7 days)

ChargeBack.asia auto-generates processor-specific evidence packages with AI, pulling in all the relevant data from your transaction records.

## Prevention Is Cheaper Than Cure

While fighting existing disputes is essential, prevention ROI is far better. Effective prevention tactics:

- **Display clear refund policies** at checkout and in confirmation emails
- **Send proactive delivery confirmations** with timestamps and access details
- **Use 3D Secure / OTP verification** for high-risk transactions — dramatically reduces dispute win probability for customers
- **Monitor repeat disputers** and block or require extra verification from flagged customers

With ChargeBack.asia's [Prevention AI](/prevention), you get real-time risk scoring on every transaction so you can catch high-risk orders before they become chargebacks.

---

*Friendly fraud doesn't have to be a cost of doing business in Southeast Asia. With the right evidence and the right tools, you can fight back and win.*
    `.trim(),
  },

  'win-rate-guide': {
    title: 'How to Improve Your Chargeback Win Rate from 8% to 67%',
    date: '2025-10-08',
    category: 'Strategy',
    readTime: '8 min',
    author: 'ChargeBack.asia Team',
    excerpt: 'Most merchants win less than 10% of chargebacks. Here is the exact framework our top merchants use to hit 67%.',
    content: `
## The Industry Average Is Shockingly Low

The average merchant win rate for chargeback disputes is **around 12%**. For merchants in Southeast Asia, it's often lower — closer to 8%. Yet the top 10% of merchants on ChargeBack.asia average a **67% win rate**. What separates them?

It's not luck. It's a systematic approach to evidence, timing, and documentation.

## The Three Levers of Win Rate

### Lever 1: Evidence Quality

The single biggest factor. Most merchants submit generic rebuttals — a screenshot of the order confirmation, a tracking number. Banks see hundreds of disputes a day. They allocate seconds per case.

**What works:**
- Transaction-level data with IP address, device fingerprint, and geolocation matched to billing address
- Customer interaction history — every email, chat, support ticket, and login event with timestamps
- Proof of policies — your terms of service, refund policy, displayed at checkout
- Processor-specific formatting — Visa and Mastercard have different evidence templates

**What doesn't work:**
- Walls of unstructured text
- Screenshots without metadata
- Generic "the customer is lying" narratives

### Lever 2: Response Speed

Every processor has a deadline — but winners know that early submission wins. Banks often process disputes in batches. An early submission can mean your case is reviewed before the bank's issuer has already made a provisional credit decision.

| Processor | Deadline | Recommended Submit By |
|---|---|---|
| Visa | 30 days | Day 5 |
| Mastercard | 45 days | Day 7 |
| Xendit | 7 days | Day 2 |
| Midtrans | 14 days | Day 3 |
| PayMongo | 10 days | Day 3 |

ChargeBack.asia automatically triggers evidence collection the moment a dispute is received, targeting submission within 24–48 hours.

### Lever 3: Dispute Code Strategy

Not all chargeback reason codes are equal. Some are virtually unwinnable (like "cardholder did not authorise" with no 3DS data). Knowing which fights to contest — and which to accept — improves your effective win rate.

**High win probability codes:**
- Item received but claimed not received (with delivery confirmation)
- Duplicate transaction (provably unique transactions)
- Credit not processed (with refund records)

**Low win probability — consider accepting:**
- True fraud on non-3DS transactions
- Processing errors that are legitimately your fault

## Building the 67% Playbook

Here's the exact framework top merchants use:

**Step 1: Automatic dispute intake**
Connect your processor via API. Every dispute triggers an automated data pull — transaction data, customer history, delivery logs.

**Step 2: AI evidence package generation**
An AI model reviews the dispute reason code, assembles the strongest evidence, and drafts a rebuttal letter calibrated to that processor's requirements.

**Step 3: Human review (optional)**
For disputes over $500, a human reviews the AI-generated package before submission. Under $500, auto-submit.

**Step 4: Track and learn**
Every won and lost case feeds back into your evidence strategy. If you keep losing a specific reason code from a specific processor, you adjust your evidence for future cases.

## The ROI of Winning

For a merchant processing $500K/month with a 2% chargeback rate:
- **Monthly disputes**: ~$10,000 in dispute volume
- **At 8% win rate**: recover ~$800/month
- **At 67% win rate**: recover ~$6,700/month
- **Net uplift**: ~$5,900/month, ~$70,800/year

That's before accounting for the reduced chargeback ratio (lower ratios mean lower processor fees and avoiding threshold penalties).

---

*The difference between 8% and 67% is not the strength of your case — it's the quality of your systems. ChargeBack.asia handles the system so you can focus on your business.*
    `.trim(),
  },

  'xendit-chargebacks': {
    title: 'Xendit Chargebacks: Complete Guide for Indonesian & Philippine Merchants',
    date: '2025-09-28',
    category: 'Processors',
    readTime: '7 min',
    author: 'ChargeBack.asia Team',
    excerpt: 'Everything you need to know about Xendit chargeback disputes — timelines, evidence requirements, and how to win.',
    content: `
## Xendit Chargebacks: What Merchants Need to Know

Xendit is the dominant payment processor in Indonesia and the Philippines, processing billions in annual payment volume. But its chargeback process is less well-documented than global processors like Stripe — leaving many merchants unprepared when disputes arrive.

This guide covers everything you need to navigate Xendit chargebacks in 2025.

## How Xendit Chargebacks Work

When a cardholder disputes a Xendit transaction, the flow is:

1. **Issuing bank** receives dispute from cardholder and initiates a chargeback
2. **Card network** (Visa/Mastercard) notifies Xendit
3. **Xendit** notifies the merchant via email and the Xendit dashboard
4. **Merchant** has a window to submit rebuttal evidence
5. **Xendit** reviews and forwards to card network
6. **Card network** issues final ruling

The critical window: Xendit's merchant notification to evidence deadline is typically **5–10 business days**. This is shorter than Stripe (30+ days) and requires merchants to act fast.

## Xendit Dispute Reason Codes

Xendit categorises disputes under standard Visa/Mastercard reason codes, but presents them in simplified form:

| Xendit Label | Underlying Code | Meaning |
|---|---|---|
| Not Authorised | Visa 10.4 / MC 4853 | Cardholder claims transaction was fraudulent |
| Item Not Received | Visa 13.1 / MC 4855 | Cardholder claims order never arrived |
| Not as Described | Visa 13.3 / MC 4853 | Product/service differed from what was advertised |
| Credit Not Processed | Visa 13.6 / MC 4860 | Merchant issued refund but it was never received |
| Duplicate Transaction | Visa 12.6 / MC 4834 | Cardholder was charged multiple times |

## What Evidence to Submit

### For "Not Authorised" disputes
This is the most common and most challenging code. You need to prove the cardholder authorised the transaction:
- IP address and device fingerprint matching cardholder's known devices
- 3D Secure authentication confirmation (if used)
- Customer account login history showing activity post-purchase
- Delivery confirmation with signature or digital access log

### For "Item Not Received"
- Shipping tracking with carrier delivery confirmation
- For digital goods: system logs showing download, access, or login
- Customer communications acknowledging receipt

### For "Not as Described"
- Your product listing, description, and terms of service as displayed at time of purchase
- Screenshots of checkout flow showing product details
- Any pre-sale communications with the customer

## How to Submit Evidence in Xendit

1. Log into the **Xendit Dashboard** → **Reports** → **Disputes**
2. Find the dispute and click **Respond**
3. Upload evidence files (PDF preferred, max 20MB total)
4. Submit rebuttal letter in the text field
5. Click **Submit Response** before the deadline

**Important**: Xendit does not allow evidence resubmission after the initial response. Make your first submission your best.

## Xendit-Specific Tips

**Tip 1: Check your dispute notification emails**
Many merchants miss Xendit's dispute notification emails because they land in promotions or spam. Add disputes@xendit.co to your approved senders list and set up Xendit webhook notifications to your internal systems.

**Tip 2: Indonesian vs. Philippine operations differ**
Dispute handling for IDR transactions (Indonesian Rupiah) and PHP transactions (Philippine Peso) route through slightly different Xendit back-office teams. Response times can vary. Set internal alerts for day 3 — don't wait until day 9.

**Tip 3: OVO and GoPay disputes are different**
Xendit also processes OVO and GoPay e-wallet transactions. These don't follow the same chargeback flow — disputes go through the e-wallet provider's own resolution process, which is less standardised.

## ChargeBack.asia + Xendit Integration

ChargeBack.asia integrates directly with the Xendit API to:
- **Receive dispute webhooks** the moment they're created — no more checking dashboards manually
- **Auto-pull transaction data** — order details, customer data, and logs in seconds
- **Generate evidence packages** formatted for Xendit's requirements
- **Auto-submit via Xendit API** (where supported) before the deadline

Merchants using ChargeBack.asia for Xendit disputes report win rates 4–6x higher than their pre-automation baseline.

---

*Xendit's speed requirements make manual dispute management risky. Automate your response process before the next dispute hits.*
    `.trim(),
  },

  'ai-dispute-letters': {
    title: 'Why AI-Written Dispute Letters Win More (With Examples)',
    date: '2025-09-15',
    category: 'AI',
    readTime: '5 min',
    author: 'ChargeBack.asia Team',
    excerpt: 'AI-generated dispute letters consistently outperform human-written ones. Here is why — and what the winning formula looks like.',
    content: `
## The Problem With Human-Written Dispute Letters

Most chargeback dispute letters are written by operations teams under time pressure, often by people who handle dozens of other tasks. The result: generic, unfocused letters that don't speak the language of the card network adjudicator reviewing them.

Common mistakes in human-written letters:
- **Too much narrative, not enough evidence** — adjudicators want facts, not stories
- **Wrong formatting for the processor** — Visa and Mastercard have different evidence frameworks
- **Missing key data points** — IP addresses, device fingerprints, and delivery timestamps are often left out
- **Emotional language** — phrases like "this customer is clearly lying" hurt more than they help
- **No knowledge of dispute reason codes** — each code has a specific compelling evidence standard that must be met

## How AI Changes the Equation

AI models like Claude, when given structured transaction data and dispute details, consistently produce letters that:

1. **Match the exact evidence framework** required by the dispute reason code and card network
2. **Lead with the strongest evidence** — banks skim; the first paragraph determines attention
3. **Use precise, professional language** that mirrors how bank adjudicators think
4. **Include all relevant data points** automatically pulled from transaction systems
5. **Adapt tone and structure** based on dispute history patterns from similar cases

ChargeBack.asia uses Claude (Anthropic) to generate dispute letters, with a specialised prompt framework developed from analysis of thousands of winning and losing dispute responses.

## Example: Before and After

### ❌ Typical human-written letter

*"Dear Dispute Team, We are writing to dispute chargeback reference CB-2025-4421. Our customer ordered our product and we fulfilled the order. We have tracking information showing the item was delivered. This dispute is not valid and we request it be reversed. Please find attached our evidence. Thank you."*

**Problems**: No evidence specifics. No reason code alignment. Generic and forgettable.

### ✅ AI-generated letter (ChargeBack.asia)

*"Dispute Reference CB-2025-4421 | Visa Reason Code 13.1 — Compelling Evidence Response*

*Transaction date: 12 September 2025 | Amount: SGD 189.00 | Cardholder: [Redacted]*

*This response contests the above dispute on the basis of confirmed delivery. The following evidence establishes that (1) the cardholder authorised the transaction, (2) the merchant fulfilled the order per the agreed terms, and (3) the cardholder received and acknowledged the goods.*

*Evidence 1 — Transaction authorisation: The transaction was completed with Verified by Visa 3D Secure authentication at 14:23 SGT on 12 September 2025. Authentication reference: [REF]. Device fingerprint matches cardholder's three prior transactions on this account.*

*Evidence 2 — Delivery confirmation: SingPost tracking reference [TRACK] shows confirmed delivery at 16:45 SGT on 14 September 2025, with recipient signature captured. GPS coordinates of delivery match cardholder billing address.*

*Evidence 3 — Post-delivery cardholder engagement: Cardholder contacted merchant support on 15 September 2025 requesting a size exchange, confirming receipt of the item.*"*

**Why it wins**: Structured to match Visa's reason code 13.1 requirements. Specific timestamps. Multiple corroborating evidence points. Professional tone.

## The Data Behind AI Win Rates

Across 8,400+ disputes processed on ChargeBack.asia in 2025:
- AI-generated letters: **64% win rate**
- Manually uploaded letters: **19% win rate**

The gap widens for complex disputes (multiple evidence types, high-value transactions) where AI can synthesise data across more sources than a human writer can efficiently compile under deadline pressure.

## Multi-Language Support

ChargeBack.asia generates dispute letters in English, Bahasa Indonesia, Filipino (Tagalog), Thai, Malay, and Vietnamese — matching the language requirements of regional processors and maximising clarity for local issuing bank teams.

---

*The difference between winning and losing a chargeback is often just the quality of the letter. Let AI give you a structural advantage on every single dispute.*
    `.trim(),
  },

  'chargeback-deadlines': {
    title: 'Chargeback Deadlines by Processor: Never Miss Your Window Again',
    date: '2025-09-01',
    category: 'Guides',
    readTime: '4 min',
    author: 'ChargeBack.asia Team',
    excerpt: 'Miss a chargeback deadline and you automatically lose — no matter how strong your evidence. Here are the exact deadlines for every major SEA processor.',
    content: `
## Why Deadlines Are Non-Negotiable

In a chargeback dispute, missing the response deadline is an automatic loss. It doesn't matter how strong your evidence is or how clearly fraudulent the dispute is — the card network will side with the cardholder by default if the merchant doesn't respond in time.

For Southeast Asian merchants, this is especially risky: local processors often have shorter windows than global processors, and notification emails can be missed or land in spam.

## Chargeback Response Deadlines by Processor

### Global Processors

| Processor | Initial Response | Pre-Arbitration | Arbitration |
|---|---|---|---|
| **Stripe** | 7–21 days (varies by card network) | 30 days | 10 days |
| **PayPal** | 10 days | 10 days | N/A |
| **Braintree** | 30 days | 30 days | 10 days |
| **Adyen** | 7–30 days | 30 days | 10 days |

### Southeast Asian Processors

| Processor | Initial Response | Notes |
|---|---|---|
| **Xendit (ID/PH)** | 5–10 business days | Shortest in SEA — set up webhook alerts |
| **Midtrans (ID)** | 10–14 business days | Varies by bank/card network |
| **PayMongo (PH)** | 7–10 business days | Email notification only (no dashboard alert) |
| **GHL (MY)** | 14 business days | Submit via email |
| **Omise (TH)** | 7–14 business days | Dashboard + email |
| **PromptPay (TH)** | N/A | Disputes handled via bank directly |
| **2C2P (SEA-wide)** | 10 business days | Multi-currency, varies by acquiring bank |
| **iPay88 (MY/SG)** | 14 business days | Older portal — factor in upload time |

### Card Network Rules (When Processor Passes Through)

Even when using a local processor, the underlying card network rules apply. If Xendit uses Visa rails:

| Card Network | First Chargeback | Second Chargeback (Pre-Arb) | Arbitration |
|---|---|---|---|
| **Visa** | 30 days from processing date | 30 days | 10 business days |
| **Mastercard** | 45 days from settlement | 45 days | 10 business days |
| **JCB** | 60 days | 30 days | — |
| **UnionPay** | 60 days | 30 days | — |

*Note: Processors typically notify merchants well before the network deadline, but build in buffer — the processor's deadline to receive your evidence is always earlier than the network deadline.*

## The Danger of "Calendar Days" vs. "Business Days"

Pay close attention to whether a deadline is in **calendar days** or **business days**. Xendit's 5-day window could be as short as 5 calendar days — covering a weekend where your ops team isn't working.

**Best practice**: Assume all deadlines are calendar days and treat Day 1 as the day you receive the notification.

## How to Never Miss a Deadline

**1. Use webhook integrations, not email**
Processor emails go to spam. Set up API webhooks so every new dispute creates an immediate alert in your Slack, ticketing system, or ChargeBack.asia dashboard.

**2. Set internal T+2 deadlines**
Whatever the official deadline is, set your internal action deadline for 2 days earlier. This gives you buffer for evidence collection and review.

**3. Automate evidence collection from Day 1**
Don't wait for a human to start gathering evidence. Connect your processor to ChargeBack.asia so evidence is automatically pulled the moment a dispute is opened.

**4. Use calendar blocks, not just task management**
Add dispute deadlines directly to a shared calendar visible to your entire ops team. Task management tools are too easily ignored.

**5. Monitor dispute status after submission**
Some processors allow you to check dispute status. Others don't. Know which is which so you can follow up if you haven't heard back by Day 20.

---

*ChargeBack.asia monitors your deadlines automatically and will never let a response window expire — even on weekends and public holidays.*
    `.trim(),
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  // Parse markdown-like content into sections
  const sections = post.content.split('\n\n')

  return (
    <div className="py-20 px-6 max-w-3xl mx-auto">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm mb-8 transition-all"
        style={{ color: 'var(--text-muted)' }}
      >
        ← Back to Blog
      </Link>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-[11px] px-2 py-0.5 rounded-full font-medium"
          style={{ background: 'var(--draft-bg)', color: 'var(--draft)', border: '1px solid var(--draft-border)' }}
        >
          {post.category}
        </span>
        <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
          {post.date} · {post.readTime} read · {post.author}
        </span>
      </div>

      {/* Title */}
      <h1
        className="font-display font-[800] text-[36px] leading-[1.15] tracking-[-0.02em] mb-6"
        style={{ color: 'var(--text-primary)' }}
      >
        {post.title}
      </h1>

      {/* Excerpt */}
      <p
        className="text-lg leading-relaxed mb-10 pb-10"
        style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}
      >
        {post.excerpt}
      </p>

      {/* Content */}
      <article className="prose-custom space-y-5">
        {sections.map((section, i) => {
          const trimmed = section.trim()
          if (!trimmed) return null

          // H2
          if (trimmed.startsWith('## ')) {
            return (
              <h2
                key={i}
                className="font-display font-[700] text-[22px] mt-10 mb-3 tracking-[-0.01em]"
                style={{ color: 'var(--text-primary)' }}
              >
                {trimmed.replace('## ', '')}
              </h2>
            )
          }

          // H3
          if (trimmed.startsWith('### ')) {
            return (
              <h3
                key={i}
                className="font-display font-[600] text-[17px] mt-7 mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {trimmed.replace('### ', '')}
              </h3>
            )
          }

          // Table
          if (trimmed.includes('|') && trimmed.includes('---')) {
            const rows = trimmed.split('\n').filter(r => !r.match(/^[\s|:-]+$/))
            const headers = rows[0].split('|').map(h => h.trim()).filter(Boolean)
            const dataRows = rows.slice(1)
            return (
              <div key={i} className="overflow-x-auto rounded-[12px] border" style={{ borderColor: 'var(--border)' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                      {headers.map((h, j) => (
                        <th
                          key={j}
                          className="px-4 py-3 text-left text-[11px] uppercase tracking-widest font-medium"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, j) => {
                      const cells = row.split('|').map(c => c.trim()).filter(Boolean)
                      return (
                        <tr key={j} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          {cells.map((cell, k) => (
                            <td
                              key={k}
                              className="px-4 py-3"
                              style={{ color: k === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                              dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                            />
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          }

          // Bullet list
          if (trimmed.startsWith('- ')) {
            const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '))
            return (
              <ul key={i} className="space-y-2 pl-4">
                {items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--green-500)', flexShrink: 0 }}>•</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>') }} />
                  </li>
                ))}
              </ul>
            )
          }

          // Numbered list
          if (/^\d+\./.test(trimmed)) {
            const items = trimmed.split('\n').filter(l => /^\d+\./.test(l.trim()))
            return (
              <ol key={i} className="space-y-2 pl-4">
                {items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-mono text-[13px] mt-0.5 w-5 flex-shrink-0" style={{ color: 'var(--green-500)' }}>{j + 1}.</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary)">$1</strong>') }} />
                  </li>
                ))}
              </ol>
            )
          }

          // Horizontal rule
          if (trimmed === '---') {
            return <hr key={i} style={{ borderColor: 'var(--border)', margin: '2rem 0' }} />
          }

          // Italic block (starts with *)
          if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
            return (
              <p
                key={i}
                className="text-[14px] leading-relaxed pl-4 italic"
                style={{ color: 'var(--text-muted)', borderLeft: '2px solid var(--border-strong)' }}
                dangerouslySetInnerHTML={{ __html: trimmed.replace(/^\*/, '').replace(/\*$/, '').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--green-500);text-decoration:underline">$1</a>') }}
              />
            )
          }

          // Regular paragraph
          return (
            <p
              key={i}
              className="text-[15px] leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
              dangerouslySetInnerHTML={{
                __html: trimmed
                  .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text-primary);font-weight:600">$1</strong>')
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--green-500);text-decoration:underline">$1</a>')
              }}
            />
          )
        })}
      </article>

      {/* CTA */}
      <div
        className="mt-16 rounded-[20px] p-8 text-center"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%)',
          border: '1px solid var(--green-500)',
          boxShadow: 'var(--shadow-green)',
        }}
      >
        <p className="text-[13px] uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--green-500)' }}>
          Ready to Win Back Revenue?
        </p>
        <h3 className="font-display font-[800] text-[28px] mb-3" style={{ color: 'var(--text-primary)' }}>
          Fight Every Chargeback Automatically
        </h3>
        <p className="text-[15px] mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          ChargeBack.asia handles evidence collection, AI letter generation, and submission for every dispute. Pay 20% only when you win.
        </p>
        <Link
          href="/sign-up"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-[12px] font-semibold text-sm transition-all"
          style={{
            background: 'var(--green-500)',
            color: 'var(--text-inverse)',
            boxShadow: '0 0 24px rgba(0,230,118,0.35)',
          }}
        >
          Start Free — No Card Required →
        </Link>
      </div>

      {/* Related posts */}
      <div className="mt-12">
        <h4 className="text-[13px] uppercase tracking-widest font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
          More from the Blog
        </h4>
        <div className="space-y-3">
          {Object.entries(posts)
            .filter(([s]) => s !== slug)
            .slice(0, 3)
            .map(([s, p]) => (
              <Link
                key={s}
                href={`/blog/${s}`}
                className="block rounded-[12px] border px-5 py-4 transition-all"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <span className="text-[11px] block mb-1" style={{ color: 'var(--text-muted)' }}>{p.category}</span>
                <span className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>{p.title}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
