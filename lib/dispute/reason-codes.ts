import { Processor, ReasonCategory } from '@prisma/client'

export function getProcessorRules(
  processor: Processor,
  category: ReasonCategory
): string {
  const rules: Record<Processor, string> = {
    XENDIT: `Xendit disputes follow Bank Indonesia (BI) and card network rules.
Evidence must be submitted within 30 days.
Supporting docs: transaction receipt, delivery proof, communication logs.`,
    MIDTRANS: `Midtrans (GoTo Financial) disputes follow Indonesian payment regulations.
Merchant has 21 days to respond. Submit via Midtrans dashboard.
Required: transaction ID, IP log, delivery confirmation.`,
    STRIPE: `Stripe follows Visa/Mastercard dispute resolution framework.
Evidence window: 7-21 days depending on card network.
Visa: Dispute Resolution Rules sections 5.1-5.3.
Mastercard: Chargeback Guide sections 4.1-4.5.`,
    PAYMONGO: `PayMongo (Philippines) disputes follow BSP Circular 649 and card network rules.
Response window: 30 days from notification.
Evidence must include transaction receipts and customer communication.`,
    IPAY88: `iPay88 (Malaysia) disputes follow BNM guidelines and Visa/Mastercard rules.
Submit evidence within 30 calendar days.
Required: transaction receipt, IP address log, delivery confirmation.`,
    TWOC2P: `2C2P (Thailand/SEA) disputes follow Bank of Thailand regulations.
Response window: 20 business days.
Required: original transaction data, authorization codes, delivery evidence.`,
  }
  return rules[processor] || 'Follow standard Visa/Mastercard chargeback rules.'
}

export function getWinningStrategy(category: ReasonCategory): string {
  const strategies: Record<ReasonCategory, string> = {
    PRODUCT_NOT_RECEIVED: `WINNING STRATEGY — Product Not Received:
1. Lead with tracking/delivery confirmation showing successful delivery
2. Include IP address and device fingerprint at purchase time
3. Show any customer communication AFTER claimed non-delivery date
4. Reference Visa Rule 11.2: cardholder failed to contact merchant first
5. If signature required: attach signed delivery receipt
6. If digital: attach download/access logs with timestamps`,

    ITEM_NOT_AS_DESCRIBED: `WINNING STRATEGY — Item Not As Described:
1. Quote product listing EXACTLY as it appeared at time of purchase
2. Show screenshots of product page at purchase date
3. Demonstrate material difference claim is false
4. Include any positive reviews from same customer
5. Show refund policy was clearly visible
6. Reference Visa Rule 11.3: cardholder must return item before chargeback`,

    UNAUTHORIZED: `WINNING STRATEGY — Unauthorized Transaction:
1. IP address match to cardholder's known location
2. Device fingerprint consistency with previous orders
3. Shipping/billing address match
4. 3DS authentication data if available
5. Previous purchases from same device/card
6. Reference Mastercard Rule 4.2.1: transaction properly authenticated`,

    DUPLICATE: `WINNING STRATEGY — Duplicate Transaction:
1. Show transaction IDs are unique — different authorization codes
2. Show different purchase timestamps
3. Show different items/amounts if applicable
4. Bank statements often show both charges as intentional
5. Include authorization response codes for both transactions`,

    SUBSCRIPTION_CANCELLED: `WINNING STRATEGY — Subscription Cancelled:
1. Show subscription was active at charge date
2. Cancellation policy was disclosed at signup
3. Include cancel confirmation timestamp vs charge date
4. Show service was provided during paid period
5. Reference any emails confirming active subscription`,

    CREDIT_NOT_PROCESSED: `WINNING STRATEGY — Credit Not Processed:
1. Show refund was processed (include transaction ID)
2. Provide refund authorization code
3. Note typical bank processing time (3-7 days)
4. If no refund: explain why (e.g., outside refund window, policy terms met)`,

    FRIENDLY_FRAUD: `WINNING STRATEGY — Friendly Fraud (Chargeback after receipt):
1. This is your strongest case — lead with delivery proof
2. Customer communication showing satisfaction/use of product
3. IP address and device data showing purchase was intentional
4. Return/refund policy was never invoked before chargeback
5. Social media activity from customer showing product use (if available)
6. Reference Visa Dispute Resolution Rules: compelling evidence standard`,

    GENERAL: `WINNING STRATEGY — General Dispute:
1. Compile all available transaction evidence
2. Customer communication logs
3. IP and device data
4. Product/service delivery confirmation
5. Clear timeline of events`,
  }
  return strategies[category] || strategies.GENERAL
}

export const reasonCodeLabels: Record<ReasonCategory, string> = {
  PRODUCT_NOT_RECEIVED: 'Product Not Received',
  ITEM_NOT_AS_DESCRIBED: 'Item Not As Described',
  UNAUTHORIZED: 'Unauthorized Transaction',
  DUPLICATE: 'Duplicate Charge',
  SUBSCRIPTION_CANCELLED: 'Subscription Cancelled',
  CREDIT_NOT_PROCESSED: 'Credit Not Processed',
  FRIENDLY_FRAUD: 'Friendly Fraud',
  GENERAL: 'General Dispute',
}
