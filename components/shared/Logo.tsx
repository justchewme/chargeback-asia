import { cn } from '@/lib/styles'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showBeta?: boolean
  className?: string
}

const sizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}

export function Logo({ size = 'md', showBeta = false, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('font-display font-[700] flex items-center', sizes[size])}>
        <span style={{ color: 'var(--text-primary)' }}>ChargeBack</span>
        <span style={{ color: 'var(--green-500)' }}>.asia</span>
      </div>
      {showBeta && (
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
          style={{
            background: 'var(--green-glow)',
            border: '1px solid var(--green-500)',
            color: 'var(--green-500)',
          }}
        >
          BETA
        </span>
      )}
    </div>
  )
}
