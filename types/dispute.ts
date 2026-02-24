import { Dispute, Evidence, DisputeLetter, Recovery, Processor, DisputeStatus, ReasonCategory } from '@prisma/client'

export type DisputeWithRelations = Dispute & {
  evidence: Evidence[]
  letters: DisputeLetter[]
  recovery: Recovery | null
}

export type DisputeSummary = Pick<
  Dispute,
  'id' | 'processorDisputeId' | 'processor' | 'amount' | 'currency' |
  'status' | 'reasonCategory' | 'chargebackDate' | 'evidenceDeadline' |
  'country' | 'customerEmail'
>

export interface DisputeStats {
  totalDisputes: number
  wonDisputes: number
  lostDisputes: number
  pendingDisputes: number
  winRate: number
  totalRecovered: number
  avgResponseDays: number
}

export interface ChargebackEvent {
  merchantId: string
  connectionId: string
  processorDisputeId: string
  processor: Processor
  country: string
  amount: number
  currency: string
  reasonCode: string
  reasonCategory: ReasonCategory
  reasonDescription?: string
  customerEmail?: string
  customerName?: string
  transactionDate: string
  chargebackDate: string
  evidenceDeadline: string
}
