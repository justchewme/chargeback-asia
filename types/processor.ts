export type ProcessorConfig = {
  id: string
  name: string
  countries: string[]
  flags: string[]
  color: string
  webhookPath: string
  docsUrl: string
  apiKeyLabel: string
  webhookSecretLabel: string
}

export const PROCESSOR_CONFIGS: ProcessorConfig[] = [
  {
    id: 'XENDIT',
    name: 'Xendit',
    countries: ['ID', 'PH', 'TH', 'VN'],
    flags: ['🇮🇩', '🇵🇭', '🇹🇭', '🇻🇳'],
    color: '#0066CC',
    webhookPath: '/api/webhooks/xendit',
    docsUrl: 'https://docs.xendit.co',
    apiKeyLabel: 'Secret API Key',
    webhookSecretLabel: 'Callback Token',
  },
  {
    id: 'MIDTRANS',
    name: 'Midtrans',
    countries: ['ID'],
    flags: ['🇮🇩'],
    color: '#0073E6',
    webhookPath: '/api/webhooks/midtrans',
    docsUrl: 'https://docs.midtrans.com',
    apiKeyLabel: 'Server Key',
    webhookSecretLabel: 'Server Key (also used for webhook verification)',
  },
  {
    id: 'STRIPE',
    name: 'Stripe',
    countries: ['SG', 'MY', 'PH', 'TH', 'ID', 'VN'],
    flags: ['🇸🇬', '🇲🇾', '🇵🇭', '🇹🇭'],
    color: '#635BFF',
    webhookPath: '/api/webhooks/stripe',
    docsUrl: 'https://docs.stripe.com',
    apiKeyLabel: 'Secret Key (sk_live_...)',
    webhookSecretLabel: 'Webhook Signing Secret (whsec_...)',
  },
  {
    id: 'PAYMONGO',
    name: 'PayMongo',
    countries: ['PH'],
    flags: ['🇵🇭'],
    color: '#0066FF',
    webhookPath: '/api/webhooks/paymongo',
    docsUrl: 'https://developers.paymongo.com',
    apiKeyLabel: 'Secret Key',
    webhookSecretLabel: 'Webhook Secret Key',
  },
  {
    id: 'IPAY88',
    name: 'iPay88',
    countries: ['MY', 'ID', 'PH', 'TH'],
    flags: ['🇲🇾', '🇮🇩', '🇵🇭', '🇹🇭'],
    color: '#E63329',
    webhookPath: '/api/webhooks/ipay88',
    docsUrl: 'https://www.ipay88.com',
    apiKeyLabel: 'Merchant Key',
    webhookSecretLabel: 'Payment ID / Merchant Code',
  },
  {
    id: 'TWOC2P',
    name: '2C2P',
    countries: ['TH', 'SG', 'MY', 'ID', 'VN'],
    flags: ['🇹🇭', '🇸🇬', '🇲🇾', '🇮🇩', '🇻🇳'],
    color: '#FF6B00',
    webhookPath: '/api/webhooks/twoc2p',
    docsUrl: 'https://developer.2c2p.com',
    apiKeyLabel: 'Secret Key',
    webhookSecretLabel: 'HMAC Secret',
  },
]
