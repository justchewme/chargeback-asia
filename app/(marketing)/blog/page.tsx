import Link from 'next/link'

export const metadata = { title: 'Blog' }

const posts = [
  { slug: 'friendly-fraud-sea-merchants', title: 'Friendly Fraud Is Rising in Southeast Asia — Here\'s What To Do', date: '2025-10-15', category: 'Disputes', readTime: '6 min' },
  { slug: 'win-rate-guide', title: 'How to Improve Your Chargeback Win Rate from 8% to 67%', date: '2025-10-08', category: 'Strategy', readTime: '8 min' },
  { slug: 'xendit-chargebacks', title: 'Xendit Chargebacks: Complete Guide for Indonesian & Philippine Merchants', date: '2025-09-28', category: 'Processors', readTime: '7 min' },
  { slug: 'ai-dispute-letters', title: 'Why AI-Written Dispute Letters Win More (With Examples)', date: '2025-09-15', category: 'AI', readTime: '5 min' },
  { slug: 'chargeback-deadlines', title: 'Chargeback Deadlines by Processor: Never Miss Your Window Again', date: '2025-09-01', category: 'Guides', readTime: '4 min' },
]

const categories = ['All', 'Disputes', 'Strategy', 'Processors', 'AI', 'Guides']

export default function BlogPage() {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-display font-[800] text-[48px] mb-4" style={{ color: 'var(--text-primary)' }}>Blog</h1>
      <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
        Chargeback strategies and insights for Asian merchants
      </p>

      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map(c => (
          <button
            key={c}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{
              background: c === 'All' ? 'var(--green-500)' : 'var(--bg-card)',
              color: c === 'All' ? 'var(--text-inverse)' : 'var(--text-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-[16px] border p-6 transition-all"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: 'var(--draft-bg)', color: 'var(--draft)', border: '1px solid var(--draft-border)' }}
              >
                {post.category}
              </span>
              <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{post.date} · {post.readTime}</span>
            </div>
            <h2 className="font-display font-[700] text-[20px]" style={{ color: 'var(--text-primary)' }}>
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
