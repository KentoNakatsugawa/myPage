export interface BillingItem {
  id: string;
  date: string;
  amount: number;
}

export const receipts: BillingItem[] = [
  { id: '1', date: '2024年12月', amount: 39800 },
  { id: '2', date: '2024年11月', amount: 39800 },
  { id: '3', date: '2024年10月', amount: 39800 },
];

export const invoices: BillingItem[] = [
  { id: '1', date: '2025年1月', amount: 39800 },
  { id: '2', date: '2024年12月', amount: 39800 },
  { id: '3', date: '2024年11月', amount: 39800 },
];
