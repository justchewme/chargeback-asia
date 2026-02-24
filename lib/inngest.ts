import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'chargeback-asia',
  eventKey: process.env.INNGEST_EVENT_KEY,
})
