'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  FileSignature,
  Building2,
  Upload,
  Truck,
  Wrench,
  Car,
  AlertTriangle,
  Star,
  Check,
  Sparkles,
} from 'lucide-react';
import { useNorel } from '@/contexts/NorelContext';
import { stepData, alertData } from '@/mocks';
import { useConfetti } from '@/hooks';
import VehicleRecommendModal from './VehicleRecommendModal';

function getStepIcon(step: number) {
  const icons = {
    1: CreditCard,
    2: CreditCard,
    3: FileSignature,
    4: Building2,
    5: Upload,
    6: Wrench,
    7: Truck,
    8: Car,
  };
  return icons[step as keyof typeof icons] || CreditCard;
}

// Particle burst effect on completion
function ParticleBurst({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const distance = 60;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-norel-green"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default function MissionCard() {
  const { currentStep, alertType, nextStep, clearAlert, vehicleInfo } = useNorel();
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const { triggerConfetti } = useConfetti();

  const handleAction = () => {
    if (alertType) {
      clearAlert();
      return;
    }

    // Step 8: Open vehicle recommend modal
    if (currentStep === 8) {
      setIsRecommendModalOpen(true);
      return;
    }

    // Show completion animation with particles
    setIsCompleting(true);
    setShowParticles(true);

    // Trigger confetti for Step 3 and Step 7
    if (currentStep === 3 || currentStep === 7) {
      triggerConfetti();
    }

    // Delay step transition for visual feedback
    setTimeout(() => {
      setIsCompleting(false);
      setShowParticles(false);
      nextStep();
    }, 600);
  };

  const step = stepData[currentStep - 1];
  const Icon = getStepIcon(currentStep);

  // Non-destructive alert UI with pulse glow effect
  const alertSection = alertType && alertData[alertType] ? (
    <motion.div
      key="alert"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="mx-4 mb-3"
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0px rgba(239, 68, 68, 0)',
            '0 0 30px rgba(239, 68, 68, 0.4)',
            '0 0 0px rgba(239, 68, 68, 0)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-gradient-to-br from-red-50/90 to-orange-50/90 backdrop-blur-md border border-red-200/50 rounded-2xl p-4 shadow-glass relative overflow-hidden"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-orange-500/10 to-red-500/5 animate-gradient-x" />

        <div className="flex items-start gap-3 relative z-10">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-red"
          >
            <AlertTriangle className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-red-600 mb-1">
              {alertData[alertType].title}
            </h4>
            <p className="text-xs text-gray-600 whitespace-pre-line mb-3">
              {alertData[alertType].description}
            </p>
            <motion.button
              onClick={() => clearAlert()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold py-2 px-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all"
            >
              {alertData[alertType].buttonLabel}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  ) : null;

  // Special rendering for Step 8 (AI Trade-in)
  if (currentStep === 8) {
    return (
      <>
        <AnimatePresence>{alertSection}</AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mx-4 my-4"
          >
            {/* Neomorphism card with glass effect */}
            <div className="bg-gradient-to-br from-norel-blue-light/80 to-sky-50/80 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-glass relative overflow-hidden">
              {/* Decorative gradient orb */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-orb-3 blur-2xl opacity-50" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-10 h-10 bg-gradient-to-r from-norel-blue to-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-norel-blue/30"
                  >
                    <Car className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xs font-bold text-norel-blue bg-norel-blue-light/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI分析
                  </span>
                </div>

                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-norel-blue to-sky-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line mb-4">
                  {step.description}
                </p>

                {/* Vehicle Value - Glassmorphism */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-inner-glass border border-white/50">
                  <p className="text-xs text-gray-500 mb-1">現在の推定評価額</p>
                  <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-norel-blue to-sky-600">
                    ¥{vehicleInfo.estimatedValue.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs text-gray-500">おすすめ度:</span>
                    {[...Array(vehicleInfo.recommendationLevel)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={handleAction}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-norel-blue to-sky-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-norel-blue/30 hover:shadow-xl hover:shadow-norel-blue/40 transition-all"
                >
                  {step.buttonLabel}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <VehicleRecommendModal
          isOpen={isRecommendModalOpen}
          onClose={() => setIsRecommendModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <AnimatePresence>{alertSection}</AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            filter: isCompleting ? 'brightness(1.15)' : 'brightness(1)',
            scale: isCompleting ? 0.98 : 1,
          }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mx-4 my-4"
        >
          {/* Neomorphism card with glass effect */}
          <motion.div
            animate={isCompleting ? {
              boxShadow: [
                '0 0 0px rgba(0, 160, 64, 0)',
                '0 0 50px rgba(0, 160, 64, 0.5)',
                '0 0 0px rgba(0, 160, 64, 0)',
              ],
            } : {}}
            transition={{ duration: 0.6 }}
            className={`bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-5 shadow-glass relative overflow-hidden transition-all duration-300 ${
              isCompleting ? 'bg-norel-green-light/50' : ''
            }`}
          >
            {/* Decorative gradient orb */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-orb-1 blur-2xl opacity-30" />

            {/* Particle burst effect */}
            <div className="absolute top-1/2 left-12 -translate-y-1/2">
              <ParticleBurst isActive={showParticles} />
            </div>

            <div className="flex items-start gap-4 relative z-10">
              <motion.div
                animate={isCompleting ? { scale: [1, 1.2, 1], rotate: [0, 360] } : {}}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-lg ${
                  isCompleting
                    ? 'bg-gradient-to-r from-norel-green to-emerald-400 shadow-glow-green'
                    : 'bg-gradient-to-r from-norel-green-light to-emerald-100'
                }`}
              >
                {isCompleting ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Check className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <Icon className="w-6 h-6 text-norel-green" />
                )}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-norel-green bg-norel-green-light/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    STEP {currentStep}
                  </span>
                </div>
                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line mb-4 leading-relaxed">
                  {step.description}
                </p>
                <motion.button
                  onClick={handleAction}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isCompleting}
                  className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all ${
                    isCompleting
                      ? 'bg-gradient-to-r from-norel-green to-emerald-400 text-white cursor-not-allowed shadow-glow-green'
                      : 'bg-gradient-to-r from-norel-green to-norel-green-dark text-white hover:shadow-lg hover:shadow-norel-green/30'
                  }`}
                >
                  {isCompleting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      完了しました
                    </span>
                  ) : (
                    step.buttonLabel
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
