'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ChevronRight, X, Calendar, Check } from 'lucide-react';
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
  const paidCount = paymentSchedule.filter(p => p.isPaid).length;
  const remainingCount = paymentSchedule.length - paidCount;

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
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
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

              {/* Summary */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">月額お支払い</p>
                    <p className="text-xl font-bold text-gray-900">¥{paymentInfo.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">お支払い回数</p>
                    <p className="text-sm font-medium text-gray-700">
                      <span className="text-blue-600 font-bold">{paidCount}</span> / {paymentSchedule.length}回
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">残り</p>
                    <p className="text-sm font-bold text-indigo-600">{remainingCount}回</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                    style={{ width: `${(paidCount / paymentSchedule.length) * 100}%` }}
                  />
                </div>
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
                <p className="text-xs text-gray-500 text-center">
                  毎月5日に登録口座より自動引き落としされます
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
