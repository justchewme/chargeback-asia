import { serve } from 'inngest/next'
import { inngest } from '@/lib/inngest'
import { processChargeback } from '@/inngest/process-chargeback'
import { generateLetterFunction } from '@/inngest/generate-letter'
import { sendNotificationsFunction } from '@/inngest/send-notifications'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processChargeback,
    generateLetterFunction,
    sendNotificationsFunction,
  ],
})
