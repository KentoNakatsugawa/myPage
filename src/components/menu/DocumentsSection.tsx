'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Receipt, FileCheck, Download, ChevronRight } from 'lucide-react';
import { invoices, receipts } from '@/mocks';
import { downloadInvoice, downloadReceipt } from '../DocumentGenerator';

interface DocumentsSectionProps {
  onOpenContract: () => void;
}

export default function DocumentsSection({ onOpenContract }: DocumentsSectionProps) {
  return (
    <section>
      <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
        <FileText className="w-4 h-4" />
        ドキュメント管理
      </h3>
      <div className="bg-gray-50 rounded-xl overflow-hidden">
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
                  <p className="text-sm font-medium text-gray-800">{receipt.date}</p>
                  <p className="text-xs text-gray-500">¥{receipt.amount.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-800">{invoice.date}</p>
                  <p className="text-xs text-gray-500">¥{invoice.amount.toLocaleString()}</p>
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

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onOpenContract}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-500" />
            <div className="text-left">
              <span className="text-sm font-medium text-gray-800 block">契約内容</span>
              <span className="text-xs text-gray-500">オートリース契約書</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </motion.button>
      </div>
    </section>
  );
}
