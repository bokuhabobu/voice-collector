# Cloudflare R2 + Worker 音声データ受信用セットアップ手順

このドキュメントでは、VoiceCollectorで録音された音声データ（ZIP）を、**参加者の端末からあなたのCloudflare R2（クラウドストレージ）へ直接・自動で安全にアップロードする手順**を説明します。

---

## 概要
- **費用**: 完全無料（R2は毎月10GB・1,000万リクエストまで無料、下り転送量無料）
- **所要時間**: 約5〜7分
- **必要なもの**: [Cloudflare](https://www.cloudflare.com/ja-jp/) の無料アカウント

---

## ステップ 1: R2バケット（保存フォルダ）を作成する

1. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) にログインします。
2. 左メニューの **「ストレージとデータベース」** ➔ **「R2」** を選択します。
   *(※初回のみR2の利用規約同意や無料枠の有効化画面が出る場合があります)*
3. **「バケットを作成する (Create bucket)」** ボタンをクリックします。
4. バケット名を入力します：
   - バケット名: `voice-collector-recordings`（または任意のお好みの名前）
   - 場所（Location Hint）: `APAC`（アジア太平洋 / 日本）または `Automatic`
5. **「バケットを作成」** をクリックします。

---

## ステップ 2: Cloudflare Worker（受け取りスクリプト）を作成する

1. 左メニューの **「コンピュート (Workers & Pages)」** を選択します。
2. **「作成 (Create)」** ➔ **「Worker を作成 (Create Worker)」** をクリックします。
3. Worker名（例: `voice-collector-uploader`）を確認し、**「デプロイ (Deploy)」** をクリックします。
4. 作成されたWorkerの詳細画面で、右上の **「コードを編集 (Edit code)」** をクリックします。
5. エディタに初期表示されているコードをすべて削除し、このフォルダにある **`worker.js` の内容をそのまま全て貼り付けます**。
6. 右上の **「デプロイ (Deploy)」** をクリックして保存します。

---

## ステップ 3: Worker に R2 バケットを紐付ける（バインド）

Workerがステップ1で作ったバケットに書き込めるよう、紐付けを行います。

1. 画面左上の戻る矢印 `←` を押して、Workerの詳細画面に戻ります。
2. **「設定 (Settings)」** タブ ➔ 左側の **「変数とシークレット (Variables and Secrets)」**（または「バインディング (Bindings)」）をクリックします。
3. **「R2 バケットのバインディング (R2 Bucket Bindings)」** の項目にある **「バインディングを追加 (Add binding)」** をクリックします。
4. 次のように設定します：
   - **変数名 (Variable name)**: `RECORDINGS_BUCKET` （※必ずこの大文字表記にしてください）
   - **R2 バケット (R2 bucket)**: ステップ1で作成したバケット（例: `voice-collector-recordings`）を選択
5. **「デプロイ (Deploy)」** または **「保存」** をクリックします。

---

## ステップ 4: Worker の URL をコピーしてアプリに設定する

1. Workerの詳細画面の上部に表示されている **URL** をコピーします。
   - 形式の例: `https://voice-collector-uploader.your-subdomain.workers.dev`
2. ブラウザで試しにこのURLを開き、以下のJSONが表示されれば準備完了です！
   ```json
   {
     "status": "ok",
     "service": "VoiceCollector R2 Storage Worker",
     "r2Configured": true
   }
   ```
   *(※ `r2Configured: true` となっていればR2との連携も成功しています)*
3. VoiceCollector アプリの画面（設定またはプロフィール編集画面）にこのURLを貼り付けます。
   *(※ または `app.js` 内の `CLOUDFLARE_UPLOAD_URL` に直接URLを書き込んでおくことで、利用者にURL入力をさせずに最初から自動送信させることも可能です)*

---

## 送信されたデータの確認方法

1. Cloudflareダッシュボードの **「R2」** ➔ 作成したバケット名 を開きます。
2. 参加者が録音アプリで「送信」を押すたびに、
   `SHORT-JA-01_高知救急1_山田_2026-09-10T14-00-00.zip` のようなZIPファイルが追加されます。
3. ファイル名をクリックして **「ダウンロード」** を押せば、そのままローカルPCに取得できます！
