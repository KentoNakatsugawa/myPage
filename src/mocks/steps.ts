import { StepInfo, AlertType } from '@/types';

export const stepData: StepInfo[] = [
  {
    id: 1,
    phase: 'Entry',
    title: '前受金のお支払い (1/2)',
    description:
      'まずは最初の決済をお願いします。\nクレジットカードがご利用いただけます。',
    buttonLabel: '支払画面へ進む',
  },
  {
    id: 2,
    phase: 'Entry',
    title: '前受金のお支払い (2/2)',
    description:
      '残りの金額のお支払いをお願いします。\nこれが完了すると契約へ進めます。',
    buttonLabel: '残金を支払う',
  },
  {
    id: 3,
    phase: 'Contract',
    title: '電子契約書の締結',
    description:
      '契約内容をご確認の上、\n電子サインをお願いいたします。',
    buttonLabel: '契約書を確認してサイン',
  },
  {
    id: 4,
    phase: 'Contract',
    title: '引き落とし口座の登録',
    description: '毎月5日の引き落とし口座を\n設定してください。',
    buttonLabel: '口座を登録する',
  },
  {
    id: 5,
    phase: 'Garage',
    title: '必要書類の提出',
    description:
      '車庫証明と住民票の写真を\nアップロードしてください。',
    buttonLabel: '書類をアップロード',
  },
  {
    id: 6,
    phase: 'Preparation',
    title: '車両準備中',
    description:
      '名義変更・車検・クリーニング・\n整備・輸送手配を行っています。',
    buttonLabel: '準備状況を確認',
  },
  {
    id: 7,
    phase: 'Delivery',
    title: '納車日の確定',
    description:
      'お届け先の住所と\n希望日時を選択してください。',
    buttonLabel: '納車日を予約する',
  },
  {
    id: 8,
    phase: 'Active',
    title: 'AI査定: 乗り換えチャンス',
    description:
      '現在の市場価格が高騰しています。\nお得に乗り換えるチャンスです。',
    buttonLabel: '査定詳細・カタログを見る',
  },
];

export interface AlertInfo {
  title: string;
  description: string;
  buttonLabel: string;
}

export const alertData: Record<Exclude<AlertType, null>, AlertInfo> = {
  license: {
    title: '【重要】免許証の更新',
    description:
      '免許証の有効期限が近づいています。\n新しい免許証を登録してください。',
    buttonLabel: '免許証を撮影する',
  },
  insurance: {
    title: '【重要】保険証券の更新',
    description:
      '保険証券の有効期限が近づいています。\n新しい保険証券をアップロードしてください。',
    buttonLabel: '保険証券をアップロード',
  },
  shaken: {
    title: '【重要】車検の更新',
    description:
      '車検の有効期限が近づいています。\n車検証をアップロードしてください。',
    buttonLabel: '車検証をアップロード',
  },
};

// Helper function to get station index from step number
export function getStationIndex(step: number): number {
  if (step <= 2) return 0; // Steps 1-2: Entry (申込)
  if (step <= 4) return 1; // Steps 3-4: Contract (契約)
  if (step === 5) return 2; // Step 5: Docs (書類)
  if (step === 6) return 3; // Step 6: Vehicle Preparation (車両準備)
  if (step === 7) return 4; // Step 7: Delivery (納車)
  return 5; // Step 8: Active (利用中)
}

// Station data for RoadPath
export const stations = [
  { id: 1, label: '申込', x: 30, y: 160 },
  { id: 2, label: '契約', x: 85, y: 100 },
  { id: 3, label: '書類', x: 150, y: 140 },
  { id: 4, label: '車両準備', x: 215, y: 80 },
  { id: 5, label: '納車', x: 280, y: 130 },
  { id: 6, label: '利用中', x: 340, y: 90 },
];

// Phase info for RoadPath
export interface PhaseInfo {
  name: string;
  desc: string;
  bgColor: string;
  textColor: string;
}

export const phaseInfo: Record<number, PhaseInfo> = {
  1: { name: '申込フェーズ', desc: '前受金のお支払い', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  2: { name: '申込フェーズ', desc: '前受金のお支払い', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  3: { name: '契約フェーズ', desc: '電子契約・口座登録', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  4: { name: '契約フェーズ', desc: '電子契約・口座登録', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  5: { name: '書類フェーズ', desc: '必要書類の提出', bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
  6: { name: '準備フェーズ', desc: '車両の準備中', bgColor: 'bg-cyan-100', textColor: 'text-cyan-700' },
  7: { name: '納車フェーズ', desc: '納車日の確定', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
  8: { name: '利用中', desc: 'カーライフをお楽しみください', bgColor: 'bg-norel-green-light', textColor: 'text-norel-green' },
};
