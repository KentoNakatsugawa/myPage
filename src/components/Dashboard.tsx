'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Award } from 'lucide-react';
import Header from './Header';
import ScoreMeter from './ScoreMeter';
import RoadPath from './RoadPath';
import MissionCard from './MissionCard';
import PaymentWidget from './PaymentWidget';
import MenuDrawer from './MenuDrawer';
import AIConcierge from './AIConcierge';
import { useNorel } from '@/contexts/NorelContext';

export default function Dashboard() {
  const [isScoreExpanded, setIsScoreExpanded] = useState(false);
  const { norelScore, currentStep } = useNorel();

  // Check if delivery is complete (step 8 = 利用中)
  const isDeliveryComplete = currentStep === 8;

  // Determine score level
  const getScoreLevel = (score: number) => {
    if (score >= 750) return { label: 'プラチナ', color: 'from-indigo-400 to-purple-600' };
    if (score >= 650) return { label: 'ゴールド', color: 'from-yellow-400 to-amber-500' };
    if (score >= 550) return { label: 'シルバー', color: 'from-gray-400 to-gray-500' };
    return { label: 'ブロンズ', color: 'from-orange-400 to-orange-600' };
  };
  const scoreLevel = getScoreLevel(norelScore);

  return (
    <div className="min-h-screen bg-surface-secondary">
      <Header />

      {/* Main Content with unified spacing */}
      <main className="pb-32 space-y-6">
        {isDeliveryComplete ? (
          <>
            {/* After Delivery: Payment first, then Mission, then Path */}
            <PaymentWidget />
            <MissionCard />
            <RoadPath />
          </>
        ) : (
          <>
            {/* Before Delivery: Path first, then Mission, then Payment */}
            <RoadPath />
            <MissionCard />
            <PaymentWidget />
          </>
        )}
      </main>

      {/* NOREL Score Bottom Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
      >
        {/* Collapsed Bar */}
        <motion.button
          onClick={() => setIsScoreExpanded(true)}
          className="w-full bg-surface-primary border-t border-border shadow-modal px-4 py-4 flex items-center justify-between"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${scoreLevel.color} flex items-center justify-center shadow-sm`}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 font-medium tracking-wide">NOREL SCORE</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                {/* Improved visual hierarchy - larger score with font-black */}
                <span className="text-4xl font-black text-gray-900">{norelScore}</span>
                <span className="text-sm text-gray-400 font-medium">点</span>
                <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full bg-gradient-to-r ${scoreLevel.color} shadow-sm`}>
                  {scoreLevel.label}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xs font-medium">詳細を見る</span>
            <ChevronUp className="w-5 h-5" />
          </div>
        </motion.button>
      </motion.div>

      {/* Score Detail Modal */}
      <AnimatePresence>
        {isScoreExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setIsScoreExpanded(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-surface-secondary rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-modal"
            >
              {/* Close Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <button
                  onClick={() => setIsScoreExpanded(false)}
                  className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
                />
              </div>

              {/* Score Meter Content */}
              <ScoreMeter />

              {/* Close Button */}
              <div className="p-4">
                <button
                  onClick={() => setIsScoreExpanded(false)}
                  className="w-full py-3.5 bg-surface-tertiary text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Menu Drawer */}
      <MenuDrawer />

      {/* AI Concierge Floating Action */}
      <AIConcierge />
    </div>
  );
}
