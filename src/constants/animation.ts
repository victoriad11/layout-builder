/**
 * Animation constants for Framer Motion
 */
export const ANIMATION = {
  /** Default animation duration in seconds */
  DURATION: 0.2,

  /** Initial animation state for new widgets */
  INITIAL: { opacity: 0, y: 20 } as const,

  /** Final animation state for widgets */
  ANIMATE: { opacity: 1, y: 0 } as const,

  /** Exit animation state for removed widgets */
  EXIT: { opacity: 0, scale: 0.95 } as const,
} as const;
