/**
 * i18n.js - Internationalization Module
 * Clean Minimal Aesthetic, Independent Script Language, No Noise Level
 */

export const translations = {
  ja: {
    appTitle: "VoiceCollector",
    pwaPrompt: "ホーム画面に追加してアプリとして利用できます",
    
    // Header & Controls
    langSelect: "言語",
    themeToggle: "テーマ切替",
    storageStatus: "保存済み",
    recordingsCount: "件の録音",
    exportZipBtn: "📦 ZIP保存",
    viewListBtn: "録音リスト",
    readmeBtn: "📖 README",

    // README Modal
    readmeModalTitle: "VoiceCollector - 概要と利用手順",
    readmeSummaryTitle: "【アプリの概要】",
    readmeSummaryText: "このアプリは音声をブラウザ上で録音し、一つのzipデータセットとしてまとめるツールです。",
    readmeStepsTitle: "【利用手順】",
    readmeStep1: "1. 事前設定画面で「お名前」を入力し、「性別（男性/女性）」を選択して録音画面へ進みます。",
    readmeStep2: "2. お好みの言語（日本語/英語/タイ語）とカテゴリを選び、画面のスクリプトを読み上げながら「録音開始」を押します。",
    readmeStep3: "3. 読み終わったら「停止」を押し、保存（「✓ 保存して次の文へ」）または読み直し（「↺ もう一度録り直す」）を選択します。",
    readmeStep4: "4. 全ての録音が完了したら、右上の「📦 ZIP保存」を押してダウンロードします。",
    readmeSubmissionTitle: "【メール送信】",
    readmeSubmissionDesc: "ZIP保存後、下のボタンからメールを起動してファイルを送付できます。",
    emailSubmitBtn: "✉️ メールで送付（ynagasawa@spacetime-eng.com）",
    zipExportDialogTitle: "ZIP保存完了",
    zipExportDialogDesc: "ZIPファイルの保存が完了しました。下のボタンからメールを起動し、ファイルを添付して送信してください。",
    readmeCloseBtn: "閉じる",

    // Setup Pre-Page
    setupWelcomeTitle: "VoiceCollector へようこそ",
    setupSubtitle: "録音をはじめる前にお名前と性別を入力・選択してください。",
    genderLabel: "性別",
    genderMale: "男性",
    genderFemale: "女性",
    genderRequiredHint: "※ 男性または女性を選択してください",
    startRecordingBtn: "録音画面へ進む →",
    backToSetupBtn: "✏️ プロフィール変更",
    setupAutoSavedHint: "※ 入力した情報はブラウザに自動保存されます",

    // Speaker Section
    metaSectionTitle: "1. 基本情報",
    speakerLabel: "お名前",
    speakerPlaceholder: "例: 田中 太郎",
    customNoteLabel: "備考・補足",
    customNotePlaceholder: "例: エアコン直下、早口、小声、マスク着用など",

    // Script Section
    scriptSectionTitle: "2. 読み上げスクリプト",
    scriptLangLabel: "スクリプト言語",
    categoryLabel: "カテゴリ",
    categories: {
      all: "すべて",
      short: "短文テスト",
      command: "現場交信・指令",
      phonetic: "音素バランス",
      kochi: "高知弁",
      number: "数字・単位",
      long: "長文",
      custom: "カスタム入力"
    },
    scriptCounter: "スクリプト {current} / {total}",
    prevScriptBtn: "← 前の文",
    nextScriptBtn: "次の文 →",
    fontSizeBtn: "文字サイズ",
    customScriptPlaceholder: "ここに読み上げたい任意のテキストを入力してください...",
    addCustomScriptBtn: "追加",

    // Recorder Section
    recorderSectionTitle: "3. 録音 & 確認",
    micReady: "マイク準備完了",
    recordingStatus: "録音中...",
    recordBtn: "録音開始",
    stopBtn: "停止する",
    reRecordBtn: "↺ もう一度録り直す",
    saveAndNextBtn: "✓ 保存して次の文へ",
    previewAudio: "聞き直し（プレビュー）",
    recordedAt: "録音日時",
    duration: "長さ",

    // Status & Badges
    statusUnrecorded: "未録音",
    statusRecorded: "録音済み",
    audioSpecInfo: "16,000 Hz / 16-bit WAV",

    // Modal / Drawer
    modalTitle: "録音済みデータ一覧",
    emptyRecordings: "まだ録音がありません。上のスクリプトを読んで録音してみましょう！",
    playBtn: "再生",
    pauseBtn: "一時停止",
    deleteBtn: "削除",
    deleteAllBtn: "すべて削除",
    confirmDeleteAll: "本当にすべての録音データを削除しますか？この操作は取り消せません。",
    confirmDeleteOne: "この録音データを削除しますか？",
    closeBtn: "閉じる",
    downloadSingle: "WAV保存",

    // Export messages
    exportingZip: "ZIPファイルを作成中...",
    exportSuccess: "ダウンロードを開始しました！",
    noDataToExport: "エクスポートする録音データがありません。",

    // Alerts & Errors
    micError: "マイクへのアクセスが拒否されたか、マイクが見つかりません。",
    browserNotSupported: "お使いのブラウザは音声録音機能（Web Audio API）をサポートしていません。"
  },

  en: {
    appTitle: "VoiceCollector",
    pwaPrompt: "Add to home screen to use as a native app",
    
    // Header & Controls
    langSelect: "Language",
    themeToggle: "Theme",
    storageStatus: "Saved",
    recordingsCount: "takes",
    exportZipBtn: "📦 Export ZIP",
    viewListBtn: "Recordings",
    readmeBtn: "📖 README",

    // README Modal
    readmeModalTitle: "VoiceCollector - Overview & Guide",
    readmeSummaryTitle: "【App Overview】",
    readmeSummaryText: "This app records audio in the browser and bundles it into a single ZIP dataset.",
    readmeStepsTitle: "【Step-by-Step Instructions】",
    readmeStep1: "1. Enter your Name and select Gender (Male/Female) on the welcome screen before proceeding.",
    readmeStep2: "2. Choose your preferred script language (JP/EN/TH) and category, then tap 'Start Recording' as you read.",
    readmeStep3: "3. When finished, tap 'Stop' and choose either to save ('✓ Save & Next') or re-record ('↺ Re-record').",
    readmeStep4: "4. When finished, tap '📦 Export ZIP' to download your recordings.",
    readmeSubmissionTitle: "【Email Delivery】",
    readmeSubmissionDesc: "After saving your ZIP, tap below to open your email client and send files to ynagasawa@spacetime-eng.com.",
    emailSubmitBtn: "✉️ Send via Email (ynagasawa@spacetime-eng.com)",
    zipExportDialogTitle: "ZIP Exported Successfully",
    zipExportDialogDesc: "Your ZIP dataset has been saved. Tap below to launch your email client, attach the file, and send.",
    readmeCloseBtn: "Close",

    // Setup Pre-Page
    setupWelcomeTitle: "Welcome to VoiceCollector",
    setupSubtitle: "Please enter your name and select your gender before recording.",
    genderLabel: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderRequiredHint: "※ Please select Male or Female",
    startRecordingBtn: "Proceed to Recording →",
    backToSetupBtn: "✏️ Edit Profile",
    setupAutoSavedHint: "※ Information is automatically saved in your browser",

    // Speaker Section
    metaSectionTitle: "1. Basic Info",
    speakerLabel: "Your Name",
    speakerPlaceholder: "e.g., Taro Tanaka",
    customNoteLabel: "Notes / Details",
    customNotePlaceholder: "e.g., Under AC, Fast speech, Whisper, Mask",

    // Script Section
    scriptSectionTitle: "2. Prompt Script",
    scriptLangLabel: "Script Language",
    categoryLabel: "Category",
    categories: {
      all: "All",
      short: "Short Test",
      command: "Field / Command",
      phonetic: "Phonetic Balance",
      kochi: "Kochi Dialect",
      number: "Numbers / Units",
      long: "Long Passage",
      custom: "Custom Text"
    },
    scriptCounter: "Script {current} of {total}",
    prevScriptBtn: "← Prev",
    nextScriptBtn: "Next →",
    fontSizeBtn: "Font Size",
    customScriptPlaceholder: "Enter any custom sentence to read aloud...",
    addCustomScriptBtn: "Add",

    // Recorder Section
    recorderSectionTitle: "3. Record & Review",
    micReady: "Microphone ready",
    recordingStatus: "Recording...",
    recordBtn: "Start Recording",
    stopBtn: "Stop",
    reRecordBtn: "↺ Re-record",
    saveAndNextBtn: "✓ Save & Next",
    previewAudio: "Listen Back (Preview)",
    recordedAt: "Recorded at",
    duration: "Duration",

    // Status & Badges
    statusUnrecorded: "Unrecorded",
    statusRecorded: "Recorded",
    audioSpecInfo: "16,000 Hz / 16-bit WAV",

    // Modal / Drawer
    modalTitle: "Saved Audio Takes",
    emptyRecordings: "No recordings yet. Pick a script above and start recording!",
    playBtn: "Play",
    pauseBtn: "Pause",
    deleteBtn: "Delete",
    deleteAllBtn: "Delete All",
    confirmDeleteAll: "Are you sure you want to delete all recordings? This action cannot be undone.",
    confirmDeleteOne: "Delete this recording?",
    closeBtn: "Close",
    downloadSingle: "Download WAV",

    // Export messages
    exportingZip: "Building ZIP archive...",
    exportSuccess: "Download started!",
    noDataToExport: "No recordings to export.",

    // Alerts & Errors
    micError: "Microphone access was denied or no microphone device was found.",
    browserNotSupported: "Web Audio API is not supported in this browser."
  },

  th: {
    appTitle: "VoiceCollector",
    pwaPrompt: "เพิ่มไปยังหน้าจอหลักเพื่อใช้งานเป็นแอป",
    
    // Header & Controls
    langSelect: "ภาษา (Language)",
    themeToggle: "ธีม",
    storageStatus: "บันทึกแล้ว",
    recordingsCount: "ไฟล์",
    exportZipBtn: "📦 บันทึก ZIP",
    viewListBtn: "รายการเสียง",
    readmeBtn: "📖 README",

    // README Modal
    readmeModalTitle: "VoiceCollector - ภาพรวมและวิธีใช้งาน",
    readmeSummaryTitle: "【ภาพรวมของแอป】",
    readmeSummaryText: "แอปพลิเคชันนี้บันทึกเสียงผ่านเบราว์เซอร์และรวมเป็นชุดข้อมูล ZIP ไฟล์เดียว",
    readmeStepsTitle: "【ขั้นตอนการใช้งาน】",
    readmeStep1: "1. กรอกชื่อผู้พูดและเลือกเพศ (ชาย/หญิง) ในหน้าเริ่มต้นก่อนเข้าสู่หน้าบันทึกเสียง",
    readmeStep2: "2. เลือกภาษาของสคริปต์และหมวดหมู่ จากนั้นอ่านออกเสียงพร้อมกด 'เริ่มบันทึก'",
    readmeStep3: "3. เมื่ออ่านจบให้กด 'หยุด' แล้วเลือกบันทึก ('✓ บันทึกและไปต่อ') หรือบันทึกใหม่ ('↺ บันทึกใหม่อีกครั้ง')",
    readmeStep4: "4. เมื่อบันทึกครบ ให้กด '📦 บันทึก ZIP' เพื่อดาวน์โหลดชุดข้อมูล",
    readmeSubmissionTitle: "【ส่งข้อมูลผ่านอีเมล】",
    readmeSubmissionDesc: "หลังจากบันทึก ZIP กดปุ่มด้านล่างเพื่อเปิดอีเมลและส่งไฟล์ไปยัง ynagasawa@spacetime-eng.com",
    emailSubmitBtn: "✉️ ส่งผ่านอีเมล (ynagasawa@spacetime-eng.com)",
    zipExportDialogTitle: "บันทึก ZIP เรียบร้อยแล้ว",
    zipExportDialogDesc: "ไฟล์ชุดข้อมูล ZIP ถูกบันทึกแล้ว กดปุ่มด้านล่างเพื่อเปิดอีเมล แนบไฟล์และส่งได้ทันที",
    readmeCloseBtn: "ปิด",

    // Setup Pre-Page
    setupWelcomeTitle: "ยินดีต้อนรับสู่ VoiceCollector",
    setupSubtitle: "กรุณากรอกชื่อ-นามสกุล และเลือกเพศก่อนเริ่มการบันทึกเสียง",
    genderLabel: "เพศ (Gender)",
    genderMale: "ชาย (Male)",
    genderFemale: "หญิง (Female)",
    genderRequiredHint: "※ กรุณาเลือกเพศชายหรือหญิง",
    startRecordingBtn: "ไปยังหน้าบันทึกเสียง →",
    backToSetupBtn: "✏️ แก้ไขข้อมูลโปรไฟล์",
    setupAutoSavedHint: "※ ข้อมูลที่กรอกจะถูกบันทึกในเบราว์เซอร์โดยอัตโนมัติ",

    // Speaker Section
    metaSectionTitle: "1. ข้อมูลพื้นฐาน",
    speakerLabel: "ชื่อ-นามสกุล",
    speakerPlaceholder: "เช่น สมชาย ใจดี",
    customNoteLabel: "หมายเหตุเพิ่มเติม",
    customNotePlaceholder: "เช่น มีเสียงแอร์, พูดเร็ว, กระซิบ, สวมหน้ากาก",

    // Script Section
    scriptSectionTitle: "2. สคริปต์สำหรับอ่านออกเสียง",
    scriptLangLabel: "ภาษาของสคริปต์",
    categoryLabel: "หมวดหมู่",
    categories: {
      all: "ทั้งหมด",
      short: "ประโยคสั้น",
      command: "การสั่งการภาคสนาม",
      phonetic: "สมดุลของเสียง",
      kochi: "ภาษาถิ่นโคจิ",
      number: "ตัวเลขและหน่วย",
      long: "ประโยคยาว",
      custom: "ข้อความกำหนดเอง"
    },
    scriptCounter: "สคริปต์ {current} จาก {total}",
    prevScriptBtn: "← ก่อนหน้า",
    nextScriptBtn: "ถัดไป →",
    fontSizeBtn: "ขนาดตัวอักษร",
    customScriptPlaceholder: "พิมพ์ข้อความที่ต้องการให้อ่านออกเสียงที่นี่...",
    addCustomScriptBtn: "เพิ่ม",

    // Recorder Section
    recorderSectionTitle: "3. บันทึกเสียงและตรวจสอบ",
    micReady: "ไมโครโฟนพร้อมใช้งาน",
    recordingStatus: "กำลังบันทึกเสียง...",
    recordBtn: "เริ่มบันทึก",
    stopBtn: "หยุด",
    reRecordBtn: "↺ บันทึกใหม่อีกครั้ง",
    saveAndNextBtn: "✓ บันทึกและไปต่อ",
    previewAudio: "ฟังเสียงตัวอย่าง (ตรวจสอบ)",
    recordedAt: "เวลาที่บันทึก",
    duration: "ความยาว",

    // Status & Badges
    statusUnrecorded: "ยังไม่ได้บันทึก",
    statusRecorded: "บันทึกแล้ว",
    audioSpecInfo: "16,000 Hz / 16-bit WAV",

    // Modal / Drawer
    modalTitle: "รายการไฟล์เสียงที่บันทึกไว้",
    emptyRecordings: "ยังไม่มีไฟล์เสียงที่บันทึกไว้ เลือกสคริปต์ด้านบนแล้วเริ่มบันทึกได้เลย!",
    playBtn: "เล่น",
    pauseBtn: "หยุดชั่วคราว",
    deleteBtn: "ลบ",
    deleteAllBtn: "ลบทั้งหมด",
    confirmDeleteAll: "คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์เสียงทั้งหมด? การดำเนินการนี้ไม่สามารถย้อนกลับได้",
    confirmDeleteOne: "ต้องการลบไฟล์เสียงนี้หรือไม่?",
    closeBtn: "ปิด",
    downloadSingle: "โหลด WAV",

    // Export messages
    exportingZip: "กำลังสร้างไฟล์ ZIP...",
    exportSuccess: "เริ่มการดาวน์โหลดเรียบร้อยแล้ว!",
    noDataToExport: "ไม่มีไฟล์เสียงสำหรับส่งออก",

    // Alerts & Errors
    micError: "การเข้าถึงไมโครโฟนถูกปฏิเสธ หรือไม่พบอุปกรณ์ไมโครโฟน",
    browserNotSupported: "เบราว์เซอร์นี้ไม่รองรับ Web Audio API"
  }
};

let currentLang = 'ja';

export function getLanguage() {
  return currentLang;
}

export function t(key, params = {}) {
  const keys = key.split('.');
  let val = translations[currentLang];
  for (const k of keys) {
    if (val && typeof val === 'object') {
      val = val[k];
    } else {
      break;
    }
  }
  if (!val) {
    let fb = translations['en'];
    for (const k of keys) {
      if (fb && typeof fb === 'object') fb = fb[k];
      else break;
    }
    val = fb || key;
  }
  
  if (typeof val === 'string') {
    return val.replace(/\{(\w+)\}/g, (_, match) => params[match] !== undefined ? params[match] : `{${match}}`);
  }
  return val;
}

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem('voice_collector_lang', lang);
    applyTranslations();
  }
}

export function initI18n() {
  const saved = localStorage.getItem('voice_collector_lang');
  if (saved && translations[saved]) {
    currentLang = saved;
  } else {
    // Always default to Japanese
    currentLang = 'ja';
  }
  applyTranslations();
}

export function applyTranslations() {
  document.documentElement.lang = currentLang;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.setAttribute('title', t(key));
  });

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
}
