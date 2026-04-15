# Shortcut Cheatsheet

よく使うアプリのショートカットキーを素早く確認できるWebアプリです。

## 対応アプリケーション

- **Chrome**: ブラウザ操作のショートカット
- **YouTube**: 動画再生・操作のショートカット
- **VS Code**: エディタ・開発のショートカット
- **PixAI**: AI画像生成のショートカット
- **Claude Code**: AI開発アシスタントCLIのコマンド
- **Gemini**: Google AIチャットのショートカット

## 機能

- タブでアプリケーションを切り替え
- リアルタイム検索フィルタリング
- カテゴリ別表示
- レスポンシブデザイン
- ダークモード対応

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- GitHub Pages

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

```bash
npm run build
```

静的ファイルは `out/` ディレクトリに生成されます。

## デプロイ

mainブランチにpushすると、自動的にGitHub Pagesにデプロイされます。

## ライセンス

MIT
