'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNorel } from '@/contexts/NorelContext';
import { Dashboard } from '@/components';
import LineMockUI from '@/components/LineMockUI';

export default function Home() {
  const { isAuthenticated, login } = useNorel();
  const [showMiniApp, setShowMiniApp] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchMiniApp = () => {
    setIsLaunching(true);
    // Simulate mini app launch animation
    setTimeout(() => {
      login();
      setShowMiniApp(true);
      setIsLaunching(false);
    }, 800);
  };

  const handleCloseMiniApp = () => {
    setShowMiniApp(false);
  };

  return (
    <div className="h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!showMiniApp ? (
          <motion.div
            key="line"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <LineMockUI onLaunchMiniApp={handleLaunchMiniApp} />

            {/* Launch Overlay */}
            <AnimatePresence>
              {isLaunching && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-white z-50 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-norel-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-gray-800">NOREL WITH</p>
                    <p className="text-sm text-gray-500 mt-1">読み込み中...</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="miniapp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {/* Mini App Header */}
            <div className="bg-norel-green px-4 py-3 flex items-center justify-between sticky top-0 z-50">
              <button
                onClick={handleCloseMiniApp}
                className="text-white text-sm font-medium flex items-center gap-1"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                LINE
              </button>
              <span className="text-white font-bold">NOREL WITH</span>
              <div className="w-12" /> {/* Spacer for centering */}
            </div>

            {/* Dashboard Content */}
            <div className="h-[calc(100%-52px)] overflow-y-auto">
              <Dashboard />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
