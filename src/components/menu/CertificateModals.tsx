'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export type CertificateModalType = 'license' | 'insurance' | 'shaken' | null;

interface CertificateModalsProps {
  activeModal: CertificateModalType;
  onClose: () => void;
}

export default function CertificateModals({ activeModal, onClose }: CertificateModalsProps) {
  if (!activeModal) return null;

  if (activeModal !== 'license' && activeModal !== 'insurance' && activeModal !== 'shaken') {
    return null;
  }

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {activeModal === 'license' && '免許証のアップロード'}
        {activeModal === 'insurance' && '保険証券のアップロード'}
        {activeModal === 'shaken' && '車検証のアップロード'}
      </h3>
      <div className="space-y-4">
        {activeModal === 'license' && (
          <>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">免許証（表面）をアップロード</p>
              <input type="file" accept="image/*" className="hidden" id="license-front" />
              <label
                htmlFor="license-front"
                className="mt-2 inline-block text-norel-green text-sm font-medium cursor-pointer"
              >
                ファイルを選択
              </label>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">免許証（裏面）をアップロード</p>
              <input type="file" accept="image/*" className="hidden" id="license-back" />
              <label
                htmlFor="license-back"
                className="mt-2 inline-block text-norel-green text-sm font-medium cursor-pointer"
              >
                ファイルを選択
              </label>
            </div>
          </>
        )}

        {(activeModal === 'insurance' || activeModal === 'shaken') && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">書類をアップロード</p>
            <input type="file" accept="image/*,.pdf" className="hidden" id="document-upload" />
            <label
              htmlFor="document-upload"
              className="mt-2 inline-block text-norel-green text-sm font-medium cursor-pointer"
            >
              ファイルを選択
            </label>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
        >
          アップロード完了
        </motion.button>
      </div>
    </>
  );
}
