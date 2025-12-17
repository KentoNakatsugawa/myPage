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
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNorel } from '@/contexts/NorelContext';
import { StepInfo } from '@/types';
import VehicleRecommendModal from './VehicleRecommendModal';

const stepData: StepInfo[] = [
  {
    id: 1,
    phase: 'Entry',
    title: '前受金のお支払い (1/2)',
    description:
      'まずは最初の決済をお願いします。\nクレジットカードがご利用いただけます。',
    buttonLabel: '支払画面へ進む',
  },
  {
    id: 2,
    phase: 'Entry',
    title: '前受金のお支払い (2/2)',
    description:
      '残りの金額のお支払いをお願いします。\nこれが完了すると契約へ進めます。',
    buttonLabel: '残金を支払う',
  },
  {
    id: 3,
    phase: 'Contract',
    title: '電子契約書の締結',
    description:
      '契約内容をご確認の上、\n電子サインをお願いいたします。',
    buttonLabel: '契約書を確認してサイン',
  },
  {
    id: 4,
    phase: 'Contract',
    title: '引き落とし口座の登録',
    description: '毎月5日の引き落とし口座を\n設定してください。',
    buttonLabel: '口座を登録する',
  },
  {
    id: 5,
    phase: 'Garage',
    title: '必要書類の提出',
    description:
      '車庫証明と住民票の写真を\nアップロードしてください。',
    buttonLabel: '書類をアップロード',
  },
  {
    id: 6,
    phase: 'Preparation',
    title: '車両準備中',
    description:
      '名義変更・車検・クリーニング・\n整備・輸送手配を行っています。',
    buttonLabel: '準備状況を確認',
  },
  {
    id: 7,
    phase: 'Delivery',
    title: '納車日の確定',
    description:
      'お届け先の住所と\n希望日時を選択してください。',
    buttonLabel: '納車日を予約する',
  },
  {
    id: 8,
    phase: 'Active',
    title: 'AI査定: 乗り換えチャンス',
    description:
      '現在の市場価格が高騰しています。\nお得に乗り換えるチャンスです。',
    buttonLabel: '査定詳細・カタログを見る',
  },
];

const alertData = {
  license: {
    title: '【重要】免許証の更新',
    description:
      '免許証の有効期限が近づいています。\n新しい免許証を登録してください。',
    buttonLabel: '免許証を撮影する',
  },
  insurance: {
    title: '【重要】保険証券の更新',
    description:
      '保険証券の有効期限が近づいています。\n新しい保険証券をアップロードしてください。',
    buttonLabel: '保険証券をアップロード',
  },
  shaken: {
    title: '【重要】車検の更新',
    description:
      '車検の有効期限が近づいています。\n車検証をアップロードしてください。',
    buttonLabel: '車検証をアップロード',
  },
};

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

    // Trigger confetti for Step 3 and Step 7
    if (currentStep === 3 || currentStep === 7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A040', '#06C755', '#FFD700'],
      });
    }

    nextStep();
  };

  // Show alert card if there's an alert
  if (alertType && alertData[alertType]) {
    const alert = alertData[alertType];
    return (
      <motion.div
        key="alert"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="mx-4 my-4"
      >
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-5 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-700 mb-2">
                {alert.title}
              </h3>
              <p className="text-sm text-red-600 whitespace-pre-line mb-4">
                {alert.description}
              </p>
              <motion.button
                onClick={handleAction}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-red-600 transition-colors"
              >
                {alert.buttonLabel}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const step = stepData[currentStep - 1];
  const Icon = getStepIcon(currentStep);

  // Special rendering for Step 8 (AI Trade-in)
  if (currentStep === 8) {
    return (
      <>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mx-4 my-4"
          >
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  AI分析
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line mb-4">
                {step.description}
              </p>

              {/* Vehicle Value */}
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">現在の推定評価額</p>
                <p className="text-2xl font-bold text-purple-600">
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
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all"
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
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="mx-4 my-4"
      >
        <div className="bg-white border-2 border-norel-green rounded-2xl p-5 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-norel-green-light rounded-full flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-norel-green" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-norel-green bg-norel-green-light px-2 py-0.5 rounded-full">
                  STEP {currentStep}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 whitespace-pre-line mb-4">
                {step.description}
              </p>
              <motion.button
                onClick={handleAction}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-norel-green text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-norel-green-dark transition-colors"
              >
                {step.buttonLabel}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
