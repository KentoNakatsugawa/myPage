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

// Background orbs component
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Green Orb - Top Right */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-orb-1 blur-3xl opacity-60"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Cyan Orb - Bottom Left */}
      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-orb-2 blur-3xl opacity-50"
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Purple Orb - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-orb-3 blur-3xl opacity-40"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default function Dashboard() {
  const [isScoreExpanded, setIsScoreExpanded] = useState(false);
  const { norelScore, currentStep } = useNorel();

  // Check if delivery is complete (step 8 = 利用中)
  const isDeliveryComplete = currentStep === 8;

  // Determine score level
  const getScoreLevel = (score: number) => {
    if (score >= 750) return { label: 'プラチナ', color: 'from-indigo-400 to-purple-600', glow: 'shadow-glow-cyan' };
    if (score >= 650) return { label: 'ゴールド', color: 'from-yellow-400 to-amber-500', glow: 'shadow-glow-emerald' };
    if (score >= 550) return { label: 'シルバー', color: 'from-gray-400 to-gray-500', glow: 'shadow-glow' };
    return { label: 'ブロンズ', color: 'from-orange-400 to-orange-600', glow: 'shadow-glow-green' };
  };
  const scoreLevel = getScoreLevel(norelScore);

  // Stagger animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 relative">
      {/* Ethereal Background Orbs */}
      <BackgroundOrbs />

      <Header />

      {/* Main Content with unified spacing */}
      <motion.main
        className="pb-32 space-y-6 relative z-10"
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

      {/* NOREL Score Bottom Bar - Glassmorphism */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.5 }}
      >
        {/* Collapsed Bar - Glassmorphism effect */}
        <motion.button
          onClick={() => setIsScoreExpanded(true)}
          className="w-full bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-glass-lg px-4 py-4 flex items-center justify-between"
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            {/* Glowing Avatar */}
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${scoreLevel.color} flex items-center justify-center ${scoreLevel.glow}`}
              animate={{ boxShadow: ['0 0 20px rgba(0, 160, 64, 0.3)', '0 0 35px rgba(0, 160, 64, 0.5)', '0 0 20px rgba(0, 160, 64, 0.3)'] }}
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
                <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
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

      {/* Score Detail Modal - Glassmorphism */}
      <AnimatePresence>
        {isScoreExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center"
            onClick={() => setIsScoreExpanded(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-t-[40px] max-h-[85vh] overflow-y-auto shadow-glass-lg border-t border-white/30"
            >
              {/* Close Handle */}
              <div className="flex justify-center pt-4 pb-2">
                <motion.button
                  onClick={() => setIsScoreExpanded(false)}
                  className="w-12 h-1.5 bg-gray-300/80 rounded-full hover:bg-gray-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              {/* Score Meter Content */}
              <ScoreMeter />

              {/* Close Button */}
              <div className="p-4">
                <motion.button
                  onClick={() => setIsScoreExpanded(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-2xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  閉じる
                </motion.button>
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
