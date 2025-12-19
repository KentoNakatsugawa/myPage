'use client';

import { generateReceiptHTML, generateInvoiceHTML } from '@/utils';

// Download document helper
function downloadDocument(html: string, filename: string) {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Generate receipt number
function generateReceiptNumber(index: number): string {
  return `RCP-${new Date().getFullYear()}-${String(index).padStart(5, '0')}`;
}

// Generate invoice number
function generateInvoiceNumber(index: number): string {
  return `INV-${new Date().getFullYear()}-${String(index).padStart(5, '0')}`;
}

// Public API - download receipt
export function downloadReceipt(date: string, amount: number, index: number) {
  const receiptNumber = generateReceiptNumber(index);
  const html = generateReceiptHTML({ date, amount, receiptNumber });
  downloadDocument(html, `領収書_${date.replace(/年|月/g, '')}.html`);
}

// Public API - download invoice
export function downloadInvoice(date: string, amount: number, index: number) {
  const invoiceNumber = generateInvoiceNumber(index);
  const dueDate = '毎月5日';
  const html = generateInvoiceHTML({ date, amount, invoiceNumber, dueDate });
  downloadDocument(html, `請求書_${date.replace(/年|月/g, '')}.html`);
}

// Re-export for backward compatibility
export { generateReceiptHTML, generateInvoiceHTML };
