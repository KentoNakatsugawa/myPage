'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Building2, CreditCard, ChevronRight } from 'lucide-react';
import { UserProfile } from '@/types';

export type ProfileModalType = 'address' | 'phone' | 'company' | 'bank';

interface ProfileSectionProps {
  userProfile: UserProfile;
  onOpenModal: (modal: ProfileModalType) => void;
}

export default function ProfileSection({ userProfile, onOpenModal }: ProfileSectionProps) {
  return (
    <section>
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <Building2 className="w-4 h-4" />
        お客様情報の変更
      </h3>
      <div className="bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-200">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenModal('address')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">住所変更</p>
              <p className="text-xs text-gray-500">{userProfile.address}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenModal('phone')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">電話番号変更</p>
              <p className="text-xs text-gray-500">{userProfile.phone}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenModal('company')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">勤務先情報</p>
              <p className="text-xs text-gray-500">{userProfile.company}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenModal('bank')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">引き落とし口座</p>
              <p className="text-xs text-gray-500">登録済み</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>
      </div>
    </section>
  );
}
