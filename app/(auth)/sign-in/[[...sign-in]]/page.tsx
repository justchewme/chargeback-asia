import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center hero-bg"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="text-center mb-8 absolute top-20">
        <span className="font-display font-[800] text-[24px]" style={{ color: 'var(--text-primary)' }}>ChargeBack</span>
        <span className="font-display font-[800] text-[24px]" style={{ color: 'var(--green-500)' }}>.asia</span>
      </div>
      <SignIn />
    </div>
  )
}
