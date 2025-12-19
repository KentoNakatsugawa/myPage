'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  validateProfileForm,
  type ProfileValidationErrors,
} from '@/utils';

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

// Reusable input component with error display
function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-gray-300 focus:ring-norel-green'
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function ProfileModals({
  activeModal,
  formData,
  setFormData,
  onSave,
  onClose,
}: ProfileModalsProps) {
  const [errors, setErrors] = useState<ProfileValidationErrors>({});

  const handleSave = (modalType: 'address' | 'phone' | 'company') => {
    const { isValid, errors: validationErrors } = validateProfileForm(modalType, formData);
    setErrors(validationErrors);

    if (isValid) {
      onSave();
      setErrors({});
    }
  };

  if (!activeModal) return null;

  if (activeModal === 'address') {
    return (
      <>
        <h3 className="text-lg font-bold text-gray-900 mb-4">住所変更</h3>
        <div className="space-y-4">
          <FormInput
            label="郵便番号"
            value={formData.zipCode}
            onChange={(value) => setFormData((prev) => ({ ...prev, zipCode: value }))}
            placeholder="150-0041"
            error={errors.zipCode}
          />
          <FormInput
            label="住所"
            value={formData.address}
            onChange={(value) => setFormData((prev) => ({ ...prev, address: value }))}
            placeholder="東京都渋谷区..."
            error={errors.address}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSave('address')}
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
          <FormInput
            label="新しい電話番号"
            type="tel"
            value={formData.phone}
            onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
            placeholder="090-1234-5678"
            error={errors.phone}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSave('phone')}
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
          <FormInput
            label="会社名"
            value={formData.company}
            onChange={(value) => setFormData((prev) => ({ ...prev, company: value }))}
            placeholder="株式会社..."
            error={errors.company}
          />
          <FormInput
            label="会社電話番号"
            type="tel"
            value={formData.companyPhone}
            onChange={(value) => setFormData((prev) => ({ ...prev, companyPhone: value }))}
            placeholder="03-1234-5678"
            error={errors.companyPhone}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSave('company')}
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
