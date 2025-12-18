'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ChevronRight, X, Check } from 'lucide-react';
import { useNorel } from '@/contexts/NorelContext';

// Generate 82 months of payment schedule starting from contract date
function generatePaymentSchedule(monthlyAmount: number, startDate: Date = new Date(2024, 11, 1)) {
  const schedule = [];
  const totalPayments = 82;

  for (let i = 0; i < totalPayments; i++) {
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);

    const year = paymentDate.getFullYear();
    const month = paymentDate.getMonth() + 1;
    const isPaid = paymentDate < new Date(); // Mark as paid if date is in the past

    schedule.push({
      id: i + 1,
      year,
      month,
      amount: monthlyAmount,
      isPaid,
      paymentDay: 5, // 5th of each month
    });
  }

  return schedule;
}

export default function PaymentWidget() {
  const { paymentInfo, userProfile } = useNorel();
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const paymentSchedule = generatePaymentSchedule(paymentInfo.amount);
  const totalPayments = paymentSchedule.length;
  const paidCount = paymentSchedule.filter(p => p.isPaid).length;
  const remainingCount = totalPayments - paidCount;

  // 金額計算
  const totalAmount = paymentInfo.amount * totalPayments;
  const paidAmount = paymentInfo.amount * paidCount;
  const remainingAmount = paymentInfo.amount * remainingCount;
  const progressPercentage = (paidCount / totalPayments) * 100;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
        className="mx-4 my-4"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsScheduleOpen(true)}
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
              <p className="text-xs text-blue-600 mt-1">支払いスケジュールを見る →</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>
      </motion.div>

      {/* Payment Schedule Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setIsScheduleOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-w-lg max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">お支払いスケジュール</h2>
                    <p className="text-xs text-gray-500">{userProfile.name} 様</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Summary - Reference Image Style */}
              <div className="p-6 bg-white border-b border-gray-100">
                {/* Total Amount */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500 mb-2">お支払総額</p>
                  <p className="text-4xl font-light text-gray-800">
                    {totalAmount.toLocaleString()}
                    <span className="text-xl ml-1">円</span>
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPercentage}%`,
                      background: 'linear-gradient(to right, #F97316, #FB923C)',
                    }}
                  />
                </div>

                {/* Paid / Remaining */}
                <div className="flex border-t border-gray-200">
                  <div className="flex-1 py-4 text-center border-r border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">お支払済</p>
                    <p className="text-xl font-medium text-gray-800">
                      {paidAmount.toLocaleString()}
                      <span className="text-sm ml-1">円</span>
                    </p>
                  </div>
                  <div className="flex-1 py-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">ご利用残高</p>
                    <p className="text-xl font-medium text-gray-800">
                      {remainingAmount.toLocaleString()}
                      <span className="text-sm ml-1">円</span>
                    </p>
                  </div>
                </div>

                {/* Remaining Payments Count */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    残支払回数：<span className="font-medium">{remainingCount}回</span> / {totalPayments}回
                  </p>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-gray-400 text-center mt-4">
                  ※実際のお支払金額と異なる場合がございます。
                </p>
              </div>

              {/* Schedule Table */}
              <div className="flex-1 overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">回数</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">お支払い日</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">金額</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">状態</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paymentSchedule.map((payment) => (
                      <tr
                        key={payment.id}
                        className={payment.isPaid ? 'bg-green-50/50' : 'bg-white'}
                      >
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {payment.id}回目
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {payment.year}年{payment.month}月{payment.paymentDay}日
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                          ¥{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {payment.isPaid ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              <Check className="w-3 h-3" />
                              済
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                              予定
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-500 text-center mb-3">
                  毎月5日に登録口座より自動引き落としされます
                </p>
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="w-full py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
