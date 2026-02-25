'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages, Copy, Download, RefreshCw, CheckCircle, Globe, FileText } from 'lucide-react'

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧', native: 'English' },
  { code: 'id', label: 'Indonesian', flag: '🇮🇩', native: 'Bahasa Indonesia' },
  { code: 'th', label: 'Thai', flag: '🇹🇭', native: 'ภาษาไทย' },
  { code: 'tl', label: 'Filipino', flag: '🇵🇭', native: 'Filipino' },
  { code: 'ms', label: 'Malay', flag: '🇲🇾', native: 'Bahasa Malaysia' },
]

const sampleLetters: Record<string, string> = {
  en: `Subject: Chargeback Rebuttal – Dispute ID CH-0042

Dear Stripe Dispute Resolution Team,

We are writing to formally contest the chargeback filed for transaction #TXN-8821 (USD 248.00) dated January 28, 2026, under reason code 4853 – Merchandise / Services Not Received.

Our records demonstrate that the order was shipped via DHL Express (tracking: DHL-7742819) on January 29, 2026, and delivered on January 31, 2026 at 2:14 PM to the address on file. Attached is the signed delivery confirmation.

Additionally, the customer's email address (john.doe@email.com) received three automated order status updates (order confirmation, shipping notification, delivery confirmation), all of which were opened according to our email delivery logs.

We respectfully request that this chargeback be reversed. All supporting evidence is attached.

Sincerely,
Merchant Support Team`,

  id: `Perihal: Sanggahan Chargeback – ID Perselisihan CH-0042

Kepada Tim Penyelesaian Perselisihan Stripe Yang Terhormat,

Kami menulis surat ini untuk secara resmi mengajukan keberatan atas chargeback yang diajukan untuk transaksi #TXN-8821 (USD 248,00) tertanggal 28 Januari 2026, dengan kode alasan 4853 – Barang/Layanan Tidak Diterima.

Catatan kami menunjukkan bahwa pesanan telah dikirimkan melalui DHL Express (nomor resi: DHL-7742819) pada 29 Januari 2026, dan telah diterima pada 31 Januari 2026 pukul 14:14 di alamat yang terdaftar. Terlampir adalah konfirmasi pengiriman yang telah ditandatangani.

Selain itu, alamat email pelanggan (john.doe@email.com) menerima tiga pembaruan status pesanan otomatis, yang semuanya telah dibuka sesuai catatan pengiriman email kami.

Kami dengan hormat meminta agar chargeback ini dibatalkan. Semua bukti pendukung terlampir.

Hormat kami,
Tim Dukungan Merchant`,

  th: `เรื่อง: การคัดค้านการเรียกเงินคืน – รหัสข้อพิพาท CH-0042

เรียน ทีมแก้ไขข้อพิพาท Stripe ที่เคารพ

เราขอเขียนจดหมายนี้เพื่อคัดค้านการเรียกเงินคืนอย่างเป็นทางการสำหรับรายการธุรกรรม #TXN-8821 (USD 248.00) ลงวันที่ 28 มกราคม 2569 ภายใต้รหัสเหตุผล 4853 – ไม่ได้รับสินค้า/บริการ

บันทึกของเราแสดงให้เห็นว่าคำสั่งซื้อถูกจัดส่งผ่าน DHL Express (เลขพัสดุ: DHL-7742819) เมื่อวันที่ 29 มกราคม 2569 และได้รับสินค้าเรียบร้อยแล้วเมื่อวันที่ 31 มกราคม 2569 เวลา 14:14 น. ที่อยู่ตามที่ระบุ พร้อมแนบใบยืนยันการรับสินค้าที่มีลายเซ็น

นอกจากนี้ อีเมลของลูกค้า (john.doe@email.com) ได้รับการอัปเดตสถานะคำสั่งซื้อจำนวนสามครั้ง ซึ่งถูกเปิดอ่านทั้งหมดตามบันทึกการส่งอีเมลของเรา

เราขอร้องอย่างสุภาพให้ยกเลิกการเรียกเงินคืนนี้ หลักฐานสนับสนุนทั้งหมดได้แนบมาด้วย

ด้วยความเคารพ
ทีมสนับสนุน Merchant`,

  tl: `Paksa: Pagtutol sa Chargeback – Dispute ID CH-0042

Mahal na Koponan ng Resolusyon ng Dispute ng Stripe,

Isinusulat namin ito upang opisyal na kuwestyunin ang chargeback na inihain para sa transaksyon #TXN-8821 (USD 248.00) na may petsang Enero 28, 2026, sa ilalim ng reason code 4853 – Hindi Natanggap ang Kalakal/Serbisyo.

Ipinakikita ng aming mga rekord na ang order ay naipadala sa pamamagitan ng DHL Express (tracking: DHL-7742819) noong Enero 29, 2026, at natanggap noong Enero 31, 2026 ng 2:14 PM sa address na nakatala. Nakalakip ang naka-sign na confirmation ng paghahatid.

Bukod dito, ang email ng customer (john.doe@email.com) ay nakatanggap ng tatlong automated na update sa status ng order, na lahat ay nabuksan ayon sa aming mga log ng paghahatid ng email.

Marapat naming hinihiling na baligtarin ang chargeback na ito. Lahat ng sumusuportang ebidensya ay nakalakip.

Taos-pusong gumagalang,
Koponan ng Suporta sa Merchant`,

  ms: `Perkara: Bantahan Chargeback – ID Pertikaian CH-0042

Kepada Pasukan Penyelesaian Pertikaian Stripe Yang Dihormati,

Kami menulis surat ini untuk membantah secara rasmi chargeback yang difailkan bagi transaksi #TXN-8821 (USD 248.00) bertarikh 28 Januari 2026, di bawah kod sebab 4853 – Barangan/Perkhidmatan Tidak Diterima.

Rekod kami menunjukkan bahawa pesanan telah dihantar melalui DHL Express (penjejakan: DHL-7742819) pada 29 Januari 2026, dan telah diterima pada 31 Januari 2026 jam 14:14 di alamat yang didaftarkan. Disertakan bersama pengesahan penghantaran yang telah ditandatangani.

Selain itu, alamat e-mel pelanggan (john.doe@email.com) menerima tiga kemas kini status pesanan automatik, yang kesemua telah dibuka mengikut log penghantaran e-mel kami.

Kami memohon dengan hormat agar chargeback ini dibatalkan. Semua bukti sokongan disertakan.

Yang benar,
Pasukan Sokongan Merchant`,
}

