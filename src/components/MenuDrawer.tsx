'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { X, Sparkles } from 'lucide-react';
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

// Floating card wrapper with glow effect
function FloatingCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 160, 64, 0.15)' }}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-float border border-white/50 transition-all duration-300"
    >
      {children}
    </motion.div>
  );
}

// Parallax hero image component
function ParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-50, 50], [2, -2]);
  const rotateY = useTransform(xSpring, [-50, 50], [-2, 2]);
  const imageX = useTransform(xSpring, [-50, 50], [-10, 10]);
  const imageY = useTransform(ySpring, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl mx-4 mt-4 shadow-glass-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="aspect-[16/9] relative"
        style={{ rotateX, rotateY }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ x: imageX, y: imageY, scale: 1.1 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80"
            alt="BMW 320d Mスポーツ - ご契約中の車両"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            priority
          />
        </motion.div>
        {/* Gradient overlay with sparkle */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2">
            <p className="text-white/90 text-xs font-medium tracking-wide">ご契約中の車両</p>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </div>
          <p className="text-white text-xl font-bold mt-1 drop-shadow-lg">BMW 320d Mスポーツ</p>
          <p className="text-white/80 text-sm mt-1">2018年式 / アルピンホワイト</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer - Glassmorphism */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white/80 backdrop-blur-2xl z-50 overflow-y-auto border-l border-white/20"
          >
            {/* Header - Glassmorphism */}
            <div className="sticky top-0 bg-white/70 backdrop-blur-xl border-b border-white/30 px-4 py-3 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                設定・契約情報
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeMenu}
                className="p-3 hover:bg-white/50 rounded-full transition-colors"
                aria-label="メニューを閉じる"
              >
                <X className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>

            {/* Parallax Vehicle Hero */}
            <ParallaxHero />

            {/* Floating Card Sections */}
            <div className="p-4 space-y-4">
              <FloatingCard delay={0.1}>
                <DocumentsSection onOpenContract={() => setIsContractViewerOpen(true)} />
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <ProfileSection userProfile={userProfile} onOpenModal={openProfileModal} />
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <CertificatesSection userProfile={userProfile} onOpenModal={openCertificateModal} />
              </FloatingCard>

              <FloatingCard delay={0.4}>
                <LogoutSection
                  onLogout={() => {
                    logout();
                    closeMenu();
                  }}
                />
              </FloatingCard>
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
