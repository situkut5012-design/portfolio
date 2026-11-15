# 🚀 My Modern Portfolio & Task Manager

Next.js (App Router) と TypeScript、Tailwind CSS を用いて構築した、実務レベルのモダンなWebアプリケーションです。
単なる自己紹介ページに留まらず、日々の学習タスクを効率的に管理できる高機能なToDoアプリを統合しています。

---

## 🛠 技術スタック (Tech Stack)

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## ✨ 実装している主な機能 (Features)

1. **データ永続化 (LocalStorage):**
   - ブラウザをリロード・再訪問してもタスクが消えない自動保存機能。
2. **UI/UX 強化 (Dark Mode):**
   - ワンクリックでライトモードとダークモードをシームレスに切り替え（設定も自動保存）。
3. **高度なフィルタリング＆検索:**
   - 「すべて / 未完了 / 完了済み」のタブ切り替えに加え、リアルタイムなキーワード検索機能を搭載。
4. **タスクの優先度管理:**
   - 優先度（高・中・低）の選択と、視認性の高いカラーバッジによる色分け表示。
5. **進捗率プログレスバー:**
   - 全体のタスクに対する完了率をリアルタイムで計算し、美しいゲージで視覚化。
6. **デモデータ一括読込:**
   - 初見のユーザーでもアプリの挙動をすぐに体験できる「サンプル読込」機能。
7. **マルチページ構成:**
   - ホーム画面（ToDo）と独立した「スキル・経歴ページ」を行き来できるルーティング設計。

---

## 🔗 リンク
- 🚀 **デプロイ環境 (Vercel):** [実際のアプリはこちら](https://vercel.com/situkut5012-design/portfolio)
- 📂 **ソースコード (GitHub):** https://github.com/situkut5012-design/portfolio 

## 🎯 開発の背景・こだわり
「1ヶ月で自走できる開発者」を目標に、実務で頻出する状態管理（`useState`）、ライフサイクル（`useEffect`）、TypeScriptの型定義、コンポーネント設計を実践的に習得するためにゼロから開発しました。