export default function LettersPage() {
  const [activeLang, setActiveLang] = useState('en')
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sampleLetters[activeLang])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 1800)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-[700] text-[24px]" style={{ color: 'var(--text-primary)' }}>
            Multi-Language Letters
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            AI-generated dispute letters in 5 languages for Southeast Asia
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'var(--submitted-bg)', border: '1px solid var(--submitted-border)', color: 'var(--submitted)' }}
        >
          <Globe size={12} />
          5 languages supported
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Languages', value: '5', sub: 'EN, ID, TH, TL, MS' },
          { label: 'Letters generated', value: '127', sub: 'this month' },
          { label: 'Avg win rate (local lang)', value: '+11%', sub: 'vs English only' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-[14px] border p-4"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
            <p className="font-mono font-[700] text-[20px]" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Letter Preview */}
      <div className="rounded-[14px] border overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        {/* Language Tabs */}
        <div className="flex border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setActiveLang(lang.code)}
              className="flex items-center gap-2 px-4 py-3 text-xs font-medium transition-all"
              style={{
                color: activeLang === lang.code ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottom: activeLang === lang.code ? '2px solid var(--green-500)' : '2px solid transparent',
                background: activeLang === lang.code ? 'var(--bg-card)' : 'transparent',
              }}
            >
              <span>{lang.flag}</span>
              <span className="hidden sm:inline">{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Letter content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Dispute CH-0042 · {languages.find(l => l.code === activeLang)?.native}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerate}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[8px]"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
              >
                <RefreshCw size={12} className={generating ? 'animate-spin' : ''} />
                {generating ? 'Regenerating…' : 'Regenerate'}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[8px]"
                style={{ background: copied ? 'var(--won-bg)' : 'var(--bg-secondary)', border: `1px solid ${copied ? 'var(--won-border)' : 'var(--border)'}`, color: copied ? 'var(--won)' : 'var(--text-secondary)' }}
              >
                {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[8px]"
                style={{ background: 'var(--green-500)', color: 'var(--text-inverse)' }}
              >
                <Download size={12} />
                Download
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeLang}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="rounded-[10px] p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                minHeight: 320,
              }}
            >
              {sampleLetters[activeLang]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Info box */}
      <div
        className="rounded-[12px] p-4 flex items-start gap-3"
        style={{ background: 'var(--submitted-bg)', border: '1px solid var(--submitted-border)' }}
      >
        <Languages size={16} style={{ color: 'var(--submitted)', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Why local-language letters win more
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Dispute reviewers at Xendit (ID), Midtrans (ID), and GCash (PH) are native speakers. Letters
            submitted in the reviewer's language are processed 1.3× faster and win at higher rates.
            ChargeBack.asia auto-selects the optimal language based on your processor's country.
          </p>
        </div>
      </div>
    </div>
  )
}
