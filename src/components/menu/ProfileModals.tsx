'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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

export interface BankFormData {
  bankName: string;
  branchName: string;
  accountType: 'ordinary' | 'current' | 'savings';
  accountNumber: string;
  accountHolder: string;
}

interface ProfileModalsProps {
  activeModal: ProfileModalType;
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  onSave: () => void;
  onClose: () => void;
}

// Bank list for dropdown
const bankList = [
  'みずほ銀行',
  '三菱UFJ銀行',
  '三井住友銀行',
  'りそな銀行',
  'ゆうちょ銀行',
  '楽天銀行',
  '住信SBIネット銀行',
  'PayPay銀行',
  'その他',
];

// Reusable input component with error display
function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  note,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  note?: string;
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
      {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// Select dropdown component
function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green appearance-none bg-white"
        >
          <option value="">選択してください</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

// Radio button group component
function FormRadioGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-2 block">{label}</label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                value === option.value
                  ? 'border-norel-green'
                  : 'border-gray-300'
              }`}
            >
              {value === option.value && (
                <div className="w-3 h-3 rounded-full bg-norel-green" />
              )}
            </div>
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
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

  // Bank form state
  const [bankForm, setBankForm] = useState<BankFormData>({
    bankName: 'みずほ銀行',
    branchName: '渋谷支店',
    accountType: 'ordinary',
    accountNumber: '1234567',
    accountHolder: 'ヤマダ タロウ',
  });

  const handleSave = (modalType: 'address' | 'phone' | 'company') => {
    const { isValid, errors: validationErrors } = validateProfileForm(modalType, formData);
    setErrors(validationErrors);

    if (isValid) {
      onSave();
      setErrors({});
    }
  };

  const handleBankSave = () => {
    // No validation as requested, just save and close
    onSave();
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
        <div className="space-y-4">
          <FormSelect
            label="金融機関"
            value={bankForm.bankName}
            onChange={(value) => setBankForm((prev) => ({ ...prev, bankName: value }))}
            options={bankList}
          />
          <FormInput
            label="支店名"
            value={bankForm.branchName}
            onChange={(value) => setBankForm((prev) => ({ ...prev, branchName: value }))}
            placeholder="渋谷支店"
          />
          <FormRadioGroup
            label="口座種別"
            value={bankForm.accountType}
            onChange={(value) => setBankForm((prev) => ({ ...prev, accountType: value as BankFormData['accountType'] }))}
            options={[
              { value: 'ordinary', label: '普通' },
              { value: 'current', label: '当座' },
              { value: 'savings', label: '貯蓄' },
            ]}
          />
          <FormInput
            label="口座番号"
            value={bankForm.accountNumber}
            onChange={(value) => setBankForm((prev) => ({ ...prev, accountNumber: value }))}
            placeholder="1234567"
          />
          <FormInput
            label="口座名義"
            value={bankForm.accountHolder}
            onChange={(value) => setBankForm((prev) => ({ ...prev, accountHolder: value }))}
            placeholder="ヤマダ タロウ"
            note="※カタカナで入力してください"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBankSave}
            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
          >
            この口座を登録する
          </motion.button>
        </div>
      </>
    );
  }

  return null;
}
