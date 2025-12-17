'use client';

// Generate receipt/invoice HTML and trigger download
export function generateReceiptHTML(data: {
  date: string;
  amount: number;
  receiptNumber: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>領収書 - ${data.date}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Hiragino Sans', 'Meiryo', sans-serif; padding: 40px; background: #fff; }
    .receipt { max-width: 600px; margin: 0 auto; border: 2px solid #333; padding: 40px; }
    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { font-size: 32px; letter-spacing: 8px; }
    .recipient { margin-bottom: 30px; }
    .recipient-name { font-size: 24px; border-bottom: 1px solid #333; padding-bottom: 5px; display: inline-block; }
    .recipient-name span { font-size: 16px; margin-left: 10px; }
    .amount-section { background: #f5f5f5; padding: 20px; text-align: center; margin-bottom: 30px; }
    .amount-label { font-size: 14px; color: #666; }
    .amount { font-size: 36px; font-weight: bold; }
    .amount::before { content: '¥'; }
    .amount::after { content: '-'; margin-left: 5px; }
    .details { margin-bottom: 30px; }
    .details table { width: 100%; border-collapse: collapse; }
    .details th, .details td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
    .details th { width: 30%; color: #666; font-weight: normal; }
    .issuer { text-align: right; margin-top: 40px; }
    .issuer .company { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
    .issuer .address { font-size: 12px; color: #666; line-height: 1.6; }
    .stamp { width: 80px; height: 80px; border: 2px solid #c00; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #c00; font-size: 14px; margin-top: 10px; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <h1>領 収 書</h1>
    </div>

    <div class="recipient">
      <p class="recipient-name">山田 太郎 <span>様</span></p>
    </div>

    <div class="amount-section">
      <p class="amount-label">金額</p>
      <p class="amount">${data.amount.toLocaleString()}</p>
    </div>

    <div class="details">
      <table>
        <tr>
          <th>発行日</th>
          <td>${data.date}</td>
        </tr>
        <tr>
          <th>領収書番号</th>
          <td>${data.receiptNumber}</td>
        </tr>
        <tr>
          <th>但し書き</th>
          <td>カーリース料として</td>
        </tr>
        <tr>
          <th>支払方法</th>
          <td>口座振替</td>
        </tr>
      </table>
    </div>

    <div class="issuer">
      <p class="company">株式会社IDOM CaaS Technology</p>
      <p class="address">
        〒150-0041<br>
        東京都渋谷区神南一丁目19番4号<br>
        TEL: 03-XXXX-XXXX
      </p>
      <div class="stamp">社印</div>
    </div>

    <div class="footer">
      この領収書は電子的に発行されたものです。
    </div>
  </div>
</body>
</html>
  `;
}

export function generateInvoiceHTML(data: {
  date: string;
  amount: number;
  invoiceNumber: string;
  dueDate: string;
}): string {
  const tax = Math.floor(data.amount * 0.1);
  const subtotal = data.amount - tax;

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>請求書 - ${data.date}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Hiragino Sans', 'Meiryo', sans-serif; padding: 40px; background: #fff; }
    .invoice { max-width: 700px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
    .header h1 { font-size: 28px; color: #00A040; }
    .header .invoice-info { text-align: right; font-size: 12px; color: #666; }
    .header .invoice-number { font-size: 14px; font-weight: bold; color: #333; }
    .parties { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .party { width: 45%; }
    .party h3 { font-size: 12px; color: #666; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
    .party .name { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
    .party .address { font-size: 12px; color: #666; line-height: 1.6; }
    .amount-box { background: linear-gradient(135deg, #00A040, #008030); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .amount-box .label { font-size: 12px; opacity: 0.8; }
    .amount-box .amount { font-size: 32px; font-weight: bold; }
    .items { margin-bottom: 30px; }
    .items table { width: 100%; border-collapse: collapse; }
    .items th { background: #f5f5f5; padding: 12px; text-align: left; font-size: 12px; color: #666; }
    .items td { padding: 12px; border-bottom: 1px solid #eee; }
    .items .amount-col { text-align: right; }
    .totals { margin-left: auto; width: 250px; }
    .totals table { width: 100%; }
    .totals td { padding: 8px 0; }
    .totals .label { color: #666; }
    .totals .value { text-align: right; }
    .totals .total-row { font-size: 18px; font-weight: bold; border-top: 2px solid #333; }
    .payment-info { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 30px; }
    .payment-info h3 { font-size: 14px; margin-bottom: 10px; }
    .payment-info p { font-size: 12px; color: #666; line-height: 1.8; }
    .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #999; }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      <div>
        <h1>請 求 書</h1>
      </div>
      <div class="invoice-info">
        <p class="invoice-number">請求書番号: ${data.invoiceNumber}</p>
        <p>発行日: ${data.date}</p>
        <p>お支払期限: ${data.dueDate}</p>
      </div>
    </div>

    <div class="parties">
      <div class="party">
        <h3>請求先</h3>
        <p class="name">山田 太郎 様</p>
        <p class="address">
          〒150-0041<br>
          東京都渋谷区神南1-1-1
        </p>
      </div>
      <div class="party">
        <h3>請求元</h3>
        <p class="name">株式会社IDOM CaaS Technology</p>
        <p class="address">
          〒150-0041<br>
          東京都渋谷区神南一丁目19番4号<br>
          TEL: 03-XXXX-XXXX
        </p>
      </div>
    </div>

    <div class="amount-box">
      <p class="label">ご請求金額（税込）</p>
      <p class="amount">¥${data.amount.toLocaleString()}</p>
    </div>

    <div class="items">
      <table>
        <thead>
          <tr>
            <th>品目</th>
            <th>数量</th>
            <th class="amount-col">単価</th>
            <th class="amount-col">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>カーリース料（ホンダ ヴェゼル e:HEV Z）</td>
            <td>1ヶ月</td>
            <td class="amount-col">¥${subtotal.toLocaleString()}</td>
            <td class="amount-col">¥${subtotal.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="totals">
      <table>
        <tr>
          <td class="label">小計</td>
          <td class="value">¥${subtotal.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="label">消費税（10%）</td>
          <td class="value">¥${tax.toLocaleString()}</td>
        </tr>
        <tr class="total-row">
          <td>合計</td>
          <td class="value">¥${data.amount.toLocaleString()}</td>
        </tr>
      </table>
    </div>

    <div class="payment-info">
      <h3>お支払いについて</h3>
      <p>
        毎月5日にご登録の口座より自動引き落としとなります。<br>
        引き落とし日が金融機関休業日の場合は翌営業日となります。<br>
        残高不足にご注意ください。
      </p>
    </div>

    <div class="footer">
      この請求書は電子的に発行されたものです。 | NOREL WITH
    </div>
  </div>
</body>
</html>
  `;
}

export function downloadDocument(html: string, filename: string) {
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

export function downloadReceipt(date: string, amount: number, index: number) {
  const receiptNumber = `RCP-${new Date().getFullYear()}-${String(index).padStart(5, '0')}`;
  const html = generateReceiptHTML({ date, amount, receiptNumber });
  downloadDocument(html, `領収書_${date.replace(/年|月/g, '')}.html`);
}

export function downloadInvoice(date: string, amount: number, index: number) {
  const invoiceNumber = `INV-${new Date().getFullYear()}-${String(index).padStart(5, '0')}`;
  const dueDate = '毎月5日';
  const html = generateInvoiceHTML({ date, amount, invoiceNumber, dueDate });
  downloadDocument(html, `請求書_${date.replace(/年|月/g, '')}.html`);
}
