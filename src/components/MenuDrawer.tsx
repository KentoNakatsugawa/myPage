'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useNorel } from '@/contexts/NorelContext';
import ContractViewer from './ContractViewer';
import DocumentsSection from './menu/DocumentsSection';
import ProfileSection, { ProfileModalType as ProfileSectionModalType } from './menu/ProfileSection';
import CertificatesSection, {
  CertificateModalType as CertificatesSectionModalType,
} from './menu/CertificatesSection';
import LogoutSection from './menu/LogoutSection';
import ModalShell from './menu/ModalShell';
import ProfileModals, { ProfileFormData, ProfileModalType } from './menu/ProfileModals';
import CertificateModals, { CertificateModalType } from './menu/CertificateModals';

export default function MenuDrawer() {
  const { isMenuOpen, closeMenu, userProfile, updateProfile, logout } = useNorel();
  const [activeProfileModal, setActiveProfileModal] = useState<ProfileModalType>(null);
  const [activeCertificateModal, setActiveCertificateModal] = useState<CertificateModalType>(null);
  const [isContractViewerOpen, setIsContractViewerOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    zipCode: userProfile.zipCode,
    address: userProfile.address,
    phone: userProfile.phone,
    company: userProfile.company,
    companyPhone: userProfile.companyPhone,
  });

  const handleSave = () => {
    updateProfile(formData);
    setActiveProfileModal(null);
  };

  const openProfileModal = (modal: ProfileSectionModalType) => {
    setActiveCertificateModal(null);
    setActiveProfileModal(modal);
  };

  const openCertificateModal = (modal: CertificatesSectionModalType) => {
    setActiveProfileModal(null);
    setActiveCertificateModal(modal);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-gray-900">設定・契約情報</h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closeMenu}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>

            {/* Vehicle Hero Image */}
            <div className="relative">
              <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"
                    alt="Toyota Camry"
                    className="w-full h-full object-cover"
                    width={800}
                    height={450}
                  />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white/80 text-xs">ご契約中の車両</p>
                <p className="text-white text-lg font-bold">BMW 320d Mスポーツ</p>
                <p className="text-white/70 text-xs mt-1">2018年式 / アルピンホワイト</p>
              </div>
            </div>

            <div className="p-4 space-y-6">
              <DocumentsSection onOpenContract={() => setIsContractViewerOpen(true)} />
              <ProfileSection userProfile={userProfile} onOpenModal={openProfileModal} />
              <CertificatesSection userProfile={userProfile} onOpenModal={openCertificateModal} />
              <LogoutSection
                onLogout={() => {
                  logout();
                  closeMenu();
                }}
              />
            </div>

            {/* Modals */}
            <ModalShell
              isOpen={Boolean(activeProfileModal) || Boolean(activeCertificateModal)}
              onClose={() => {
                setActiveProfileModal(null);
                setActiveCertificateModal(null);
              }}
            >
              <ProfileModals
                activeModal={activeProfileModal}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                onClose={() => setActiveProfileModal(null)}
              />
              <CertificateModals
                activeModal={activeCertificateModal}
                onClose={() => setActiveCertificateModal(null)}
              />
            </ModalShell>
          </motion.div>

          {/* Contract Viewer */}
          <ContractViewer
            isOpen={isContractViewerOpen}
            onClose={() => setIsContractViewerOpen(false)}
          />
        </>
      )}
    </AnimatePresence>
  );
}
