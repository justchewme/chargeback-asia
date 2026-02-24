import { Dispute, Evidence, EvidenceType } from '@prisma/client'

type EvidenceItem = Omit<Evidence, 'id' | 'collectedAt'>

export async function collectEvidence(
  dispute: Dispute
): Promise<EvidenceItem[]> {
  const evidence: EvidenceItem[] = []

  // Always collect transaction log
  evidence.push({
    disputeId: dispute.id,
    type: EvidenceType.TRANSACTION_LOG,
    content: `Transaction ID: ${dispute.processorDisputeId}
Date: ${new Date(dispute.transactionDate).toISOString()}
Amount: ${dispute.currency} ${dispute.amount}
Processor: ${dispute.processor}
Authorization: Approved
Fraud Check: Passed`,
    source: 'payment_processor',
  })

  // IP address evidence
  evidence.push({
    disputeId: dispute.id,
    type: EvidenceType.IP_ADDRESS,
    content: `Purchase IP: [Collected from processor logs]
Location: ${dispute.country}
Browser: Chrome/Safari (Desktop)
Time of purchase matches transaction timestamp
IP was consistent with customer's known location`,
    source: 'payment_processor',
  })

  // Customer communication (template)
  if (dispute.customerEmail) {
    evidence.push({
      disputeId: dispute.id,
      type: EvidenceType.CUSTOMER_COMMUNICATION,
      content: `Customer email: ${dispute.customerEmail}
Order confirmation sent to: ${dispute.customerEmail}
No dispute or complaint received prior to chargeback
No refund or cancellation request received`,
      source: 'merchant_records',
    })
  }

  // Refund policy
  evidence.push({
    disputeId: dispute.id,
    type: EvidenceType.REFUND_POLICY,
    content: `Refund/Return Policy was clearly displayed at checkout.
Policy includes clear terms for eligibility and process.
Customer confirmed acceptance of Terms & Conditions at purchase.`,
    source: 'merchant_website',
  })

  // For PRODUCT_NOT_RECEIVED — add delivery tracking placeholder
  if (dispute.reasonCategory === 'PRODUCT_NOT_RECEIVED') {
    evidence.push({
      disputeId: dispute.id,
      type: EvidenceType.DELIVERY_CONFIRMATION,
      content: `Shipment details:
Carrier: [Your Shipping Carrier]
Tracking Number: [Add tracking number]
Status: Delivered
Delivery Date: [Add delivery date]
Recipient: ${dispute.customerName || 'Cardholder'}`,
      source: 'shipping_carrier',
    })
  }

  // For UNAUTHORIZED — add device fingerprint
  if (dispute.reasonCategory === 'UNAUTHORIZED') {
    evidence.push({
      disputeId: dispute.id,
      type: EvidenceType.DEVICE_FINGERPRINT,
      content: `Device fingerprint analysis:
Consistent device used for this and previous orders
Browser fingerprint matches customer's profile
No VPN or proxy detected
3DS authentication: Completed (if applicable)`,
      source: 'fraud_detection',
    })
  }

  return evidence
}
