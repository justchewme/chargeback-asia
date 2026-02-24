'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  CheckCircle, Clock, Send, FileText, Copy,
  Download, RefreshCw, Globe, Shield, Package,
  Mail, MapPin, Calendar, Zap, ChevronLeft, Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { format, differenceInDays } from 'date-fns'
import { btnPrimary, btnSecondary, btnGhost } from '@/lib/styles'

const MOCK_DISPUTE = {
  id: 'cb_01',
  processorDisputeId: 'DIS-2891',
  currency: 'USD',
  amount: 340,
  processor: 'STRIPE',
  reasonCategory: 'UNAUTHORIZED',
  reasonDescription: 'Cardholder claims transaction was not authorized',
  reasonCode: 'UA02',
  status: 'REVIEW_NEEDED',
  country: 'SG',
  customerEmail: 'john.doe@example.com',
  customerName: 'John Doe',
  transactionDate: new Date(Date.now() - 1000*60*60*24*10),
  chargebackDate: new Date(Date.now() - 1000*60*60*24*3),
  evidenceDeadline: new Date(Date.now() + 1000*60*60*24*4),
  riskScore: 72,
  evidence: [
    { id: 'e1', type: 'TRANSACTION_LOG', content: 'Transaction ID: DIS-2891\nAuthorization: Approved\nFraud Score: Low', source: 'payment_processor' },
    { id: 'e2', type: 'IP_ADDRESS', content: 'Purchase IP: 103.21.45.7\nLocation: Singapore\nMatches billing country', source: 'payment_processor' },
    { id: 'e3', type: 'CUSTOMER_COMMUNICATION', content: 'Order confirmation sent to john.doe@example.com\nNo prior dispute filed', source: 'merchant_records' },
    { id: 'e4', type: 'DEVICE_FINGERPRINT', content: 'Consistent device fingerprint\nNo VPN/proxy detected\n3DS authentication completed', source: 'fraud_detection' },
  ],
}

const mockLetter = `[Your Business Name]
[Your Address]
Singapore

${format(new Date(), 'MMMM d, yyyy')}

Stripe Dispute Resolution Team
Stripe, Inc.

RE: FORMAL CHARGEBACK REBUTTAL — DIS-2891
Transaction Amount: USD 340.00
Dispute Reference: DIS-2891

Dear Dispute Resolution Team,

We write to formally dispute the chargeback filed against our merchant account for transaction DIS-2891, dated ${format(new Date(Date.now() - 1000*60*60*24*10), 'MMMM d, yyyy')}, in the amount of USD 340.00.

It is our position that this chargeback is without merit and that the transaction was fully authorized and legitimate. We respectfully request the immediate reversal of this chargeback based on the compelling evidence presented herein.

EVIDENCE SUPPORTING TRANSACTION LEGITIMACY:

1. TRANSACTION AUTHORIZATION: The transaction was authorized through Stripe's payment gateway with a successful authorization code. Our records confirm the payment was processed with full approval, with no indicators of fraud at the time of processing.

2. IP ADDRESS VERIFICATION: Our records confirm that the purchase was made from IP address 103.21.45.7, which geolocates to Singapore — consistent with the cardholder's registered billing address country. No VPN or proxy services were detected.

3. DEVICE CONSISTENCY: Device fingerprint analysis confirms this purchase was made from the same device used for previous successful transactions associated with this cardholder. This pattern of behavior is inconsistent with unauthorized use.

4. 3D SECURE AUTHENTICATION: This transaction completed 3D Secure (3DS) authentication successfully. Under Visa Core Rules Section 5.1.2 and Mastercard Chargeback Guide Section 4.2.1, liability shifts to the issuing bank when 3DS authentication is successfully completed.

5. NO PRIOR DISPUTE: The cardholder made no attempt to contact our customer service prior to filing this chargeback, in violation of Visa Core Rules Section 11.2 which requires cardholders to first attempt resolution with the merchant.

LEGAL BASIS FOR REVERSAL:

Pursuant to Visa Core Rules 11.2 and Mastercard Rules Section 4.1, this dispute does not meet the threshold for a valid chargeback. The evidence demonstrates that:
(a) The transaction was properly authorized
(b) The cardholder's device and IP address were consistent with known usage patterns
(c) Strong Customer Authentication (SCA) was successfully completed

We therefore respectfully but firmly request the immediate reversal of chargeback DIS-2891 and restoration of USD 340.00 to our merchant account.

Please contact us at your earliest convenience should you require any additional documentation.

Respectfully submitted,

[Your Name]
[Your Title]
[Your Business Name]
[Your Email]`

const EVIDENCE_ICONS: Record<string, React.ElementType> = {
  TRANSACTION_LOG: FileText,
  IP_ADDRESS: MapPin,
  CUSTOMER_COMMUNICATION: Mail,
  DEVICE_FINGERPRINT: Shield,
  DELIVERY_CONFIRMATION: Package,
  TRACKING_INFO: Package,
}

const languageTabs = ['EN', 'ID', 'TH', 'TL', 'MY']

