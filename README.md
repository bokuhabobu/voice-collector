# 🎙️ VoiceCollector - STT Audio Dataset Recorder

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Audio Format](https://img.shields.io/badge/Audio-16kHz%2016--bit%20Mono%20WAV-brightgreen.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20PWA-orange.svg)]()
[![Zero Build](https://img.shields.io/badge/Build-Zero%20Config%20(Pure%20Vanilla)-success.svg)]()

スマートフォン（iPhone / Android）、タブレット、PCのブラウザから直接アクセスして録音できる、音声認識（STT / ASR）精度評価用データセット収集Webアプリケーションです。

---

## 🚀 GitHubへのアップロード & 公開手順（重要：順番）

ブラウザのマイク録音機能（`navigator.mediaDevices.getUserMedia`）は、セキュリティ仕様上 **`localhost` を除くすべての外部アクセスで HTTPS が必須** となります。  
本アプリを **GitHub Pages** にアップロードすることで、**無料で即座に HTTPS URL（`https://<ユーザー名>.github.io/<リポジトリ名>/`）が発行**され、被験者のスマホやPCからマイク許可エラーなく直接録音できるようになります。

### 【推奨される実行順序】

#### ステップ 1: GitHubで空のリポジトリを作成
1. ブラウザで [GitHub](https://github.com/) にログインし、右上の「＋」から **[New repository]** をクリックします。
2. **Repository name** を入力します（例: `voice-collector` または `recorder_app`）。
3. **Public**（またはチーム内 Private）を選択します。
4. ⚠️ **注意**: `Add a README file` や `.gitignore`、`license` のチェックは **外したまま（空の初期状態）** にして「**Create repository**」を押します。

#### ステップ 2: ローカルからプッシュ
ローカルのターミナル（PowerShell等）で `recorder_app` フォルダに移動し、以下のコマンドを順番に実行します：

```bash
# 1. recorder_app ディレクトリに移動
cd recorder_app

# 2. git 初期化（初回のみ）
git init

# 3. ファイルをステージング
git add .

# 4. 初回コミット
git commit -m "Initial commit: VoiceCollector STT Dataset Recorder"

# 5. メインブランチに設定
git branch -M main

# 6. GitHubのリモートURLを登録（※ご自身のアカウントとリポジトリ名に置き換えてください）
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git

# 7. GitHubへプッシュ
git push -u origin main
```

#### ステップ 3: GitHub Pages を有効化（HTTPS公開）
プッシュ後、GitHubリポジトリの画面で設定を行います：

1. リポジトリ上部の **[Settings]** タブをクリック。
2. 左メニューの **[Pages]** をクリック。
3. **Build and deployment** の設定：
   * **方法 A（推奨・自動CI/CD）**: `Source` を **[GitHub Actions]** に変更します。同梱の `.github/workflows/deploy.yml` により自動的にビルド・デプロイされます。
   * **方法 B（シンプル）**: `Source` を **[Deploy from a branch]** のまま、`Branch` を **`main`**、フォルダを **`/ (root)`** に指定して **[Save]** を押します。
4. 1〜2分後、画面上部に発行された **公開HTTPS URL**（`https://bokuhabobu.github.io/voice-collector/`）が表示されます。

---

## 💻 ローカル環境での実行方法

ローカルPCでの検証時は、以下のいずれかの方法でWebサーバーを起動できます：

```bash
# Python を使用する場合 (推奨)
python -m http.server 8080

# Node.js (npx) を使用する場合
npx serve .
```

ブラウザで `http://localhost:8080` を開くと動作します。

---

## 📌 被験者への案内用メッセージテンプレート

被験者へ録音を依頼する際は、以下のメッセージをコピーしてご利用いただけます。

```text
お疲れ様です。音声認識モデルの精度評価のため、テスト音声の録音をお願いします。

【録音の手順（所要時間：約3分）】
1. 以下のURLをスマートフォンのブラウザ（Safari / Chrome）で開きます。
   👉 https://bokuhabobu.github.io/voice-collector/
2. 最初の画面でお名前（例: 田中 太郎）を入力し、「性別（男性/女性）」を選択して「録音画面へ進む」を押します。
3. スクリプト言語（日本語/英語/タイ語）を選び、画面の文章を読み上げながら「録音開始」を押します。
4. 読み終わったら「停止」を押し、「✓ 保存して次の文へ」を押します。
5. 録音が終わったら、右上の「📦 ZIP保存」を押してください。
6. ZIP保存完了後、画面に表示されるメール起動ボタンからファイルを添付して送信してください。

※ アカウント登録やアプリのインストールは不要です。
```

---

## 📁 データセット構造（ZIPエクスポート）

「📦 ZIP保存」を実行すると、以下のようにWhisperやSherpa-onnxなどの学習・評価に直接投入可能な標準データセット構造でダウンロードされます：

```text
voice_collector_dataset_xxxx.zip
 ├── audio/
 │    ├── SHORT-JA-01_tanaka.wav      # 16kHz 16-bit モノラル PCM WAV
 │    ├── SHORT-JA-02_tanaka.wav
 │    ├── NUM-JA-01_tanaka.wav
 │    └── ...
 ├── dataset.csv                      # 正解テキスト対照表（WER/CER評価用UTF-8 CSV）
 ├── metadata.json                    # 話者・性別・端末環境・録音日時等の詳細JSON
 └── README.txt                       # データセット仕様説明書
```

---

## 🧩 技術スタック & 特徴

* **ゼロビルド（Pure Vanilla Web）**: WebpackやVite等のビルドツール不要。静的ホスティング（GitHub Pages、Cloudflare Pages、S3、Nginx等）でそのまま動作。
* **16kHz リサンプリング**: Web Audio API（`OfflineAudioContext`）によるブラウザ完結型ダウンサンプリング。
* **ローカルストレージ安全保存**: 録音データは端末内 IndexedDB に完全ローカル保存。
* **多言語対応**: 日本語、英語、タイ語のUIおよびネイティブスクリプト（短文、現場交信、音素評価、数字・単位、長文）。

---

## 📄 ライセンス

本ソフトウェアは [MIT License](LICENSE) のもとで公開されています。
