import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cardBase =
  'bg-[var(--bg-card)] border border-[var(--border)] rounded-[14px] p-5'

export const cardHover =
  'hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-card)] transition-all duration-200'

export const cardActive =
  'border-[var(--green-500)]/30 shadow-[var(--shadow-green)]'

export const btnPrimary =
  'bg-[var(--green-500)] text-[var(--text-inverse)] font-semibold rounded-[10px] px-5 py-2.5 ' +
  'hover:bg-[var(--green-400)] shadow-[0_0_24px_rgba(0,212,140,0.32)] ' +
  'active:bg-[var(--green-600)] transition-all duration-150 ' +
  'focus-visible:ring-2 ring-[var(--green-500)]/50 ring-offset-2 ring-offset-[var(--bg-primary)] ' +
  'inline-flex items-center gap-2 text-sm'

export const btnSecondary =
  'bg-transparent border border-[var(--border)] text-[var(--text-primary)] rounded-[10px] px-5 py-2.5 ' +
  'hover:border-[var(--border-strong)] hover:bg-[var(--bg-card-hover)] transition-all duration-150 ' +
  'inline-flex items-center gap-2 text-sm font-medium'

export const btnGhost =
  'bg-transparent text-[var(--text-secondary)] rounded-[8px] px-3 py-2 ' +
  'hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-all duration-150 ' +
  'inline-flex items-center gap-2 text-sm'

export const btnDanger =
  'bg-[var(--lost-bg)] border border-[var(--lost-border)] text-[var(--lost)] rounded-[10px] px-5 py-2.5 ' +
  'hover:bg-[rgba(255,77,114,0.15)] transition-all duration-150 ' +
  'inline-flex items-center gap-2 text-sm font-medium'

export const inputBase =
  'w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[10px] ' +
  'px-4 py-2.5 text-sm text-[var(--text-primary)] ' +
  'placeholder:text-[var(--text-muted)] ' +
  'focus:outline-none focus:border-[var(--green-500)]/50 ' +
  'focus:ring-2 focus:ring-[var(--green-500)]/15 ' +
  'transition-all duration-150'

export const labelBase =
  'text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)]'

export const tableWrapper =
  'w-full overflow-hidden rounded-[14px] border border-[var(--border)]'

export const tableHeader =
  'px-4 py-3 text-left text-[11px] uppercase tracking-widest font-medium text-[var(--text-muted)] border-b border-[var(--border)] bg-[var(--bg-secondary)]'

export const tableCell =
  'px-4 py-3.5 text-sm text-[var(--text-primary)] border-b border-[var(--border-subtle)]'

export const sectionTitle =
  'font-display font-[700] text-[28px] tracking-[-0.01em] text-[var(--text-primary)]'

export const sectionSubtitle =
  'text-base text-[var(--text-secondary)] leading-relaxed'
