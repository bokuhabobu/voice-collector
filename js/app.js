/**
 * app.js - Main Application Controller
 * Minimal White Aesthetic, Independent Script Language Tabs
 */

import { initI18n, setLanguage, getLanguage, t } from './i18n.js?v=2.4';
import { getScriptsForLang, addCustomScript, deleteCustomScript } from './scripts_data.js?v=2.4';
import { AudioRecorder } from './audio_recorder.js?v=2.4';
import { initDB, saveRecording, getAllRecordings, getRecordedMap, deleteRecording, clearAllRecordings } from './storage.js?v=2.4';
import { exportDatasetZip, triggerBlobDownload } from './export_zip.js?v=2.4';

const STORAGE_KEY_SPEAKER = 'voice_collector_saved_speaker';
const STORAGE_KEY_GENDER = 'voice_collector_saved_gender';
const STORAGE_KEY_NOTE = 'voice_collector_saved_note';
const STORAGE_KEY_SCRIPT_LANG = 'voice_collector_saved_script_lang';

class VoiceCollectorApp {
  constructor() {
    this.audioRecorder = new AudioRecorder();
    this.currentCategory = 'all';
    this.currentScriptLang = 'ja'; // Independent from UI language
    this.currentScriptIndex = 0;
    this.scripts = [];
    this.recordedMap = {};
    this.currentTake = null; // Staged recording pending review
    this.currentAudioUrl = null;
    this.fontSizeClasses = ['font-normal', 'font-large', 'font-xlarge'];
    this.currentFontIndex = 2; // Default to largest (font-xlarge)
    this.activeAudioElement = null;
    this.currentGender = null; // 'male' | 'female' | null
    this.currentView = 'setup'; // 'setup' | 'home'
    this.lastExportedZip = null;

    this.deviceInfo = this._getDeviceInfo();
  }

  async init() {
    initI18n();
    await initDB();

    this._cacheDOMElements();
    this._initTheme();
    this._restorePersistedInputs();
    this._bindEvents();

    this.audioRecorder.setVisualizerCanvas(this.dom.waveformCanvas);
    this.audioRecorder._drawIdleVisualizer();

    this.loadScripts();
    await this.updateRecordedStatus();
    this.renderCurrentScript();
  }

