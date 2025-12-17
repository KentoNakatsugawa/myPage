'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Receipt,
  FileCheck,
  MapPin,
  Phone,
  Building2,
  CreditCard,
  IdCard,
  Shield,
  Car,
  Download,
  Upload,
  ChevronRight,
  Check,
  LogOut,
} from 'lucide-react';
import { useNorel } from '@/contexts/NorelContext';
import ContractViewer from './ContractViewer';
import { downloadReceipt, downloadInvoice } from './DocumentGenerator';

// Mock data
const receipts = [
  { id: '1', date: '2024年12月', amount: 39800 },
  { id: '2', date: '2024年11月', amount: 39800 },
  { id: '3', date: '2024年10月', amount: 39800 },
];

const invoices = [
  { id: '1', date: '2025年1月', amount: 39800 },
  { id: '2', date: '2024年12月', amount: 39800 },
  { id: '3', date: '2024年11月', amount: 39800 },
];

type ModalType =
  | 'address'
  | 'phone'
  | 'company'
  | 'bank'
  | 'license'
  | 'insurance'
  | 'shaken'
  | null;

export default function MenuDrawer() {
  const { isMenuOpen, closeMenu, userProfile, updateProfile, logout } = useNorel();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isContractViewerOpen, setIsContractViewerOpen] = useState(false);
  const [formData, setFormData] = useState({
    zipCode: userProfile.zipCode,
    address: userProfile.address,
    phone: userProfile.phone,
    company: userProfile.company,
    companyPhone: userProfile.companyPhone,
  });

  const handleSave = () => {
    updateProfile(formData);
    setActiveModal(null);
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

            <div className="p-4 space-y-6">
              {/* Section 1: Contract Documents */}
              <section>
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  ドキュメント管理
                </h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  {/* Receipts */}
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-gray-500" />
                      領収書
                    </h4>
                    <div className="space-y-2">
                      {receipts.map((receipt, index) => (
                        <div
                          key={receipt.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {receipt.date}
                            </p>
                            <p className="text-xs text-gray-500">
                              ¥{receipt.amount.toLocaleString()}
                            </p>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => downloadReceipt(receipt.date, receipt.amount, index + 1)}
                            className="text-xs text-norel-green font-medium flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            ダウンロード
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invoices */}
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-gray-500" />
                      請求書
                    </h4>
                    <div className="space-y-2">
                      {invoices.map((invoice, index) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between bg-white p-3 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {invoice.date}
                            </p>
                            <p className="text-xs text-gray-500">
                              ¥{invoice.amount.toLocaleString()}
                            </p>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => downloadInvoice(invoice.date, invoice.amount, index + 1)}
                            className="text-xs text-norel-green font-medium flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            ダウンロード
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contract */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsContractViewerOpen(true)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <span className="text-sm font-medium text-gray-800 block">
                          契約内容
                        </span>
                        <span className="text-xs text-gray-500">
                          オートリース契約書
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
              </section>

              {/* Section 2: Profile Updates */}
              <section>
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  お客様情報の変更
                </h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-200">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('address')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          住所変更
                        </p>
                        <p className="text-xs text-gray-500">
                          {userProfile.address}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('phone')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          電話番号変更
                        </p>
                        <p className="text-xs text-gray-500">
                          {userProfile.phone}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('company')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          勤務先情報
                        </p>
                        <p className="text-xs text-gray-500">
                          {userProfile.company}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('bank')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          引き落とし口座
                        </p>
                        <p className="text-xs text-gray-500">登録済み</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>
              </section>

              {/* Section 3: Certificates */}
              <section>
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  証明書の更新・アップロード
                </h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-200">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('license')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <IdCard className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          免許証
                        </p>
                        <p className="text-xs text-gray-500">
                          有効期限: {userProfile.licenseExpiry}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      有効
                    </span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('insurance')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          保険証券
                        </p>
                        <p className="text-xs text-gray-500">
                          有効期限: {userProfile.insuranceExpiry}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      有効
                    </span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('shaken')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-gray-500" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-800">
                          車検・自賠責
                        </p>
                        <p className="text-xs text-gray-500">
                          有効期限: {userProfile.shakenExpiry}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      有効
                    </span>
                  </motion.button>
                </div>
              </section>

              {/* Section 4: Logout */}
              <section className="pt-4 border-t border-gray-200">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full p-4 bg-gray-50 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-red-500">
                    ログアウト
                  </span>
                </motion.button>
              </section>
            </div>

            {/* Modals */}
            <AnimatePresence>
              {activeModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-60 flex items-end justify-center"
                  onClick={() => setActiveModal(null)}
                >
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md bg-white rounded-t-2xl p-6"
                  >
                    {activeModal === 'address' && (
                      <>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          住所変更
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-600 mb-1 block">
                              郵便番号
                            </label>
                            <input
                              type="text"
                              value={formData.zipCode}
                              onChange={(e) =>
                                setFormData({ ...formData, zipCode: e.target.value })
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
                              placeholder="150-0041"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 mb-1 block">
                              住所
                            </label>
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
                              placeholder="東京都渋谷区..."
                            />
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
                          >
                            保存する
                          </motion.button>
                        </div>
                      </>
                    )}

                    {activeModal === 'phone' && (
                      <>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          電話番号変更
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-600 mb-1 block">
                              新しい電話番号
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
                              placeholder="090-1234-5678"
                            />
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
                          >
                            保存する
                          </motion.button>
                        </div>
                      </>
                    )}

                    {activeModal === 'company' && (
                      <>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          勤務先情報
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-600 mb-1 block">
                              会社名
                            </label>
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) =>
                                setFormData({ ...formData, company: e.target.value })
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
                              placeholder="株式会社..."
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 mb-1 block">
                              会社電話番号
                            </label>
                            <input
                              type="tel"
                              value={formData.companyPhone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  companyPhone: e.target.value,
                                })
                              }
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-norel-green"
                              placeholder="03-1234-5678"
                            />
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
                          >
                            保存する
                          </motion.button>
                        </div>
                      </>
                    )}

                    {activeModal === 'bank' && (
                      <>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          引き落とし口座
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          口座情報の変更は、外部の銀行APIに接続します。
                        </p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveModal(null)}
                          className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
                        >
                          口座変更ページへ
                        </motion.button>
                      </>
                    )}

                    {(activeModal === 'license' ||
                      activeModal === 'insurance' ||
                      activeModal === 'shaken') && (
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
                                <p className="text-sm text-gray-600">
                                  免許証（表面）をアップロード
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id="license-front"
                                />
                                <label
                                  htmlFor="license-front"
                                  className="mt-2 inline-block text-norel-green text-sm font-medium cursor-pointer"
                                >
                                  ファイルを選択
                                </label>
                              </div>
                              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">
                                  免許証（裏面）をアップロード
                                </p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id="license-back"
                                />
                                <label
                                  htmlFor="license-back"
                                  className="mt-2 inline-block text-norel-green text-sm font-medium cursor-pointer"
                                >
                                  ファイルを選択
                                </label>
                              </div>
                            </>
                          )}
                          {(activeModal === 'insurance' ||
                            activeModal === 'shaken') && (
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">
                                書類をアップロード
                              </p>
                              <input
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                id="document-upload"
                              />
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
                            onClick={() => setActiveModal(null)}
                            className="w-full bg-norel-green text-white font-bold py-3 rounded-xl"
                          >
                            アップロード完了
                          </motion.button>
                        </div>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
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
