import { test, expect } from '@playwright/test';

test.describe('NOREL WITH E2E Tests', () => {
  // ===== ログインフロー =====
  test('ログインページが表示され、LINEボタンでログインできる', async ({ page }) => {
    await page.goto('/');

    // ログインページの表示確認
    await expect(page.getByText('NOREL WITH')).toBeVisible();
    await expect(page.getByRole('button', { name: /LINE/i })).toBeVisible();

    // ログイン実行
    await page.getByRole('button', { name: /LINE/i }).click();

    // ダッシュボードへ遷移確認
    await expect(page.getByText('NOREL SCORE')).toBeVisible();
  });

  // ===== ステップ進行テスト =====
  test('ミッションカードのステップを1から8まで進行できる', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

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
        await page.waitForTimeout(500); // アニメーション待機
      }
    }
  });

  // ===== 紙吹雪エフェクト確認 =====
  test('ステップ3完了時に紙吹雪が表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // ステップ1, 2をスキップ
    await page.getByRole('button', { name: '支払画面へ進む' }).click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: '残金を支払う' }).click();
    await page.waitForTimeout(300);

    // ステップ3完了（契約締結）- canvas要素の存在確認
    await page.getByRole('button', { name: '契約書を確認してサイン' }).click();

    // confettiがcanvasを作成することを確認
    await expect(page.locator('canvas')).toBeVisible({ timeout: 2000 });
  });

  // ===== 支払いスケジュール =====
  test('支払いスケジュールモーダルが開き、82回分の支払いが表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // 支払いウィジェットをクリック
    await page.getByText('支払いスケジュールを見る').click();

    // モーダル表示確認
    await expect(page.getByText('お支払いスケジュール')).toBeVisible();
    await expect(page.getByText('山田 太郎 様')).toBeVisible();
    await expect(page.getByText('¥39,800')).toBeVisible();

    // 82回分の支払いが存在確認（スクロールして確認）
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // テーブル内に82回目が存在することを確認
    await expect(page.getByText('82回目')).toBeAttached();
  });

  // ===== AIコンシェルジュFAQ =====
  test('AIコンシェルジュでFAQ質問をタップすると回答が表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // AIコンシェルジュを開く（フローティングボタン）
    await page.locator('button').filter({ has: page.locator('.lucide-message-circle') }).first().click();

    // モーダルが開いたことを確認
    await expect(page.getByText('AIコンシェルジュ')).toBeVisible();

    // FAQが表示されている
    await expect(page.getByText('よくある質問')).toBeVisible();

    // FAQ質問をクリック
    await page.getByRole('button', { name: '月額料金に含まれるものは？' }).click();

    // 回答が表示される
    await expect(page.getByText(/車両代、自動車税/)).toBeVisible({ timeout: 2000 });
  });

  // ===== サイドメニュー =====
  test('ハンバーガーメニューから設定画面にアクセスできる', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // ハンバーガーメニューを開く
    await page.locator('header').locator('button').filter({ has: page.locator('.lucide-menu') }).click();

    // メニュー項目確認
    await expect(page.getByText('設定・契約情報')).toBeVisible();
    await expect(page.getByText('領収書')).toBeVisible();
    await expect(page.getByText('請求書')).toBeVisible();
    await expect(page.getByText('契約書')).toBeVisible();
    await expect(page.getByText('ログアウト')).toBeVisible();
  });

  // ===== 車両レコメンド =====
  test('ステップ8で車両レコメンドモーダルが表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

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
      await page.waitForTimeout(300);
    }

    // ステップ8の確認
    await expect(page.getByText('AI査定: 乗り換えチャンス')).toBeVisible();

    // 査定詳細ボタンをクリック
    await page.getByRole('button', { name: '査定詳細・カタログを見る' }).click();

    // レコメンドモーダル確認
    await expect(page.getByText('おすすめ車両 TOP3')).toBeVisible();
    await expect(page.getByText('トヨタ プリウス')).toBeVisible();
  });

  // ===== ログアウト =====
  test('ログアウトするとログインページに戻る', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // ダッシュボード表示確認
    await expect(page.getByText('NOREL SCORE')).toBeVisible();

    // メニューを開いてログアウト
    await page.locator('header').locator('button').filter({ has: page.locator('.lucide-menu') }).click();
    await page.getByRole('button', { name: 'ログアウト' }).click();

    // ログインページに戻る
    await expect(page.getByRole('button', { name: /LINE/i })).toBeVisible();
  });

  // ===== WITH Path進捗確認 =====
  test('WITH Pathの進捗が正しく表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // WITH Pathセクション確認
    await expect(page.getByText('WITH Path')).toBeVisible();

    // 進捗が0%から始まる
    await expect(page.getByText('0%')).toBeVisible();

    // ステップを進める
    await page.getByRole('button', { name: '支払画面へ進む' }).click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: '残金を支払う' }).click();
    await page.waitForTimeout(300);

    // 進捗が更新される（契約フェーズ = 20%）
    await expect(page.getByText('20%')).toBeVisible();
  });

  // ===== スコアメーター表示確認 =====
  test('NORELスコアメーターが正しく表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // スコアメーター確認
    await expect(page.getByText('NOREL SCORE')).toBeVisible();
    await expect(page.getByText('750')).toBeVisible();
    await expect(page.getByText('プラチナ')).toBeVisible();

    // スコアアップの感謝メッセージ確認
    await expect(page.getByText('最近のスコアUPへの感謝')).toBeVisible();
  });
});

// ===== モバイル表示テスト =====
test.describe('モバイル表示テスト', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('モバイルサイズで主要要素が正しく表示される', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // 主要要素が表示されている
    await expect(page.getByText('NOREL SCORE')).toBeVisible();
    await expect(page.getByText('WITH Path')).toBeVisible();
    await expect(page.getByText('次回のお支払い')).toBeVisible();
  });

  test('モバイルでAIコンシェルジュが使える', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /LINE/i }).click();

    // フローティングボタンをタップ
    await page.locator('button').filter({ has: page.locator('.lucide-message-circle') }).first().click();

    // モーダルが表示される
    await expect(page.getByText('AIコンシェルジュ')).toBeVisible();
  });
});
