import { Resend } from 'resend'

export const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@chargebackasia.com'

// Lazy singleton — instantiated on first use, not at module load time
// This prevents build failures when RESEND_API_KEY is not yet set in the environment
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || 'placeholder')
  }
  return _resend
}

export async function sendDisputeDetectedEmail(
  to: string,
  dispute: {
    id: string
    currency: string
    amount: number
    processor: string
    reasonCategory: string
    evidenceDeadline: Date
    autoSubmit: boolean
  }
) {
  const deadline = new Date(dispute.evidenceDeadline).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject: `⚡ New chargeback detected — ${dispute.currency} ${dispute.amount.toLocaleString()}`,
    html: `
      <div style="background:#080E18;color:#EDF4FF;font-family:'Inter',sans-serif;padding:40px;max-width:600px;margin:0 auto;border-radius:14px;">
        <div style="margin-bottom:32px;">
          <span style="font-size:24px;font-weight:800;color:#EDF4FF;">ChargeBack</span>
          <span style="font-size:24px;font-weight:800;color:#00E676;">.asia</span>
        </div>
        <h1 style="font-size:22px;font-weight:700;margin-bottom:8px;">⚡ New Chargeback Detected</h1>
        <p style="color:#7A9FC0;margin-bottom:24px;">We've automatically detected a new chargeback and are handling it.</p>
        <div style="background:#0F1C2E;border:1px solid #1A2E47;border-radius:10px;padding:20px;margin-bottom:24px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
            <span style="color:#7A9FC0;font-size:13px;">Amount</span>
            <span style="font-family:monospace;color:#00E676;font-weight:600;">${dispute.currency} ${dispute.amount.toLocaleString()}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
            <span style="color:#7A9FC0;font-size:13px;">Processor</span>
            <span style="color:#EDF4FF;">${dispute.processor}</span>
          </div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
            <span style="color:#7A9FC0;font-size:13px;">Reason</span>
            <span style="color:#EDF4FF;">${dispute.reasonCategory.replace(/_/g, ' ')}</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:#7A9FC0;font-size:13px;">Evidence Deadline</span>
            <span style="color:#FFAA00;font-weight:600;">${deadline}</span>
          </div>
        </div>
        <p style="color:#7A9FC0;font-size:14px;margin-bottom:24px;">
          ${dispute.autoSubmit
            ? 'AI has generated and submitted your dispute letter automatically.'
            : 'AI has generated your dispute letter. Review it before submission.'
          }
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/disputes/${dispute.id}"
           style="display:inline-block;background:#00E676;color:#060B12;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">
          View Dispute →
        </a>
        <p style="color:#3D5A78;font-size:12px;margin-top:32px;">ChargeBack.asia — Win Back What's Yours</p>
      </div>
    `,
  })
}

export async function sendWonEmail(
  to: string,
  data: { disputeId: string; amount: number; currency: string; fee: number }
) {
  await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject: `🎉 Won! ${data.currency} ${data.amount.toLocaleString()} recovered`,
    html: `
      <div style="background:#080E18;color:#EDF4FF;font-family:'Inter',sans-serif;padding:40px;max-width:600px;margin:0 auto;border-radius:14px;">
        <div style="margin-bottom:32px;">
          <span style="font-size:24px;font-weight:800;color:#EDF4FF;">ChargeBack</span>
          <span style="font-size:24px;font-weight:800;color:#00E676;">.asia</span>
        </div>
        <div style="text-align:center;padding:40px 0;">
          <div style="font-size:48px;margin-bottom:16px;">🎉</div>
          <h1 style="font-size:28px;font-weight:800;color:#00E676;margin-bottom:8px;">You Won!</h1>
          <p style="font-size:40px;font-weight:800;font-family:monospace;color:#EDF4FF;">${data.currency} ${data.amount.toLocaleString()}</p>
          <p style="color:#7A9FC0;">successfully recovered</p>
        </div>
        <div style="background:#0F1C2E;border:1px solid rgba(0,230,118,0.25);border-radius:10px;padding:20px;margin-bottom:24px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
            <span style="color:#7A9FC0;">Recovered</span>
            <span style="font-family:monospace;color:#00E676;font-weight:600;">${data.currency} ${data.amount.toLocaleString()}</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:#7A9FC0;">Our fee (20%)</span>
            <span style="font-family:monospace;color:#EDF4FF;">${data.currency} ${data.fee.toLocaleString()}</span>
          </div>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/disputes/${data.disputeId}"
           style="display:inline-block;background:#00E676;color:#060B12;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">
          View Details →
        </a>
        <p style="color:#3D5A78;font-size:12px;margin-top:32px;">ChargeBack.asia — Win Back What's Yours</p>
      </div>
    `,
  })
}
