'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, FileText } from 'lucide-react';

interface ContractViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContractViewer({ isOpen, onClose }: ContractViewerProps) {
  const [scale, setScale] = React.useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/documents/contract.pdf';
    link.download = 'オートリース契約書_山田太郎_20251215.pdf';
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex flex-col"
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-norel-green-light rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-norel-green" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">オートリース契約書</h2>
                <p className="text-xs text-gray-500">契約番号: 0000000000034</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>

          {/* Toolbar */}
          <div className="bg-gray-100 px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleZoomOut}
                className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                disabled={scale <= 0.5}
              >
                <ZoomOut className="w-5 h-5 text-gray-600" />
              </motion.button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleZoomIn}
                className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                disabled={scale >= 2}
              >
                <ZoomIn className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-2 bg-norel-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-norel-green-dark transition-colors"
            >
              <Download className="w-4 h-4" />
              ダウンロード
            </motion.button>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-auto bg-gray-600 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
              style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
            >
              <iframe
                src="/documents/contract.pdf#toolbar=0&navpanes=0"
                className="w-full max-w-[800px] h-[calc(100vh-180px)] bg-white rounded-lg shadow-2xl"
                title="契約書PDF"
              />
            </motion.div>
          </div>

          {/* Contract Summary Footer */}
          <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500">契約日</p>
                <p className="text-sm font-bold text-gray-900">2025/12/15</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">リース期間</p>
                <p className="text-sm font-bold text-gray-900">84ヵ月</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">月額リース料</p>
                <p className="text-sm font-bold text-norel-green">¥67,540</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
