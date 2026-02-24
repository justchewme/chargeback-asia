'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap, Shield, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import CountUp from 'react-countup'
import { fadeUp, stagger, containerVariants, cardReveal } from '@/lib/animations'
import { btnPrimary, btnSecondary } from '@/lib/styles'

const PROCESSORS = [
  { name: 'Xendit', flags: '🇮🇩🇵🇭🇹🇭', color: '#0066CC', abbr: 'XND' },
  { name: 'Midtrans', flags: '🇮🇩', color: '#0073E6', abbr: 'MDT' },
  { name: 'Stripe', flags: '🇸🇬🇲🇾🇵🇭', color: '#635BFF', abbr: 'STR' },
  { name: 'PayMongo', flags: '🇵🇭', color: '#0066FF', abbr: 'PM' },
  { name: 'iPay88', flags: '🇲🇾🇮🇩', color: '#E63329', abbr: 'IP8' },
  { name: '2C2P', flags: '🇹🇭🇸🇬🇲🇾', color: '#FF6B00', abbr: '2CP' },
]

const TESTIMONIALS = [
  {
    name: 'Reza Pratama',
    business: 'TechGadgets.id',
    country: '🇮🇩',
    text: 'We were losing ~$2,000 monthly to chargebacks. ChargeBack.asia fought 31 disputes in our first month and won 22 of them. The letters are incredibly professional.',
    recovered: '$14,200',
    initials: 'RP',
  },
  {
    name: 'Sarah Lim',
    business: 'FashionHaus SG',
    country: '🇸🇬',
    text: 'Set it up in 30 minutes with Stripe. The AI writes better dispute letters than our legal team ever did, and we only pay when we win. No-brainer.',
    recovered: '$8,400',
    initials: 'SL',
  },
  {
    name: 'Juan dela Cruz',
    business: 'ShopPH',
    country: '🇵🇭',
    text: 'Friendly fraud was killing our margins. Now we have a 71% win rate and the letters even come in Filipino which is perfect for our local disputes.',
    recovered: '$5,800',
    initials: 'JD',
  },
]

