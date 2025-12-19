'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type ProfileModalType = 'address' | 'phone' | 'company' | 'bank' | null;

export interface ProfileFormData {
  zipCode: string;
  address: string;
  phone: string;
  company: string;
  companyPhone: string;
}

interface ProfileModalsProps {
  activeModal: ProfileModalType;
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  onSave: () => void;
  onClose: () => void;
}

export default function ProfileModals({
  activeModal,
  formData,
  setFormData,
  onSave,
  onClose,
}: ProfileModalsProps) {
  if (!activeModal) return null;

  if (activeModal === 'address') {
    return (
      <>
        <h3 className="text-lg font-bold text-gray-900 mb-4">住所変更</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">郵便番号</label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
              placeholder="150-0041"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">住所</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
              placeholder="東京都渋谷区..."
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
          >
            保存する
          </motion.button>
        </div>
      </>
    );
  }

  if (activeModal === 'phone') {
    return (
      <>
        <h3 className="text-lg font-bold text-gray-900 mb-4">電話番号変更</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">新しい電話番号</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
              placeholder="090-1234-5678"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
          >
            保存する
          </motion.button>
        </div>
      </>
    );
  }

  if (activeModal === 'company') {
    return (
      <>
        <h3 className="text-lg font-bold text-gray-900 mb-4">勤務先情報</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">会社名</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
              placeholder="株式会社..."
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">会社電話番号</label>
            <input
              type="tel"
              value={formData.companyPhone}
              onChange={(e) => setFormData((prev) => ({ ...prev, companyPhone: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
              placeholder="03-1234-5678"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
          >
            保存する
          </motion.button>
        </div>
      </>
    );
  }

  if (activeModal === 'bank') {
    return (
      <>
        <h3 className="text-lg font-bold text-gray-900 mb-4">引き落とし口座</h3>
        <p className="text-sm text-gray-600 mb-4">口座情報の変更は、外部の銀行APIに接続します。</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
        >
          口座変更ページへ
        </motion.button>
      </>
    );
  }

  return null;
}
