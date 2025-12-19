import { useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiOptions {
  /** Number of confetti particles (default: 100) */
  particleCount?: number;
  /** Spread angle in degrees (default: 70) */
  spread?: number;
  /** Origin Y position 0-1 (default: 0.6) */
  originY?: number;
  /** Colors array (default: NOREL brand colors) */
  colors?: string[];
  /** Whether confetti is enabled (default: true) */
  enabled?: boolean;
}

const DEFAULT_COLORS = ['#00A040', '#06C755', '#FFD700'];

/**
 * Custom hook for triggering confetti effects
 * Extracted from MissionCard.tsx to make side effects testable and controllable
 */
export function useConfetti(options: ConfettiOptions = {}) {
  const {
    particleCount = 100,
    spread = 70,
    originY = 0.6,
    colors = DEFAULT_COLORS,
    enabled = true,
  } = options;

  const triggerConfetti = useCallback(() => {
    if (!enabled) return;

    confetti({
      particleCount,
      spread,
      origin: { y: originY },
      colors,
    });
  }, [particleCount, spread, originY, colors, enabled]);

  return { triggerConfetti };
}

/**
 * Predefined confetti presets for common use cases
 */
export const confettiPresets = {
  /** Celebration confetti for completing important steps */
  celebration: {
    particleCount: 100,
    spread: 70,
    originY: 0.6,
    colors: DEFAULT_COLORS,
  },
  /** Subtle confetti for minor achievements */
  subtle: {
    particleCount: 50,
    spread: 45,
    originY: 0.7,
    colors: DEFAULT_COLORS,
  },
  /** Grand confetti for major milestones */
  grand: {
    particleCount: 200,
    spread: 100,
    originY: 0.5,
    colors: [...DEFAULT_COLORS, '#FF6B6B', '#4ECDC4'],
  },
};
