'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { ChevronUp, Award, Sparkles } from 'lucide-react';
import Header from './Header';
import ScoreMeter from './ScoreMeter';
import RoadPath from './RoadPath';
import MissionCard from './MissionCard';
import PaymentWidget from './PaymentWidget';
import MenuDrawer from './MenuDrawer';
import AIConcierge from './AIConcierge';
import { useNorel } from '@/contexts/NorelContext';

// Animated counter component
function AnimatedScore({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return <span>{displayValue}</span>;
}

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

  // Stagger animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 pointer-events-none" />

      <div className="relative z-10">
        <Header />

        {/* Main Content with unified spacing */}
        <motion.main
          className="pb-32 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isDeliveryComplete ? (
            <>
              {/* After Delivery: Payment first, then Mission, then Path */}
              <motion.div variants={itemVariants}><PaymentWidget /></motion.div>
              <motion.div variants={itemVariants}><MissionCard /></motion.div>
              <motion.div variants={itemVariants}><RoadPath /></motion.div>
            </>
          ) : (
            <>
              {/* Before Delivery: Path first, then Mission, then Payment */}
              <motion.div variants={itemVariants}><RoadPath /></motion.div>
              <motion.div variants={itemVariants}><MissionCard /></motion.div>
              <motion.div variants={itemVariants}><PaymentWidget /></motion.div>
            </>
          )}
        </motion.main>

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
            className="w-full bg-white border-t border-gray-200 shadow-lg px-4 py-4 flex items-center justify-between"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${scoreLevel.color} flex items-center justify-center shadow-lg`}
                animate={{ boxShadow: ['0 4px 14px rgba(0, 160, 64, 0.2)', '0 4px 20px rgba(0, 160, 64, 0.4)', '0 4px 14px rgba(0, 160, 64, 0.2)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs text-gray-500 font-medium tracking-wide">NOREL SCORE</p>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  {/* Gradient Text Score with Animation */}
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-norel-green to-emerald-500">
                    <AnimatedScore value={norelScore} />
                  </span>
                  <span className="text-sm text-gray-400 font-medium">点</span>
                  <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full bg-gradient-to-r ${scoreLevel.color} shadow-sm`}>
                    {scoreLevel.label}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-xs font-medium">詳細を見る</span>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronUp className="w-5 h-5" />
              </motion.div>
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
                className="w-full max-w-lg bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-2xl"
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
                  <motion.button
                    onClick={() => setIsScoreExpanded(false)}
                    className="w-full py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    閉じる
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Side Menu Drawer */}
      <MenuDrawer />

      {/* AI Concierge Floating Action */}
      <AIConcierge />
    </div>
  );
}