export default function DisputeDetailPage() {
  const { id } = useParams()
  const d = MOCK_DISPUTE
  const [activeLang, setActiveLang] = useState('EN')
  const [copied, setCopied] = useState(false)
  const daysLeft = differenceInDays(d.evidenceDeadline, new Date())

  const handleCopy = () => {
    navigator.clipboard.writeText(mockLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Back */}
      <Link
        href="/disputes"
        className="inline-flex items-center gap-1.5 text-sm transition-colors"
        style={{ color: 'var(--text-muted)' }}
      >
        <ChevronLeft size={14} /> Back to disputes
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display font-[700] text-[22px]" style={{ color: 'var(--text-primary)' }}>
              {d.processorDisputeId}
            </h1>
            <StatusBadge status={d.status} />
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {d.reasonDescription}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-[24px] font-[700]" style={{ color: 'var(--green-400)' }}>
            {d.currency} {d.amount.toLocaleString()}
          </p>
          {daysLeft > 0 && daysLeft < 7 && (
            <span
              className="font-mono text-xs px-2.5 py-1 rounded-full"
              style={{
                background: daysLeft < 3 ? 'var(--lost-bg)' : 'var(--pending-bg)',
                border: `1px solid ${daysLeft < 3 ? 'var(--lost-border)' : 'var(--pending-border)'}`,
                color: daysLeft < 3 ? 'var(--lost)' : 'var(--pending)',
              }}
            >
              ⚡ {daysLeft}d {daysLeft < 3 ? '14h' : ''} remaining
            </span>
          )}
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* LEFT — Info + Timeline */}
        <div className="lg:col-span-3 space-y-4">
          <div
            className="rounded-[14px] border p-4 space-y-3"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Dispute Info</h3>

            {[
              { label: 'Processor', value: d.processor, icon: Zap },
              { label: 'Country', value: d.country, icon: Globe },
              { label: 'Customer', value: d.customerEmail, icon: Mail },
              { label: 'Reason Code', value: d.reasonCode, icon: FileText },
              { label: 'Transaction', value: format(d.transactionDate, 'MMM d, yyyy'), icon: Calendar },
              { label: 'Chargeback', value: format(d.chargebackDate, 'MMM d, yyyy'), icon: Calendar },
              { label: 'Deadline', value: format(d.evidenceDeadline, 'MMM d, yyyy'), icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--text-muted)' }} />
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
                  <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div
            className="rounded-[14px] border p-4"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Timeline</h3>
            <div className="space-y-3">
              {[
                { label: 'Chargeback detected', date: d.chargebackDate, status: 'done', color: 'var(--won)' },
                { label: 'Evidence collected', date: new Date(d.chargebackDate.getTime() + 1000*60*5), status: 'done', color: 'var(--won)' },
                { label: 'Letter generated (EN + ID)', date: new Date(d.chargebackDate.getTime() + 1000*60*10), status: 'done', color: 'var(--won)' },
                { label: 'Pending review / submission', date: new Date(), status: 'current', color: 'var(--pending)' },
                { label: 'Deadline', date: d.evidenceDeadline, status: 'future', color: 'var(--text-muted)' },
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-2 h-2 rounded-full mt-1 shrink-0"
                      style={{ background: step.color }}
                    />
                    {i < 4 && (
                      <div className="w-px flex-1 mt-1 min-h-[20px]" style={{ background: 'var(--border-subtle)' }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-xs font-medium" style={{ color: step.status === 'future' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                      {step.label}
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {format(step.date, 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE — Letter */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="rounded-[14px] border overflow-hidden"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {/* Tabs */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex gap-1">
                {languageTabs.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className="px-3 py-1 rounded-[6px] text-xs font-medium transition-all"
                    style={{
                      background: activeLang === lang ? 'var(--green-glow)' : 'transparent',
                      color: activeLang === lang ? 'var(--green-500)' : 'var(--text-muted)',
                      border: activeLang === lang ? '1px solid var(--green-500)' : '1px solid transparent',
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <span
                className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: 'var(--draft-bg)', color: 'var(--draft)', border: '1px solid var(--draft-border)' }}
              >
                <Sparkles size={10} /> AI Generated
              </span>
            </div>

            {/* Evidence strength bar */}
            <div
              className="px-4 py-2 flex items-center gap-3 border-b"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}
            >
              <span className="text-[11px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Evidence Strength</span>
              <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--bg-card)' }}>
                <div className="h-full rounded-full" style={{ width: '78%', background: 'var(--green-500)' }} />
              </div>
              <span className="text-xs font-mono font-medium" style={{ color: 'var(--green-500)' }}>Strong (78%)</span>
            </div>

            {/* Letter Content */}
            <div className="p-5 max-h-[520px] overflow-y-auto">
              <pre
                className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap"
                style={{ color: 'var(--text-primary)' }}
              >
                {activeLang === 'EN' ? mockLetter : `[Translation to ${activeLang} would appear here after AI generation]`}
              </pre>
            </div>

            {/* Actions */}
            <div
              className="flex flex-wrap items-center gap-2 px-4 py-3 border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <button className={btnPrimary}>
                <Send size={14} /> Submit to {d.processor}
              </button>
              <button className={btnSecondary}>
                <Download size={14} /> Download PDF
              </button>
              <button onClick={handleCopy} className={btnGhost}>
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
              </button>
              <button className={btnGhost}>
                <RefreshCw size={13} /> Regenerate
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Evidence */}
        <div className="lg:col-span-3 space-y-4">
          <div
            className="rounded-[14px] border p-4"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Evidence</h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'var(--won-bg)', color: 'var(--won)', border: '1px solid var(--won-border)' }}
              >
                {d.evidence.length} items
              </span>
            </div>

            <div className="space-y-2">
              {d.evidence.map(e => {
                const Icon = EVIDENCE_ICONS[e.type] || FileText
                return (
                  <div
                    key={e.id}
                    className="rounded-[10px] border p-3 space-y-1"
                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={12} style={{ color: 'var(--chart-blue)' }} />
                      <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {e.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                      {e.content}
                    </p>
                  </div>
                )
              })}
            </div>

            <button
              className="w-full mt-3 py-2 rounded-[10px] text-sm font-medium transition-all text-center"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                background: 'transparent',
              }}
            >
              + Collect More Evidence
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
