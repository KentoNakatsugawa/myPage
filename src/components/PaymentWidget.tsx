'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ChevronRight } from 'lucide-react';
import { useNorel } from '@/contexts/NorelContext';

export default function PaymentWidget() {
  const { paymentInfo } = useNorel();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
      className="mx-4 my-4"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-500">次回のお支払い</p>
            <p className="text-lg font-bold text-gray-900">
              {paymentInfo.nextPaymentDate} / ¥
              {paymentInfo.amount.toLocaleString()}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </motion.button>
    </motion.div>
  );
}
