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

export default function MissionCard() {
  const { currentStep, alertType, nextStep, clearAlert, vehicleInfo } = useNorel();
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
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

    // Show completion animation
    setIsCompleting(true);

    // Trigger confetti for Step 3 and Step 7
    if (currentStep === 3 || currentStep === 7) {
      triggerConfetti();
    }

    // Delay step transition for visual feedback
    setTimeout(() => {
      setIsCompleting(false);
      nextStep();
    }, 600);
  };

  const step = stepData[currentStep - 1];
  const Icon = getStepIcon(currentStep);

  // Alert UI with pulse effect
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
            '0 0 20px rgba(239, 68, 68, 0.3)',
            '0 0 0px rgba(239, 68, 68, 0)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <AlertTriangle className="w-5 h-5 text-red-500" />
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
              className="bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 transition-colors"
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
            <div className="bg-gradient-to-br from-norel-blue-light to-sky-50 border border-norel-blue/20 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-gradient-to-r from-norel-blue to-sky-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Car className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-xs font-bold text-norel-blue bg-norel-blue-light px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI分析
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line mb-4">
                {step.description}
              </p>

              {/* Vehicle Value */}
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">現在の推定評価額</p>
                <p className="text-2xl font-bold text-norel-blue">
                  ¥{vehicleInfo.estimatedValue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs text-gray-500">おすすめ度:</span>
                  {[...Array(vehicleInfo.recommendationLevel)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handleAction}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-norel-blue to-sky-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {step.buttonLabel}
              </motion.button>
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
            scale: isCompleting ? 0.98 : 1,
          }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="mx-4 my-4"
        >
          <motion.div
            animate={isCompleting ? {
              boxShadow: ['0 0 0px rgba(0, 160, 64, 0)', '0 0 30px rgba(0, 160, 64, 0.4)', '0 0 0px rgba(0, 160, 64, 0)'],
            } : {}}
            transition={{ duration: 0.6 }}
            className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-300 ${
              isCompleting ? 'bg-norel-green-light' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={isCompleting ? { scale: [1, 1.2, 1], rotate: [0, 360] } : {}}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isCompleting
                    ? 'bg-norel-green shadow-lg'
                    : 'bg-norel-green-light'
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
                  <span className="text-xs font-bold text-norel-green bg-norel-green-light px-2.5 py-1 rounded-full">
                    STEP {currentStep}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line mb-4 leading-relaxed">
                  {step.description}
                </p>
                <motion.button
                  onClick={handleAction}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isCompleting}
                  className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all ${
                    isCompleting
                      ? 'bg-norel-green text-white cursor-not-allowed'
                      : 'bg-norel-green text-white hover:bg-norel-green-dark shadow-lg'
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
