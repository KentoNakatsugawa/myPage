import { test, expect } from '@playwright/test';

// Helper: ログイン（LineMockUIからダッシュボードへ遷移）
async function loginToDashboard(page: import('@playwright/test').Page) {
  await page.goto('/');
  // LineMockUIの「マイページを開く」ボタンをクリック
  await page.getByText('マイページを開く').click();
  // ダッシュボードへの遷移を待機
  await page.waitForTimeout(1500);
  await expect(page.getByText('NOREL SCORE')).toBeVisible({ timeout: 10000 });
}

test.describe('NOREL WITH E2E Tests', () => {
  // ===== ログインフロー =====
  test('LINE MockUIが表示され、マイページ開くとダッシュボードに遷移できる', async ({ page }) => {
    await page.goto('/');

    // LineMockUIの表示確認
    await expect(page.getByRole('heading', { name: 'NOREL WITH' })).toBeVisible();
    await expect(page.getByText('マイページを開く')).toBeVisible();

    // マイページを開く
    await page.getByText('マイページを開く').click();

    // ダッシュボードへ遷移確認
    await page.waitForTimeout(1500);
    await expect(page.getByText('NOREL SCORE')).toBeVisible();
  });

  // ===== ステップ進行テスト =====
  test('ミッションカードのステップを1から8まで進行できる', async ({ page }) => {
    await loginToDashboard(page);

    const steps = [
      { step: 1, title: '前受金のお支払い (1/2)', button: '支払画面へ進む' },
      { step: 2, title: '前受金のお支払い (2/2)', button: '残金を支払う' },
      { step: 3, title: '電子契約書の締結', button: '契約書を確認してサイン' },
      { step: 4, title: '引き落とし口座の登録', button: '口座を登録する' },
      { step: 5, title: '必要書類の提出', button: '書類をアップロード' },
      { step: 6, title: '車両準備中', button: '準備状況を確認' },
      { step: 7, title: '納車日の確定', button: '納車日を予約する' },
      { step: 8, title: 'AI査定: 乗り換えチャンス', button: '査定詳細・カタログを見る' },
    ];

    for (const { step, title, button } of steps) {
      // 現在のステップ確認
      await expect(page.getByText(title)).toBeVisible();

      if (step < 8) {
        // 次のステップへ進む
        await page.getByRole('button', { name: button }).click();
        await page.waitForTimeout(800);
      }
    }
  });

  // ===== 紙吹雪エフェクト確認 =====
  test('ステップ3完了時に紙吹雪が表示される', async ({ page }) => {
    await loginToDashboard(page);

    // ステップ1, 2をスキップ
    await page.getByRole('button', { name: '支払画面へ進む' }).click();
    await page.waitForTimeout(800);
    await page.getByRole('button', { name: '残金を支払う' }).click();
    await page.waitForTimeout(800);

    // ステップ3完了（契約締結）- canvas要素の存在確認
    await page.getByRole('button', { name: '契約書を確認してサイン' }).click();

    // confettiがcanvasを作成することを確認
    await expect(page.locator('canvas')).toBeVisible({ timeout: 3000 });
  });

  // ===== 支払いスケジュール =====
  test('支払いスケジュールモーダルが開き、82回分の支払いが表示される', async ({ page }) => {
    await loginToDashboard(page);

    // ステップ7まで進める（車両登録後に支払いスケジュールが利用可能）
    const buttons = [
      '支払画面へ進む',
      '残金を支払う',
      '契約書を確認してサイン',
      '口座を登録する',
      '書類をアップロード',
      '準備状況を確認',
      '納車日を予約する',
    ];

    for (const btn of buttons) {
      await page.getByRole('button', { name: btn }).click();
      await page.waitForTimeout(800);
    }

    // 支払いウィジェットをクリック
    await page.getByText('支払いスケジュールを見る').click();

    // モーダル表示確認
    await expect(page.getByText('お支払いスケジュール')).toBeVisible();
    await expect(page.getByText('山田 太郎 様')).toBeVisible();

    // 前受金説明バナーが表示される
    await expect(page.getByText('前受金について')).toBeVisible();
    await expect(page.getByText(/3回目から開始/)).toBeVisible();

    // テーブル内に82回目が存在することを確認
    await expect(page.getByText('82回目')).toBeAttached();
  });

  // ===== AIコンシェルジュFAQ =====
  test('AIコンシェルジュが開き、初期メッセージとFAQボタンが表示される', async ({ page }) => {
    await loginToDashboard(page);

    // AIコンシェルジュを開く（フローティングボタン）
    await page.locator('button.fixed.bottom-24').click();

    // モーダルが開いたことを確認
    await expect(page.getByRole('heading', { name: 'NORELコンシェルジュ' })).toBeVisible();

    // 初期メッセージが表示されている
    await expect(page.getByText(/こんにちは！NORELコンシェルジュです/)).toBeVisible();

    // FAQが表示されている
    await expect(page.getByText('よくあるご質問')).toBeVisible();

    // FAQボタンが表示されている
    await expect(page.getByRole('button', { name: '月額料金' })).toBeVisible();
    await expect(page.getByRole('button', { name: '中途解約' })).toBeVisible();

    // メッセージ入力欄が表示されている
    await expect(page.getByPlaceholder('メッセージを入力')).toBeVisible();
  });

  // ===== サイドメニュー =====
  test('ハンバーガーメニューから設定画面にアクセスできる', async ({ page }) => {
    await loginToDashboard(page);

    // ダッシュボード内のヘッダーからメニューボタンをクリック
    await page.locator('button[aria-label="メニューを開く"]').click();

    // メニュー項目確認
    await expect(page.getByRole('heading', { name: '設定・契約情報' })).toBeVisible();
    await expect(page.getByText('領収書', { exact: true })).toBeVisible();
    await expect(page.getByText('請求書', { exact: true })).toBeVisible();
    await expect(page.getByText('オートリース契約書')).toBeVisible();
    await expect(page.getByRole('button', { name: 'ログアウト' })).toBeVisible();

    // 車両情報が表示される
    await expect(page.getByText('BMW 320d Mスポーツ')).toBeVisible();
  });

  // ===== 車両レコメンド =====
  test('ステップ8で車両レコメンドモーダルが表示される', async ({ page }) => {
    await loginToDashboard(page);

    // ステップ8まで進める
    const buttons = [
      '支払画面へ進む',
      '残金を支払う',
      '契約書を確認してサイン',
      '口座を登録する',
      '書類をアップロード',
      '準備状況を確認',
      '納車日を予約する',
    ];

    for (const btn of buttons) {
      await page.getByRole('button', { name: btn }).click();
      await page.waitForTimeout(800);
    }

    // ステップ8の確認
    await expect(page.getByRole('heading', { name: 'AI査定: 乗り換えチャンス' })).toBeVisible();

    // 査定詳細ボタンをクリック
    await page.getByRole('button', { name: '査定詳細・カタログを見る' }).click();

    // レコメンドモーダル確認
    await expect(page.getByRole('heading', { name: 'AIおすすめ車両' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'BMW 420i クーペ' })).toBeVisible();
  });

  // ===== LINEへ戻る =====
  test('LINEボタンでLineMockUIに戻れる', async ({ page }) => {
    await loginToDashboard(page);

    // ダッシュボード表示確認
    await expect(page.getByText('NOREL SCORE')).toBeVisible();

    // LINEへ戻る
    await page.getByRole('button', { name: 'LINE' }).click();

    // LineMockUIに戻る
    await expect(page.getByText('マイページを開く')).toBeVisible();
  });

  // ===== RoadPath進捗確認 =====
  test('RoadPathの進捗が正しく表示される', async ({ page }) => {
    await loginToDashboard(page);

    // 申込フェーズが表示される
    await expect(page.getByText('申込フェーズ')).toBeVisible();

    // ステップを進める
    await page.getByRole('button', { name: '支払画面へ進む' }).click();
    await page.waitForTimeout(800);
    await page.getByRole('button', { name: '残金を支払う' }).click();
    await page.waitForTimeout(800);

    // 契約フェーズに進む
    await expect(page.getByText('契約フェーズ')).toBeVisible();
  });

  // ===== スコアメーター表示確認 =====
  test('NORELスコアメーターが正しく表示される', async ({ page }) => {
    await loginToDashboard(page);

    // スコアメーター確認
    await expect(page.getByText('NOREL SCORE')).toBeVisible();
    await expect(page.getByText('詳細を見る')).toBeVisible();

    // スコアをクリックして詳細を表示
    await page.getByText('詳細を見る').click();

    // スコア詳細が表示される
    await expect(page.getByRole('button', { name: '閉じる' })).toBeVisible();
  });
});

// ===== モバイル表示テスト =====
test.describe('モバイル表示テスト', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('モバイルサイズで主要要素が正しく表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByText('マイページを開く').click();
    await page.waitForTimeout(1500);

    // 主要要素が表示されている
    await expect(page.getByText('NOREL SCORE')).toBeVisible();
    await expect(page.getByText('申込フェーズ')).toBeVisible();
    await expect(page.getByText('次回のお支払い')).toBeVisible();
  });

  test('モバイルでAIコンシェルジュが使える', async ({ page }) => {
    await page.goto('/');
    await page.getByText('マイページを開く').click();
    await page.waitForTimeout(1500);

    // フローティングボタンをタップ
    await page.locator('button.fixed.bottom-24').click();

    // モーダルが表示される
    await expect(page.getByRole('heading', { name: 'NORELコンシェルジュ' })).toBeVisible();
  });
});