  _cacheDOMElements() {
    this.dom = {
      // Views & Header
      setupPage: document.getElementById('setupPage'),
      mainHomeView: document.getElementById('mainHomeView'),
      homeHeaderActions: document.getElementById('homeHeaderActions'),
      langSelect: document.getElementById('langSelect'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      savedCountBadge: document.getElementById('savedCountBadge'),
      exportZipBtn: document.getElementById('exportZipBtn'),
      viewListBtn: document.getElementById('viewListBtn'),
      readmeBtn: document.getElementById('readmeBtn'),

      // Setup Pre-Page Elements
      setupSpeakerInput: document.getElementById('setupSpeakerInput'),
      setupGenderMaleBtn: document.getElementById('setupGenderMaleBtn'),
      setupGenderFemaleBtn: document.getElementById('setupGenderFemaleBtn'),
      setupGenderError: document.getElementById('setupGenderError'),
      setupNoteInput: document.getElementById('setupNoteInput'),
      startRecordingBtn: document.getElementById('startRecordingBtn'),

      // Meta (Auto Persisted in Home)
      speakerInput: document.getElementById('speakerInput'),
      homeGenderMaleBtn: document.getElementById('homeGenderMaleBtn'),
      homeGenderFemaleBtn: document.getElementById('homeGenderFemaleBtn'),
      customNoteInput: document.getElementById('customNoteInput'),
      backToSetupBtn: document.getElementById('backToSetupBtn'),

      // Script Prompter
      scriptLangButtons: document.getElementById('scriptLangButtons'),
      categorySelect: document.getElementById('categorySelect'),
      scriptProgressBar: document.getElementById('scriptProgressBar'),
      scriptCounterText: document.getElementById('scriptCounterText'),
      scriptStatusBadge: document.getElementById('scriptStatusBadge'),
      scriptDisplayArea: document.getElementById('scriptDisplayArea'),
      scriptCategoryLabel: document.getElementById('scriptCategoryLabel'),
      prevScriptBtn: document.getElementById('prevScriptBtn'),
      nextScriptBtn: document.getElementById('nextScriptBtn'),
      fontSizeToggleBtn: document.getElementById('fontSizeToggleBtn'),
      customScriptAddContainer: document.getElementById('customScriptAddContainer'),
      customScriptTextInput: document.getElementById('customScriptTextInput'),
      addCustomScriptBtn: document.getElementById('addCustomScriptBtn'),

      // Recorder Controls
      waveformCanvas: document.getElementById('waveformCanvas'),
      recordTimer: document.getElementById('recordTimer'),
      recordActionContainer: document.getElementById('recordActionContainer'),
      recordBtn: document.getElementById('recordBtn'),
      stopBtn: document.getElementById('stopBtn'),
      reviewControls: document.getElementById('reviewControls'),
      audioPreviewPlayer: document.getElementById('audioPreviewPlayer'),
      reRecordBtn: document.getElementById('reRecordBtn'),
      saveAndNextBtn: document.getElementById('saveAndNextBtn'),
      micStatusText: document.getElementById('micStatusText'),

      // Recordings Modal / Drawer
      recordingsModal: document.getElementById('recordingsModal'),
      closeModalBtn: document.getElementById('closeModalBtn'),
      recordingsListContainer: document.getElementById('recordingsListContainer'),
      deleteAllRecordingsBtn: document.getElementById('deleteAllRecordingsBtn'),

      // README Modal
      readmeModal: document.getElementById('readmeModal'),
      closeReadmeModalBtn: document.getElementById('closeReadmeModalBtn'),
      closeReadmeFooterBtn: document.getElementById('closeReadmeFooterBtn'),
      readmeEmailSubmitBtn: document.getElementById('readmeEmailSubmitBtn'),

      // Post-Export Submit Modal
      submitModal: document.getElementById('submitModal'),
      closeSubmitModalBtn: document.getElementById('closeSubmitModalBtn'),
      closeSubmitFooterBtn: document.getElementById('closeSubmitFooterBtn'),
      submitViaEmailBtn: document.getElementById('submitViaEmailBtn'),

      // Mobile Drawer & Hamburger
      mobileMenuToggleBtn: document.getElementById('mobileMenuToggleBtn'),
      mobileMenuDrawer: document.getElementById('mobileMenuDrawer'),
      mobileMenuBackdrop: document.getElementById('mobileMenuBackdrop'),
      closeMobileMenuBtn: document.getElementById('closeMobileMenuBtn'),
      mobileLangSelect: document.getElementById('mobileLangSelect'),
      mobileHomeMenuItems: document.getElementById('mobileHomeMenuItems'),
      mobileViewListBtn: document.getElementById('mobileViewListBtn'),
      mobileSavedCountBadge: document.getElementById('mobileSavedCountBadge'),
      mobileExportZipBtn: document.getElementById('mobileExportZipBtn'),
      mobileReadmeBtn: document.getElementById('mobileReadmeBtn'),
      mobileEditProfileBtn: document.getElementById('mobileEditProfileBtn'),
      mobileThemeToggleBtn: document.getElementById('mobileThemeToggleBtn'),

      // Custom Touch-Friendly Audio Player
      customPlayBtn: document.getElementById('customPlayBtn'),
      customPlayIcon: document.getElementById('customPlayIcon'),
      playerProgressContainer: document.getElementById('playerProgressContainer'),
      playerProgressBar: document.getElementById('playerProgressBar'),
      playerCurrentTime: document.getElementById('playerCurrentTime'),
      playerTotalTime: document.getElementById('playerTotalTime'),

      // Toast / Notification
      toast: document.getElementById('toast')
    };
  }

  _restorePersistedInputs() {
    // Restore speaker
    const savedSpeaker = localStorage.getItem(STORAGE_KEY_SPEAKER);
    if (savedSpeaker) {
      this.dom.speakerInput.value = savedSpeaker;
      if (this.dom.setupSpeakerInput) {
        this.dom.setupSpeakerInput.value = savedSpeaker;
      }
    }

    // Restore note
    const savedNote = localStorage.getItem(STORAGE_KEY_NOTE);
    if (savedNote) {
      this.dom.customNoteInput.value = savedNote;
      if (this.dom.setupNoteInput) {
        this.dom.setupNoteInput.value = savedNote;
      }
    }

    // Restore gender
    const savedGender = localStorage.getItem(STORAGE_KEY_GENDER);
    if (savedGender === 'male' || savedGender === 'female') {
      this.currentGender = savedGender;
      this._updateGenderChipsUI();
    }

    // Restore script language (Default: 'ja')
    const savedScriptLang = localStorage.getItem(STORAGE_KEY_SCRIPT_LANG);
    if (savedScriptLang) {
      this.currentScriptLang = savedScriptLang;
    } else {
      this.currentScriptLang = 'ja';
    }
    this._updateScriptLangTabsUI();
    this._updateCategoryDropdownOptions();

    // Set initial view to setup page
    this.showSetupView();
  }

  _updateCategoryDropdownOptions() {
    const select = this.dom.categorySelect;
    if (!select) return;

    const availableCats = {
      ja: ['all', 'short', 'command', 'phonetic', 'kochi', 'number', 'long', 'custom'],
      en: ['all', 'short', 'command', 'phonetic', 'number', 'long', 'custom'],
      th: ['all', 'short', 'command', 'phonetic', 'number', 'long', 'custom']
    }[this.currentScriptLang] || ['all', 'short', 'command', 'phonetic', 'number', 'long', 'custom'];

    if (!availableCats.includes(this.currentCategory)) {
      this.currentCategory = 'all';
    }

    select.innerHTML = '';
    availableCats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = t(`categories.${cat}`) || cat;
      if (cat === this.currentCategory) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  }

  _updateScriptLangTabsUI() {
    if (!this.dom.scriptLangButtons) return;
    this.dom.scriptLangButtons.querySelectorAll('.btn-lang-tab').forEach(btn => {
      if (btn.getAttribute('data-script-lang') === this.currentScriptLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  _bindEvents() {
    // Input persistence and bidirectional synchronization between Setup and Home
    this.dom.speakerInput.addEventListener('input', (e) => {
      localStorage.setItem(STORAGE_KEY_SPEAKER, e.target.value);
      if (this.dom.setupSpeakerInput) {
        this.dom.setupSpeakerInput.value = e.target.value;
      }
    });

    if (this.dom.setupSpeakerInput) {
      this.dom.setupSpeakerInput.addEventListener('input', (e) => {
        localStorage.setItem(STORAGE_KEY_SPEAKER, e.target.value);
        if (this.dom.speakerInput) {
          this.dom.speakerInput.value = e.target.value;
        }
      });
    }

    this.dom.customNoteInput.addEventListener('input', (e) => {
      localStorage.setItem(STORAGE_KEY_NOTE, e.target.value);
      if (this.dom.setupNoteInput) {
        this.dom.setupNoteInput.value = e.target.value;
      }
    });

    if (this.dom.setupNoteInput) {
      this.dom.setupNoteInput.addEventListener('input', (e) => {
        localStorage.setItem(STORAGE_KEY_NOTE, e.target.value);
        if (this.dom.customNoteInput) {
          this.dom.customNoteInput.value = e.target.value;
        }
      });
    }

    // Gender Selection Events (Setup Page & Home)
    if (this.dom.setupGenderMaleBtn) {
      this.dom.setupGenderMaleBtn.addEventListener('click', () => this.setGender('male'));
    }
    if (this.dom.setupGenderFemaleBtn) {
      this.dom.setupGenderFemaleBtn.addEventListener('click', () => this.setGender('female'));
    }
    if (this.dom.homeGenderMaleBtn) {
      this.dom.homeGenderMaleBtn.addEventListener('click', () => this.setGender('male'));
    }
    if (this.dom.homeGenderFemaleBtn) {
      this.dom.homeGenderFemaleBtn.addEventListener('click', () => this.setGender('female'));
    }

    // View Switching: Start recording button (Setup -> Home)
    if (this.dom.startRecordingBtn) {
      this.dom.startRecordingBtn.addEventListener('click', () => this.proceedToHome());
    }

    // View Switching: Edit profile button (Home -> Setup)
    if (this.dom.backToSetupBtn) {
      this.dom.backToSetupBtn.addEventListener('click', () => this.showSetupView());
    }

    // UI Language change (Desktop)
    this.dom.langSelect.value = getLanguage();
    this.dom.langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
      if (this.dom.mobileLangSelect) this.dom.mobileLangSelect.value = e.target.value;
    });

    // UI Language change (Mobile Menu)
    if (this.dom.mobileLangSelect) {
      this.dom.mobileLangSelect.value = getLanguage();
      this.dom.mobileLangSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
        if (this.dom.langSelect) this.dom.langSelect.value = e.target.value;
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
      });
    }

    // Mobile Hamburger Menu Drawer Toggles
    if (this.dom.mobileMenuToggleBtn) {
      this.dom.mobileMenuToggleBtn.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) {
          this.dom.mobileMenuDrawer.classList.toggle('hidden');
        }
      });
    }
    if (this.dom.closeMobileMenuBtn) {
      this.dom.closeMobileMenuBtn.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
      });
    }
    if (this.dom.mobileMenuBackdrop) {
      this.dom.mobileMenuBackdrop.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
      });
    }

    // Mobile Menu Action Buttons
    if (this.dom.mobileViewListBtn) {
      this.dom.mobileViewListBtn.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
        this.openRecordingsModal();
      });
    }
    if (this.dom.mobileExportZipBtn) {
      this.dom.mobileExportZipBtn.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
        this.handleExportZip();
      });
    }
    if (this.dom.mobileReadmeBtn) {
      this.dom.mobileReadmeBtn.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
        this.openReadmeModal();
      });
    }
    if (this.dom.mobileEditProfileBtn) {
      this.dom.mobileEditProfileBtn.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
        this.showSetupView();
      });
    }
    if (this.dom.mobileThemeToggleBtn) {
      this.dom.mobileThemeToggleBtn.addEventListener('click', () => {
        if (this.dom.mobileMenuDrawer) this.dom.mobileMenuDrawer.classList.add('hidden');
        this._toggleTheme();
      });
    }

    window.addEventListener('languageChanged', () => {
      if (this.dom.langSelect) this.dom.langSelect.value = getLanguage();
      if (this.dom.mobileLangSelect) this.dom.mobileLangSelect.value = getLanguage();
      this._updateCategoryDropdownOptions();
      this.renderCurrentScript();
      this.updateRecordedStatus();
    });

    // Script Language Tab change
    this.dom.scriptLangButtons.addEventListener('click', (e) => {
      const tab = e.target.closest('.btn-lang-tab');
      if (tab) {
        const lang = tab.getAttribute('data-script-lang');
        if (lang && lang !== this.currentScriptLang) {
          this.currentScriptLang = lang;
          localStorage.setItem(STORAGE_KEY_SCRIPT_LANG, lang);
          this._updateScriptLangTabsUI();
          this._updateCategoryDropdownOptions();
          this.loadScripts();
          this.currentScriptIndex = 0;
          this.renderCurrentScript();
        }
      }
    });

    // Theme toggle
    this.dom.themeToggleBtn.addEventListener('click', () => this._toggleTheme());

    // Category filter
    this.dom.categorySelect.addEventListener('change', (e) => {
      this.currentCategory = e.target.value;
      this.loadScripts();
      this.currentScriptIndex = 0;
      this.renderCurrentScript();
    });

    // Navigation
    this.dom.prevScriptBtn.addEventListener('click', () => this.navigateScript(-1));
    this.dom.nextScriptBtn.addEventListener('click', () => this.navigateScript(1));

    // Font size toggle (if present)
    if (this.dom.fontSizeToggleBtn) {
      this.dom.fontSizeToggleBtn.addEventListener('click', () => {
        this.currentFontIndex = (this.currentFontIndex + 1) % this.fontSizeClasses.length;
        this._applyFontSize();
      });
    }

    // Custom script add
    this.dom.addCustomScriptBtn.addEventListener('click', () => {
      const text = this.dom.customScriptTextInput.value.trim();
      if (!text) return;
      addCustomScript(this.currentScriptLang, text);
      this.dom.customScriptTextInput.value = '';
      this.loadScripts();
      this.currentScriptIndex = this.scripts.length - 1;
      this.renderCurrentScript();
      this.showToast(t('statusRecorded'));
    });

    // Recorder actions
    this.dom.recordBtn.addEventListener('click', () => this.startRecording());
    this.dom.stopBtn.addEventListener('click', () => this.stopRecording());
    this.dom.reRecordBtn.addEventListener('click', () => this.cancelReviewAndRerecord());
    this.dom.saveAndNextBtn.addEventListener('click', () => this.saveCurrentTakeAndAdvance());

    // Custom Audio Preview Player Controls
    if (this.dom.customPlayBtn) {
      this.dom.customPlayBtn.addEventListener('click', () => this.togglePreviewAudio());
    }

    if (this.dom.audioPreviewPlayer) {
      this.dom.audioPreviewPlayer.addEventListener('timeupdate', () => {
        const cur = this.dom.audioPreviewPlayer.currentTime || 0;
        const dur = this.dom.audioPreviewPlayer.duration || (this.currentTake ? this.currentTake.durationSec : 0);
        if (this.dom.playerCurrentTime) {
          this.dom.playerCurrentTime.textContent = `${cur.toFixed(1)}s`;
        }
        if (this.dom.playerProgressBar && dur > 0) {
          const pct = Math.min(100, (cur / dur) * 100);
          this.dom.playerProgressBar.style.width = `${pct}%`;
        }
      });

      this.dom.audioPreviewPlayer.addEventListener('ended', () => {
        if (this.dom.customPlayIcon) {
          this.dom.customPlayIcon.textContent = '▶';
          this.dom.customPlayIcon.classList.remove('playing');
        }
        if (this.dom.playerProgressBar) {
          this.dom.playerProgressBar.style.width = '0%';
        }
        if (this.dom.playerCurrentTime) {
          this.dom.playerCurrentTime.textContent = '0.0s';
        }
      });

      this.dom.audioPreviewPlayer.addEventListener('pause', () => {
        if (this.dom.customPlayIcon) {
          this.dom.customPlayIcon.textContent = '▶';
          this.dom.customPlayIcon.classList.remove('playing');
        }
      });

      this.dom.audioPreviewPlayer.addEventListener('play', () => {
        if (this.dom.customPlayIcon) {
          this.dom.customPlayIcon.textContent = '⏸';
          this.dom.customPlayIcon.classList.add('playing');
        }
      });
    }

    if (this.dom.playerProgressContainer) {
      this.dom.playerProgressContainer.addEventListener('click', (e) => {
        if (!this.dom.audioPreviewPlayer) return;
        const rect = this.dom.playerProgressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const dur = this.dom.audioPreviewPlayer.duration || (this.currentTake ? this.currentTake.durationSec : 0);
        if (dur > 0 && width > 0) {
          const seekTime = (clickX / width) * dur;
          this.dom.audioPreviewPlayer.currentTime = seekTime;
          if (this.dom.playerCurrentTime) {
            this.dom.playerCurrentTime.textContent = `${seekTime.toFixed(1)}s`;
          }
          if (this.dom.playerProgressBar) {
            this.dom.playerProgressBar.style.width = `${(clickX / width) * 100}%`;
          }
        }
      });
    }

    // Export ZIP
    this.dom.exportZipBtn.addEventListener('click', () => this.handleExportZip());

    // README Modal Events
    this.dom.readmeBtn.addEventListener('click', () => this.openReadmeModal());
    this.dom.closeReadmeModalBtn.addEventListener('click', () => this.closeReadmeModal());
    this.dom.closeReadmeFooterBtn.addEventListener('click', () => this.closeReadmeModal());
    this.dom.readmeModal.addEventListener('click', (e) => {
      if (e.target === this.dom.readmeModal) this.closeReadmeModal();
    });

    // README Email Submission
    if (this.dom.readmeEmailSubmitBtn) {
      this.dom.readmeEmailSubmitBtn.addEventListener('click', () => this.submitViaEmail());
    }

    // Post-Export Submit Modal Events
    if (this.dom.closeSubmitModalBtn) {
      this.dom.closeSubmitModalBtn.addEventListener('click', () => this.closeSubmitModal());
    }
    if (this.dom.closeSubmitFooterBtn) {
      this.dom.closeSubmitFooterBtn.addEventListener('click', () => this.closeSubmitModal());
    }
    if (this.dom.submitModal) {
      this.dom.submitModal.addEventListener('click', (e) => {
        if (e.target === this.dom.submitModal) this.closeSubmitModal();
      });
    }
    if (this.dom.submitViaEmailBtn) {
      this.dom.submitViaEmailBtn.addEventListener('click', () => {
        this.closeSubmitModal();
        this.submitViaEmail();
      });
    }

    // Recordings Modal
    this.dom.viewListBtn.addEventListener('click', () => this.openRecordingsModal());
    this.dom.closeModalBtn.addEventListener('click', () => this.closeRecordingsModal());
    this.dom.recordingsModal.addEventListener('click', (e) => {
      if (e.target === this.dom.recordingsModal) this.closeRecordingsModal();
    });
    this.dom.deleteAllRecordingsBtn.addEventListener('click', () => this.handleDeleteAllRecordings());

    // Keyboard navigation (Arrow keys for scripts)
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.code === 'ArrowRight') {
        this.navigateScript(1);
      } else if (e.code === 'ArrowLeft') {
        this.navigateScript(-1);
      }
    });

    this._applyFontSize();
  }

  setGender(gender) {
    this.currentGender = gender;
    localStorage.setItem(STORAGE_KEY_GENDER, gender);
    this._updateGenderChipsUI();
    if (this.dom.setupGenderError) {
      this.dom.setupGenderError.classList.add('hidden');
    }
  }

  _updateGenderChipsUI() {
    const isMale = this.currentGender === 'male';
    const isFemale = this.currentGender === 'female';

    if (this.dom.setupGenderMaleBtn) {
      this.dom.setupGenderMaleBtn.classList.toggle('active', isMale);
    }
    if (this.dom.setupGenderFemaleBtn) {
      this.dom.setupGenderFemaleBtn.classList.toggle('active', isFemale);
    }
    if (this.dom.homeGenderMaleBtn) {
      this.dom.homeGenderMaleBtn.classList.toggle('active', isMale);
    }
    if (this.dom.homeGenderFemaleBtn) {
      this.dom.homeGenderFemaleBtn.classList.toggle('active', isFemale);
    }
  }

  proceedToHome() {
    const speakerVal = (this.dom.setupSpeakerInput ? this.dom.setupSpeakerInput.value.trim() : '') ||
                       (this.dom.speakerInput ? this.dom.speakerInput.value.trim() : '');

    // Validate gender selection
    if (!this.currentGender) {
      if (this.dom.setupGenderError) {
        this.dom.setupGenderError.classList.remove('hidden');
      }
      this.showToast("性別を選択してください", "warning");
      return;
    }

    // Default speaker fallback if empty
    if (!speakerVal) {
      const defaultName = "田中 太郎";
      if (this.dom.setupSpeakerInput) this.dom.setupSpeakerInput.value = defaultName;
      if (this.dom.speakerInput) this.dom.speakerInput.value = defaultName;
      localStorage.setItem(STORAGE_KEY_SPEAKER, defaultName);
    }

    // Pre-warm microphone permission during transition to eliminate first-recording lag
    this.audioRecorder.initMic().then(() => {
      if (this.audioRecorder.stream) {
        this.audioRecorder.stream.getTracks().forEach(t => t.stop());
        this.audioRecorder.stream = null;
      }
    }).catch(e => console.warn("Mic prewarm:", e));

    this.showHomeView();
  }

  showHomeView() {
    if (this.dom.setupPage) {
      this.dom.setupPage.classList.add('hidden');
    }
    if (this.dom.mainHomeView) {
      this.dom.mainHomeView.classList.remove('hidden');
    }
    if (this.dom.homeHeaderActions) {
      this.dom.homeHeaderActions.classList.remove('hidden');
    }
    if (this.dom.mobileHomeMenuItems) {
      this.dom.mobileHomeMenuItems.classList.remove('hidden');
    }
    this.currentView = 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showSetupView() {
    if (this.dom.mainHomeView) {
      this.dom.mainHomeView.classList.add('hidden');
    }
    if (this.dom.setupPage) {
      this.dom.setupPage.classList.remove('hidden');
    }
    if (this.dom.homeHeaderActions) {
      this.dom.homeHeaderActions.classList.add('hidden');
    }
    if (this.dom.mobileHomeMenuItems) {
      this.dom.mobileHomeMenuItems.classList.add('hidden');
    }
    this.currentView = 'setup';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  _applyFontSize() {
    this.fontSizeClasses.forEach(cls => this.dom.scriptDisplayArea.classList.remove(cls));
    this.dom.scriptDisplayArea.classList.add(this.fontSizeClasses[this.currentFontIndex] || 'font-xlarge');
  }

  loadScripts() {
    this.scripts = getScriptsForLang(this.currentScriptLang, this.currentCategory);
    if (this.currentCategory === 'custom') {
      this.dom.customScriptAddContainer.classList.remove('hidden');
    } else {
      this.dom.customScriptAddContainer.classList.add('hidden');
    }
  }

  async updateRecordedStatus() {
    this.recordedMap = await getRecordedMap();
    const count = Object.keys(this.recordedMap).length;
    if (this.dom.savedCountBadge) {
      this.dom.savedCountBadge.textContent = `${count} ${t('recordingsCount')}`;
    }
    if (this.dom.mobileSavedCountBadge) {
      this.dom.mobileSavedCountBadge.textContent = `${count} 件`;
    }
  }

  renderCurrentScript() {
    if (!this.scripts || this.scripts.length === 0) {
      this.dom.scriptDisplayArea.textContent = "(No scripts found for this category)";
      this.dom.scriptCounterText.textContent = "0 / 0";
      this.dom.scriptProgressBar.style.width = '0%';
      this.dom.prevScriptBtn.disabled = true;
      this.dom.nextScriptBtn.disabled = true;
      return;
    }

    if (this.currentScriptIndex >= this.scripts.length) {
      this.currentScriptIndex = this.scripts.length - 1;
    }
    if (this.currentScriptIndex < 0) {
      this.currentScriptIndex = 0;
    }

    const script = this.scripts[this.currentScriptIndex];
    this.dom.scriptDisplayArea.textContent = script.text;
    const catLabel = t(`categories.${script.category}`) || script.title || script.category;
    this.dom.scriptCategoryLabel.textContent = catLabel;
    
    // Progress
    const total = this.scripts.length;
    const current = this.currentScriptIndex + 1;
    this.dom.scriptCounterText.textContent = t('scriptCounter', { current, total });
    this.dom.scriptProgressBar.style.width = `${(current / total) * 100}%`;

    this.dom.prevScriptBtn.disabled = (this.currentScriptIndex === 0);
    this.dom.nextScriptBtn.disabled = (this.currentScriptIndex === total - 1);

    // Status Badge
    const recordedTake = this.recordedMap[script.id];
    if (recordedTake) {
      this.dom.scriptStatusBadge.textContent = `✓ ${t('statusRecorded')} (${recordedTake.durationSec}s)`;
      this.dom.scriptStatusBadge.className = 'script-badge badge-recorded';
    } else {
      this.dom.scriptStatusBadge.textContent = `○ ${t('statusUnrecorded')}`;
      this.dom.scriptStatusBadge.className = 'script-badge badge-unrecorded';
    }

    // Reset review stage if active
    if (this.dom.reviewControls.classList.contains('active')) {
      this.cancelReviewAndRerecord();
    }
  }

  navigateScript(delta) {
    const nextIdx = this.currentScriptIndex + delta;
    if (nextIdx >= 0 && nextIdx < this.scripts.length) {
      this.currentScriptIndex = nextIdx;
      this.renderCurrentScript();
    }
  }

  async startRecording() {
    try {
      this.dom.recordBtn.classList.add('hidden');
      this.dom.stopBtn.classList.remove('hidden');
      this.dom.stopBtn.classList.add('pulse-recording');
      this.dom.micStatusText.textContent = t('recordingStatus');
      this.dom.micStatusText.classList.add('text-recording');

      await this.audioRecorder.startRecording((elapsedMs) => {
        const sec = Math.floor(elapsedMs / 1000);
        const ms = Math.floor((elapsedMs % 1000) / 100);
        this.dom.recordTimer.textContent = `${String(sec).padStart(2, '0')}.${ms}s`;
      });
    } catch (err) {
      console.error(err);
      this.dom.recordBtn.classList.remove('hidden');
      this.dom.stopBtn.classList.add('hidden');
      this.dom.stopBtn.classList.remove('pulse-recording');
      this.showToast(t('micError'), 'error');
    }
  }

  async stopRecording() {
    this.dom.stopBtn.classList.add('hidden');
    this.dom.stopBtn.classList.remove('pulse-recording');
    this.dom.micStatusText.textContent = t('previewAudio');
    this.dom.micStatusText.classList.remove('text-recording');

    const result = await this.audioRecorder.stopRecording();
    if (!result) return;

    this.currentTake = result;

    // Setup preview audio
    if (this.currentAudioUrl) {
      URL.revokeObjectURL(this.currentAudioUrl);
    }
    this.currentAudioUrl = URL.createObjectURL(result.blob);
    this.dom.audioPreviewPlayer.src = this.currentAudioUrl;
    this.dom.audioPreviewPlayer.load(); // Forces media pipeline readiness on mobile browsers

    if (this.dom.playerTotalTime) {
      this.dom.playerTotalTime.textContent = `${result.durationSec.toFixed(1)}s`;
    }
    if (this.dom.playerCurrentTime) {
      this.dom.playerCurrentTime.textContent = '0.0s';
    }
    if (this.dom.playerProgressBar) {
      this.dom.playerProgressBar.style.width = '0%';
    }
    if (this.dom.customPlayIcon) {
      this.dom.customPlayIcon.textContent = '▶';
      this.dom.customPlayIcon.classList.remove('playing');
    }

    // Show review controls
    this.dom.reviewControls.classList.remove('hidden');
    this.dom.reviewControls.classList.add('active');
  }

  togglePreviewAudio() {
    if (!this.dom.audioPreviewPlayer || !this.currentAudioUrl) return;

    if (this.dom.audioPreviewPlayer.paused) {
      this.dom.audioPreviewPlayer.play().then(() => {
        if (this.dom.customPlayIcon) {
          this.dom.customPlayIcon.textContent = '⏸';
          this.dom.customPlayIcon.classList.add('playing');
        }
      }).catch(e => {
        console.warn("Audio play error", e);
      });
    } else {
      this.dom.audioPreviewPlayer.pause();
      if (this.dom.customPlayIcon) {
        this.dom.customPlayIcon.textContent = '▶';
        this.dom.customPlayIcon.classList.remove('playing');
      }
    }
  }

  cancelReviewAndRerecord() {
    if (this.dom.audioPreviewPlayer) {
      this.dom.audioPreviewPlayer.pause();
      this.dom.audioPreviewPlayer.src = '';
    }
    if (this.currentAudioUrl) {
      URL.revokeObjectURL(this.currentAudioUrl);
      this.currentAudioUrl = null;
    }
    this.currentTake = null;
    if (this.dom.customPlayIcon) {
      this.dom.customPlayIcon.textContent = '▶';
      this.dom.customPlayIcon.classList.remove('playing');
    }
    if (this.dom.playerProgressBar) {
      this.dom.playerProgressBar.style.width = '0%';
    }
    if (this.dom.playerCurrentTime) {
      this.dom.playerCurrentTime.textContent = '0.0s';
    }
    this.dom.reviewControls.classList.remove('active');
    this.dom.reviewControls.classList.add('hidden');
    this.dom.recordBtn.classList.remove('hidden');
    this.dom.recordTimer.textContent = '00.0s';
    this.dom.micStatusText.textContent = t('micReady');
  }

  async saveCurrentTakeAndAdvance() {
    if (!this.currentTake || !this.scripts[this.currentScriptIndex]) return;

    const script = this.scripts[this.currentScriptIndex];
    const speaker = this.dom.speakerInput.value.trim() || 'Speaker_1';
    const customNote = this.dom.customNoteInput.value.trim();
    const timestamp = new Date().toISOString();
    const takeId = `${script.id}_${Date.now()}`;

    const recordData = {
      id: takeId,
      scriptId: script.id,
      lang: this.currentScriptLang,
      category: script.category,
      scriptText: script.text,
      customNote: customNote,
      speaker: speaker,
      gender: this.currentGender || "",
      deviceInfo: this.deviceInfo,
      timestamp: timestamp,
      durationSec: this.currentTake.durationSec,
      sampleRate: this.currentTake.sampleRate,
      channels: this.currentTake.channels,
      bitsPerSample: this.currentTake.bitsPerSample,
      audioBlob: this.currentTake.blob
    };

    await saveRecording(recordData);
    await this.updateRecordedStatus();

    this.showToast(`✓ "${script.text.slice(0, 15)}..." 保存完了`);

    this.cancelReviewAndRerecord();

    // Auto advance to next script if available
    if (this.currentScriptIndex < this.scripts.length - 1) {
      this.navigateScript(1);
    } else {
      this.renderCurrentScript();
    }
  }

  async handleExportZip() {
    try {
      this.showToast(t('exportingZip'));
      const { blob, filename } = await exportDatasetZip();
      this.lastExportedZip = { blob, filename };
      triggerBlobDownload(blob, filename);
      this.showToast(`📦 ${filename} をダウンロードしました！`);
      setTimeout(() => {
        this.openSubmitModal();
      }, 700);
    } catch (e) {
      if (e.message === 'NO_DATA') {
        this.showToast(t('noDataToExport'), 'warning');
      } else {
        console.error(e);
        this.showToast("Export failed: " + e.message, 'error');
      }
    }
  }

  _getSubmissionInfo() {
    const rawSpeaker = this.dom.speakerInput.value.trim() || '未設定';
    const genderSuffix = this.currentGender === 'male' ? '（男性）' : this.currentGender === 'female' ? '（女性）' : '';
    const speakerWithGender = `${rawSpeaker}${genderSuffix}`;

    const note = this.dom.customNoteInput.value.trim() || 'なし';
    const count = Object.keys(this.recordedMap).length;
    const d = new Date();
    const formattedDate = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    const emailTo = 'ynagasawa@spacetime-eng.com';

    return { speaker: rawSpeaker, speakerWithGender, note, count, formattedDate, emailTo };
  }

  async submitViaEmail() {
    const info = this._getSubmissionInfo();
    const subject = `【録音データ】VoiceCollector - ${info.speakerWithGender}`;
    const bodyPlain = `VoiceCollectorで録音した音声データを共有します。

【録音情報】
・宛先：${info.emailTo}
・話者名：${info.speakerWithGender}
・備考：${info.note}
・録音件数：${info.count}件
・データ作成日時：${info.formattedDate}

録音データのZIPファイルを添付しています。`;

    // 1. If Web Share API is supported with file sharing (iOS Safari, Android Chrome, Mac/Windows)
    if (this.lastExportedZip && navigator.canShare) {
      try {
        const file = new File([this.lastExportedZip.blob], this.lastExportedZip.filename, {
          type: 'application/zip',
          lastModified: Date.now()
        });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: subject,
            text: bodyPlain,
            files: [file]
          });
          return;
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          // User dismissed the share sheet
          return;
        }
        console.warn("navigator.share with files fallback to mailto", err);
      }
    }

    // 2. Fallback: mailto URL scheme
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(bodyPlain);
    const mailto = `mailto:${info.emailTo}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    window.location.href = mailto;
  }

  openSubmitModal() {
    if (this.dom.submitModal) {
      this.dom.submitModal.classList.remove('hidden');
    }
  }

  closeSubmitModal() {
    if (this.dom.submitModal) {
      this.dom.submitModal.classList.add('hidden');
    }
  }

  openReadmeModal() {
    this.dom.readmeModal.classList.remove('hidden');
  }

  closeReadmeModal() {
    this.dom.readmeModal.classList.add('hidden');
  }

  async openRecordingsModal() {
    this.dom.recordingsModal.classList.remove('hidden');
    await this.renderRecordingsList();
  }

  closeRecordingsModal() {
    this.dom.recordingsModal.classList.add('hidden');
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement = null;
    }
  }

  async renderRecordingsList() {
    const container = this.dom.recordingsListContainer;
    container.innerHTML = '';

    const list = await getAllRecordings();
    if (!list || list.length === 0) {
      container.innerHTML = `<div class="empty-state">${t('emptyRecordings')}</div>`;
      return;
    }

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'recording-item-card';

      const audioUrl = URL.createObjectURL(item.audioBlob);

      card.innerHTML = `
        <div class="rec-item-header">
          <div class="rec-item-title-group">
            <span class="rec-tag rec-tag-lang">${item.lang.toUpperCase()}</span>
            <span class="rec-tag rec-tag-cat">${t(`categories.${item.category}`) || item.category}</span>
          </div>
          <div class="rec-item-date">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div class="rec-item-text">${item.scriptText}</div>
        <div class="rec-item-meta">
          <span>👤 ${item.speaker || 'Anonymous'}</span>
          <span>⏱ ${item.durationSec}s (16kHz WAV)</span>
          ${item.customNote ? `<span>📝 ${item.customNote}</span>` : ''}
        </div>
        <div class="rec-item-actions">
          <audio controls src="${audioUrl}" preload="none"></audio>
          <div class="rec-item-btn-group">
            <a href="${audioUrl}" download="${item.scriptId}_${item.speaker || 'user'}.wav" class="btn btn-sm btn-outline">
              📥 ${t('downloadSingle')}
            </a>
            <button type="button" class="btn btn-sm btn-danger delete-btn" data-id="${item.id}">
              🗑 ${t('deleteBtn')}
            </button>
          </div>
        </div>
      `;

      card.querySelector('.delete-btn').addEventListener('click', async () => {
        if (confirm(t('confirmDeleteOne'))) {
          await deleteRecording(item.id);
          await this.updateRecordedStatus();
          this.renderCurrentScript();
          await this.renderRecordingsList();
          this.showToast(t('deleteBtn') + ": OK");
        }
      });

      container.appendChild(card);
    });
  }

  async handleDeleteAllRecordings() {
    if (confirm(t('confirmDeleteAll'))) {
      await clearAllRecordings();
      await this.updateRecordedStatus();
      this.renderCurrentScript();
      await this.renderRecordingsList();
      this.showToast("All recordings deleted");
    }
  }

  _initTheme() {
    const savedTheme = localStorage.getItem('voice_collector_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  _toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('voice_collector_theme', next);
  }

  _getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform || 'unknown',
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio || 1,
      language: navigator.language
    };
  }

  showToast(message, type = 'info') {
    const toast = this.dom.toast;
    toast.textContent = message;
    toast.className = `toast toast-${type} show`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new VoiceCollectorApp();
  app.init();
});
