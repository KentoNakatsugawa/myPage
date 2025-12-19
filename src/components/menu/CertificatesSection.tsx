'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IdCard, Shield, Car } from 'lucide-react';
import { UserProfile } from '@/types';

export type CertificateModalType = 'license' | 'insurance' | 'shaken';

interface CertificatesSectionProps {
  userProfile: UserProfile;
  onOpenModal: (modal: CertificateModalType) => void;
}

function ValidBadge() {
  return (
    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
      有効
    </span>
  );
}

export default function CertificatesSection({ userProfile, onOpenModal }: CertificatesSectionProps) {
  return (
    <section>
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <IdCard className="w-4 h-4" />
        証明書の更新・アップロード
      </h3>
      <div className="bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-200">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenModal('license')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <IdCard className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">免許証</p>
              <p className="text-xs text-gray-500">有効期限: {userProfile.licenseExpiry}</p>
            </div>
          </div>
          <ValidBadge />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenModal('insurance')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">保険証券</p>
              <p className="text-xs text-gray-500">有効期限: {userProfile.insuranceExpiry}</p>
            </div>
          </div>
          <ValidBadge />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenModal('shaken')}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Car className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">車検・自賠責</p>
              <p className="text-xs text-gray-500">有効期限: {userProfile.shakenExpiry}</p>
            </div>
          </div>
          <ValidBadge />
        </motion.button>
      </div>
    </section>
  );
}
