export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
}

export const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } },
}

export const wonPulse = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(0,230,118,0.5)',
      '0 0 0 16px rgba(0,230,118,0)',
    ],
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const countUpDefaults = {
  duration: 1.8,
  useEasing: true,
  enableScrollSpy: true,
  scrollSpyDelay: 200,
}

export const navItemHover = {
  whileHover: { x: 2 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
}

export const cardReveal = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
}

export const slideInRight = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } },
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}
