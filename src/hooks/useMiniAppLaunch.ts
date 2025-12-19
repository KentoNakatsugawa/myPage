import { useState, useCallback } from 'react';

interface UseMiniAppLaunchOptions {
  /** Delay in ms before launching (default: 800) */
  launchDelay?: number;
  /** Callback when launch starts */
  onLaunchStart?: () => void;
  /** Callback when launch completes */
  onLaunchComplete?: () => void;
}

interface UseMiniAppLaunchReturn {
  /** Whether the mini app is currently visible */
  showMiniApp: boolean;
  /** Whether the launch animation is in progress */
  isLaunching: boolean;
  /** Trigger the mini app launch */
  launchMiniApp: () => void;
  /** Close the mini app and return to LINE */
  closeMiniApp: () => void;
}

/**
 * Custom hook for handling mini app launch animation and state
 * Extracted from page.tsx to make side effects testable and reusable
 */
export function useMiniAppLaunch(options: UseMiniAppLaunchOptions = {}): UseMiniAppLaunchReturn {
  const {
    launchDelay = 800,
    onLaunchStart,
    onLaunchComplete,
  } = options;

  const [showMiniApp, setShowMiniApp] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const launchMiniApp = useCallback(() => {
    setIsLaunching(true);
    onLaunchStart?.();

    // Simulate mini app launch animation
    setTimeout(() => {
      setShowMiniApp(true);
      setIsLaunching(false);
      onLaunchComplete?.();
    }, launchDelay);
  }, [launchDelay, onLaunchStart, onLaunchComplete]);

  const closeMiniApp = useCallback(() => {
    setShowMiniApp(false);
  }, []);

  return {
    showMiniApp,
    isLaunching,
    launchMiniApp,
    closeMiniApp,
  };
}