const FAQ_ITEMS = [
  {
    q: 'How does the 20% fee work?',
    a: 'We charge nothing upfront. Only when a dispute is won and the funds are returned to you do we collect 20% of the recovered amount. No win = no fee, ever.',
  },
  {
    q: 'Which payment processors do you support?',
    a: 'We currently support Xendit, Midtrans, Stripe, PayMongo, iPay88, and 2C2P — covering the majority of e-commerce transactions across Southeast Asia.',
  },
  {
    q: 'How does the AI write the letters?',
    a: 'We use Claude (Anthropic\'s AI) with deep knowledge of Visa/Mastercard dispute resolution rules and processor-specific guidelines to write compelling, evidence-backed rebuttal letters.',
  },
  {
    q: 'How quickly are disputes handled?',
    a: 'From detection to letter submission, the entire process takes under 10 minutes — compared to days or weeks of manual work. Our average response time is 4.2 days vs the industry average of 8 days.',
  },
  {
    q: 'Can I review letters before they\'re submitted?',
    a: 'Absolutely. You can choose between auto-submit (fully hands-off) or manual review mode where you approve each letter before submission.',
  },
  {
    q: 'What evidence does the AI collect?',
    a: 'Transaction logs, IP address data, device fingerprints, delivery confirmations, customer communication records, and more — automatically compiled from your payment processor\'s data.',
  },
]

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="rounded-[14px] border overflow-hidden"
          style={{ background: 'var(--bg-card)', borderColor: open === i ? 'var(--green-500)' : 'var(--border)' }}
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{item.q}</span>
            {open === i
              ? <ChevronDown size={16} style={{ color: 'var(--green-500)' }} />
              : <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
            }
          </button>
          {open === i && (
            <div className="px-5 pb-4">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div>
      {/* HERO */}
      <section className="hero-bg hero-grid min-h-[90vh] flex items-center relative">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              background: 'var(--green-glow-sm)',
              border: '1px solid var(--green-500)',
              color: 'var(--green-500)',
            }}
          >
            <span className="w-2 h-2 rounded-full pulse-dot" style={{ background: 'var(--green-500)' }} />
            ⚡ Now live in 6 Asian markets
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display font-[800] text-[52px] md:text-[68px] leading-[1.05] tracking-[-0.02em] mb-5"
          >
            <span style={{ color: 'var(--text-primary)' }}>Stop </span>
            <span className="text-gradient-green">Losing Money</span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>to Chargebacks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            We fight every dispute automatically with AI. Pay 20% only when you win.
            <br className="hidden md:block" /> No win, no fee — ever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
          >
            <Link href="/sign-up" className={`${btnPrimary} btn-green-glow text-base px-7 py-3.5`}>
              Start Recovering Free <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works" className={`${btnSecondary} text-base px-7 py-3.5`}>
              See How It Works
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Trusted by merchants in 🇮🇩 🇸🇬 🇲🇾 🇵🇭 🇹🇭 🇻🇳
          </motion.p>

          {/* Mock Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 relative"
          >
            <div
              className="rounded-[16px] border overflow-hidden mx-auto max-w-3xl"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
                boxShadow: '0 0 60px rgba(0,230,118,0.1), 0 40px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                <span className="w-3 h-3 rounded-full" style={{ background: '#FF4D72' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#FFAA00' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#00E676' }} />
                <div className="flex-1 mx-4 py-1 px-3 rounded text-xs" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  chargebackasia.com/dashboard
                </div>
              </div>
              {/* Fake dashboard content */}
              <div className="p-4 grid grid-cols-4 gap-3">
                {[
                  { label: 'Recovered', val: '$12,840', delta: '+23%', color: 'var(--green-500)' },
                  { label: 'Win Rate', val: '67%', delta: '+5pts', color: 'var(--chart-blue)' },
                  { label: 'Active', val: '23', delta: '', color: 'var(--pending)' },
                  { label: 'Won Today', val: '+$340', delta: '🎉', color: 'var(--won)' },
                ].map((c, i) => (
                  <div key={i} className="rounded-[10px] p-3" style={{ background: 'var(--bg-secondary)', borderLeft: `3px solid ${c.color}` }}>
                    <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{c.label}</p>
                    <p className="font-mono font-bold text-[15px]" style={{ color: 'var(--text-primary)' }}>{c.val}</p>
                    {c.delta && <p className="text-[10px]" style={{ color: c.color }}>{c.delta}</p>}
                  </div>
                ))}
              </div>
              {/* Animated dispute */}
              <div className="px-4 pb-4">
                <div className="rounded-[10px] border p-3 flex items-center gap-3" style={{ background: 'var(--won-bg)', borderColor: 'var(--won-border)' }}>
                  <CheckCircle size={18} style={{ color: 'var(--won)' }} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--won)' }}>Dispute Won — USD 340 recovered</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Unauthorized transaction · Stripe · 2 min ago</p>
                  </div>
                  <span className="font-mono text-sm font-bold" style={{ color: 'var(--won)' }}>+$340</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PAIN — STATS */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="text-[11px] uppercase tracking-widest font-medium mb-3"
            style={{ color: 'var(--text-muted)' }}
          >
            The Problem
          </motion.p>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="font-display font-[800] text-[36px] tracking-[-0.01em] mb-12"
            style={{ color: 'var(--text-primary)' }}
          >
            Chargebacks are draining Asian merchants
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { value: 33.79, label: 'Billion in chargebacks', suffix: 'B', prefix: '$', sub: 'globally in 2025 — growing 15.8% per year', color: 'var(--green-500)' },
              { value: 80, label: 'Of chargebacks are friendly fraud', suffix: '%', prefix: '', sub: 'Merchants can fight back and win', color: 'var(--chart-blue)' },
              { value: 8, label: 'Average win rate (manual)', suffix: '%', prefix: '', sub: 'ChargeBack.asia merchants average 67%', color: 'var(--chart-purple)' },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={cardReveal}
                className="rounded-[14px] border p-7 text-center"
                style={{ background: 'var(--bg-card)', borderLeft: `4px solid ${s.color}`, borderColor: 'var(--border)' }}
              >
                <p className="font-display font-[800] text-[44px] leading-none" style={{ color: s.color }}>
                  <CountUp start={0} end={s.value} duration={2} decimals={s.value < 100 && s.value % 1 !== 0 ? 2 : 0} enableScrollSpy prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="font-semibold text-base mt-2" style={{ color: 'var(--text-primary)' }}>{s.label}</p>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-display font-[800] text-[36px] mb-4" style={{ color: 'var(--text-primary)' }}>
            From chargeback to recovery in minutes
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-base mb-14" style={{ color: 'var(--text-secondary)' }}>
            Fully automated. Zero manual work.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              { icon: '🔌', step: '01', title: 'Connect', desc: '30 seconds. Connect your payment processor — no code required.' },
              { icon: '🤖', step: '02', title: 'Detect', desc: 'AI monitors every transaction 24/7. Every chargeback is instantly detected via webhook.' },
              { icon: '✍️', step: '03', title: 'Dispute', desc: 'Claude AI writes and submits a tailored, evidence-backed dispute letter automatically.' },
              { icon: '💰', step: '04', title: 'Recover', desc: 'We take 20% only when you win. No recovery = no charge, ever.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="rounded-[14px] border p-6 relative"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="font-mono text-[11px] mb-2" style={{ color: 'var(--green-500)' }}>STEP {s.step}</div>
                <h3 className="font-display font-[700] text-[18px] mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSOR LOGOS */}
      <section className="py-16 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] uppercase tracking-widest mb-8" style={{ color: 'var(--text-muted)' }}>
            Supporting all major SEA payment processors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROCESSORS.map(p => (
              <motion.div
                key={p.name}
                whileHover={{ y: -2, boxShadow: 'var(--shadow-card)' }}
                transition={{ duration: 0.15 }}
                className="rounded-[10px] border px-4 py-3 flex items-center gap-2 cursor-default"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div
                  className="w-7 h-7 rounded-[6px] flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                  style={{ background: p.color }}
                >
                  {p.abbr.slice(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                  <p className="text-[11px]">{p.flags}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-display font-[800] text-[36px] text-center mb-12" style={{ color: 'var(--text-primary)' }}>
            Merchants across SEA are winning
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}
                className="rounded-[14px] border p-6 flex flex-col justify-between"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                  "{t.text}"
                </p>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'var(--green-glow)', color: 'var(--green-500)', border: '1px solid var(--green-500)' }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {t.name} {t.country}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.business}</p>
                    </div>
                  </div>
                  <div
                    className="px-3 py-2 rounded-[8px] flex items-center gap-2"
                    style={{ background: 'var(--won-bg)', border: '1px solid var(--won-border)' }}
                  >
                    <span className="text-base">💰</span>
                    <span className="font-mono font-semibold text-sm" style={{ color: 'var(--won)' }}>
                      Recovered {t.recovered}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-display font-[800] text-[36px] mb-4" style={{ color: 'var(--text-primary)' }}>
            Pricing that's aligned with you
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-base mb-12" style={{ color: 'var(--text-secondary)' }}>
            We only win when you win.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Free */}
            <div className="rounded-[14px] border p-7 text-left" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--text-muted)' }}>FREE</p>
              <p className="font-display font-[800] text-[36px] mb-1" style={{ color: 'var(--text-primary)' }}>$0</p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Get started with no commitment</p>
              {['Unlimited processor connections', 'Auto-detect chargebacks', 'First 3 dispute letters free', 'Basic analytics dashboard', 'Email notifications'].map(f => (
                <div key={f} className="flex items-center gap-2 mb-2.5">
                  <CheckCircle size={13} style={{ color: 'var(--green-500)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
              <Link href="/sign-up" className={`${btnSecondary} w-full justify-center mt-6`} style={{ display: 'flex' }}>
                Get Started Free
              </Link>
            </div>

            {/* Performance */}
            <div className="rounded-[14px] border p-7 text-left relative" style={{ background: 'var(--bg-card)', borderColor: 'rgba(0,230,118,0.4)', boxShadow: 'var(--shadow-green)' }}>
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                style={{ background: 'var(--green-500)', color: 'var(--text-inverse)' }}
              >
                Most Popular
              </div>
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--green-500)' }}>PERFORMANCE</p>
              <p className="font-display font-[800] text-[36px] mb-1" style={{ color: 'var(--text-primary)' }}>20%</p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>of recovered amount only</p>
              {['Everything in Free', 'Unlimited dispute letters', 'Multi-language letters (EN/ID/TH/TL/MY)', 'Auto-submit mode', 'Priority AI processing', 'WhatsApp notifications', 'Team collaboration (3 seats)', 'Monthly PDF reports', 'Dispute health score'].map(f => (
                <div key={f} className="flex items-center gap-2 mb-2.5">
                  <CheckCircle size={13} style={{ color: 'var(--green-500)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                </div>
              ))}
              <Link href="/sign-up" className={`${btnPrimary} btn-green-glow w-full justify-center mt-6`} style={{ display: 'flex' }}>
                Start Recovering →
              </Link>
              <p className="text-center text-xs mt-3" style={{ color: 'var(--text-muted)' }}>No monthly fee · No contracts · Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="font-display font-[800] text-[36px] text-center mb-10" style={{ color: 'var(--text-primary)' }}>
            Frequently asked questions
          </motion.h2>
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-[800] text-[40px] mb-4" style={{ color: 'var(--text-primary)' }}>
            Win Back What's Yours
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Join hundreds of Asian merchants recovering millions from chargebacks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 rounded-[10px] text-sm"
              style={{ background: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            />
            <Link href="/sign-up" className={`${btnPrimary} btn-green-glow whitespace-nowrap px-6 py-3`}>
              Get Started Free →
            </Link>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
            No credit card required. First 3 disputes free.
          </p>
        </div>
      </section>
    </div>
  )
}
