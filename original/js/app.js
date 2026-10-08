// =========================================================================
// AGÊNCIA CÓDICE - APLICAÇÃO PRINCIPAL (APP.JS)
// Gerenciador de Estado, Mecânicas de Gamificação, Didática e Interações
// =========================================================================

class CodiceApp {
  constructor() {
    this.state = this.loadState();
    this.currentCase = null;
    this.currentQuestionIdx = 0;
    this.currentMinigame = null;
    this.minigameIdx = 0;
    this.minigameScore = 0;
    this.minigameStreak = 0;
    this.highlighterColor = 'yellow'; // yellow, cyan, pink
    this.highlighterActive = false;

    this.initConfetti();
    this.initDOM();
    this.initEvents();
    this.updateHUD();
    this.renderCampaign();
    this.renderArsenal();
    this.renderProfile();
    this.checkBadges();
  }

  // -------------------------------------------------------------
  // ESTADO & LOCAL STORAGE
  // -------------------------------------------------------------
  getDefaultState() {
    return {
      agentName: "Sofia",
      agentCodename: "Olho de Lince",
      avatarId: "agent_cyber",
      xp: 0,
      level: 1,
      rankTitle: "Novata da Agência",
      completedCases: [],
      solvedQuestions: {},
      unlockedBadges: [],
      highlighterCount: 0,
      dojoStreakMax: 0,
      notes: ""
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem("codice_agent_profile");
      if (saved) {
        return { ...this.getDefaultState(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Error loading state", e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem("codice_agent_profile", JSON.stringify(this.state));
    } catch (e) {
      console.error("Error saving state", e);
    }
    this.updateHUD();
  }

  // -------------------------------------------------------------
  // INICIALIZAÇÃO DOM & EVENTOS
  // -------------------------------------------------------------
  initDOM() {
    // Navigation Tabs
    this.tabBtns = document.querySelectorAll(".nav-tab-btn");
    this.tabPanes = document.querySelectorAll(".tab-pane");

    // HUD Elements
    this.hudName = document.getElementById("hud-agent-name");
    this.hudRank = document.getElementById("hud-agent-rank");
    this.hudAvatar = document.getElementById("hud-avatar-box");
    this.hudXpVal = document.getElementById("hud-xp-val");
    this.hudXpMax = document.getElementById("hud-xp-max");
    this.hudXpFill = document.getElementById("hud-xp-fill");

    // Audio Buttons
    this.sfxBtn = document.getElementById("btn-toggle-sfx");
    this.bgmBtn = document.getElementById("btn-toggle-bgm");

    // Reader Elements
    this.readerModal = document.getElementById("case-reader-modal");
    this.btnCloseReader = document.getElementById("btn-close-reader");
    this.readerCategory = document.getElementById("reader-case-category");
    this.readerTitle = document.getElementById("reader-case-title");
    this.readerIntroText = document.getElementById("reader-intro-text");
    this.readerDoc = document.getElementById("reader-evidence-doc");
    this.qCounter = document.getElementById("question-counter-text");
    this.qTitle = document.getElementById("question-title-text");
    this.hintBox = document.getElementById("question-hint-box");
    this.hintToggleBtn = document.getElementById("btn-toggle-hint");
    this.optionsContainer = document.getElementById("options-container");
    this.feedbackBox = document.getElementById("forensic-feedback-box");
    this.feedbackBadge = document.getElementById("feedback-badge");
    this.feedbackText = document.getElementById("feedback-text");
    this.btnNextQ = document.getElementById("btn-next-question");

    // Minigame Modal
    this.minigameModal = document.getElementById("minigame-modal");
    this.btnCloseMinigame = document.getElementById("btn-close-minigame");

    // Profile & Name Editor Modal
    this.profileModal = document.getElementById("agent-editor-modal");
    this.certificateModal = document.getElementById("certificate-modal");
  }

  initEvents() {
    // Tab switching
    this.tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        sounds.playClick();
        const tabId = btn.getAttribute("data-tab");
        this.switchTab(tabId);
      });
    });

    // Audio Toggles
    if (this.sfxBtn) {
      this.sfxBtn.addEventListener("click", () => {
        const state = sounds.toggleSound();
        this.sfxBtn.classList.toggle("active", state);
        this.sfxBtn.innerHTML = state ? "🔊" : "🔇";
        if (state) sounds.playClick();
      });
    }

    if (this.bgmBtn) {
      this.bgmBtn.addEventListener("click", () => {
        const playing = sounds.toggleBgm();
        this.bgmBtn.classList.toggle("active", playing);
        this.bgmBtn.innerHTML = playing ? "🎵" : "🎼";
      });
    }

    // Reader Close
    if (this.btnCloseReader) {
      this.btnCloseReader.addEventListener("click", () => {
        sounds.playClick();
        this.closeReader();
      });
    }

    // Hint toggle
    if (this.hintToggleBtn) {
      this.hintToggleBtn.addEventListener("click", () => {
        sounds.playClue();
        this.hintBox.classList.toggle("show");
      });
    }

    // Next Question Button
    if (this.btnNextQ) {
      this.btnNextQ.addEventListener("click", () => {
        sounds.playClick();
        this.nextQuestion();
      });
    }

    // Highlighter Tools
    const highlighterBtns = document.querySelectorAll(".hl-color-btn");
    highlighterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        sounds.playClick();
        const color = btn.getAttribute("data-color");
        this.applyHighlight(color);
      });
    });

    // Reader Font Size controls
    const btnFontInc = document.getElementById("btn-font-inc");
    const btnFontDec = document.getElementById("btn-font-dec");
    if (btnFontInc && btnFontDec) {
      btnFontInc.addEventListener("click", () => {
        const doc = this.readerDoc;
        const currentSize = parseFloat(window.getComputedStyle(doc).fontSize);
        if (currentSize < 24) doc.style.fontSize = (currentSize + 2) + "px";
        sounds.playClick();
      });
      btnFontDec.addEventListener("click", () => {
        const doc = this.readerDoc;
        const currentSize = parseFloat(window.getComputedStyle(doc).fontSize);
        if (currentSize > 14) doc.style.fontSize = (currentSize - 2) + "px";
        sounds.playClick();
      });
    }

    // Minigame Close
    if (this.btnCloseMinigame) {
      this.btnCloseMinigame.addEventListener("click", () => {
        sounds.playClick();
        this.closeMinigame();
      });
    }

    // Profile Click to Edit
    const hudProfileTrigger = document.querySelector(".hud-agent-card");
    if (hudProfileTrigger) {
      hudProfileTrigger.addEventListener("click", () => {
        sounds.playClick();
        this.openAgentEditor();
      });
    }

    const btnEditProfileTrigger = document.getElementById("btn-edit-profile-trigger");
    if (btnEditProfileTrigger) {
      btnEditProfileTrigger.addEventListener("click", () => {
        sounds.playClick();
        this.openAgentEditor();
      });
    }

    const btnCloseEditor = document.getElementById("btn-close-editor");
    if (btnCloseEditor) {
      btnCloseEditor.addEventListener("click", () => {
        sounds.playClick();
        const editor = document.getElementById("agent-editor-modal");
        if (editor) editor.classList.remove("open");
      });
    }

    const btnSaveAgent = document.getElementById("btn-save-agent");
    if (btnSaveAgent) {
      btnSaveAgent.addEventListener("click", () => {
        const newName = document.getElementById("input-agent-name").value.trim();
        const newCodename = document.getElementById("input-agent-codename").value.trim();
        if (newName) this.state.agentName = newName;
        if (newCodename) this.state.agentCodename = newCodename;
        if (this.selectedTempAvatar) this.state.avatarId = this.selectedTempAvatar;

        sounds.playSuccess();
        this.saveState();
        this.renderProfile();
        const editor = document.getElementById("agent-editor-modal");
        if (editor) editor.classList.remove("open");
        this.showNotification("Credencial de Agente atualizada com sucesso!", "success");
      });
    }

    // Certificate Trigger
    const btnOpenCert = document.getElementById("btn-open-certificate");
    if (btnOpenCert) {
      btnOpenCert.addEventListener("click", () => {
        sounds.playBadge();
        this.openCertificate();
      });
    }

    const btnCloseCert = document.getElementById("btn-close-certificate");
    if (btnCloseCert) {
      btnCloseCert.addEventListener("click", () => {
        sounds.playClick();
        this.certificateModal.classList.remove("open");
      });
    }

    const btnPrintCert = document.getElementById("btn-print-certificate");
    if (btnPrintCert) {
      btnPrintCert.addEventListener("click", () => {
        window.print();
      });
    }
  }

  // -------------------------------------------------------------
  // CONTROLE DE NAVEGAÇÃO
  // -------------------------------------------------------------
  switchTab(tabId) {
    this.tabBtns.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    this.tabPanes.forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-${tabId}`);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // -------------------------------------------------------------
  // SISTEMA DE XP, NÍVEL E PATENTES
  // -------------------------------------------------------------
  addXP(amount) {
    const oldLevel = this.getCurrentRank().level;
    this.state.xp += amount;
    const newRank = this.getCurrentRank();

    if (newRank.level > oldLevel) {
      sounds.playLevelUp();
      this.triggerConfetti();
      this.showNotification(`🎉 PROMOÇÃO DE PATENTE! Você agora é ${newRank.name} (${newRank.badge})!`, "success");
    } else {
      sounds.playSuccess();
    }

    this.saveState();
    this.checkBadges();
  }

  getCurrentRank() {
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (this.state.xp >= RANKS[i].minXp) {
        return RANKS[i];
      }
    }
    return RANKS[0];
  }

  updateHUD() {
    const rank = this.getCurrentRank();
    this.state.rankTitle = rank.name;

    if (this.hudName) this.hudName.textContent = this.state.agentName;
    if (this.hudRank) this.hudRank.textContent = `${rank.icon} ${rank.name}`;

    // Render Avatar
    const avatar = AVATARS.find(a => a.id === this.state.avatarId) || AVATARS[0];
    if (this.hudAvatar) {
      this.hudAvatar.innerHTML = avatar.svg;
    }

    // XP calculation
    const nextRank = RANKS.find(r => r.level === rank.level + 1);
    const maxVal = nextRank ? nextRank.minXp : rank.maxXp;
    const baseVal = rank.minXp;
    const currentProgress = this.state.xp - baseVal;
    const range = maxVal - baseVal;
    const pct = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));

    if (this.hudXpVal) this.hudXpVal.textContent = `${this.state.xp} XP`;
    if (this.hudXpMax) this.hudXpMax.textContent = nextRank ? `${maxVal} XP` : "MAX";
    if (this.hudXpFill) this.hudXpFill.style.width = `${pct}%`;
  }

  // -------------------------------------------------------------
  // RENDERIZAÇÃO DA CAMPANHA
  // -------------------------------------------------------------
  renderCampaign() {
    const flowContainer = document.getElementById("operations-flow-container");
    if (!flowContainer) return;

    flowContainer.innerHTML = "";

    OPERATIONS.forEach(op => {
      const block = document.createElement("div");
      block.className = "operation-block";
      block.style.borderColor = `${op.themeColor}33`;

      // Header
      const header = document.createElement("div");
      header.className = "op-header";
      header.innerHTML = `
        <div>
          <span class="op-number-tag" style="color: ${op.themeColor}">OPERAÇÃO 0${op.number}</span>
          <h3>${op.title}</h3>
          <div class="op-subtitle">${op.subtitle}</div>
          <p class="op-desc">${op.description}</p>
        </div>
      `;
      block.appendChild(header);

      // Cases Grid
      const grid = document.createElement("div");
      grid.className = "cases-grid";

      op.cases.forEach(c => {
        const card = document.createElement("div");
        const isCompleted = this.state.completedCases.includes(c.id);
        const isBoss = !!c.isBoss;

        card.className = `case-card ${isCompleted ? 'completed' : ''} ${isBoss ? 'boss-card' : ''}`;
        card.innerHTML = `
          <div>
            <div class="case-meta">
              <span class="case-badge ${isBoss ? 'boss' : ''}">${c.difficulty}</span>
              <span class="case-badge">${c.category}</span>
            </div>
            <h4>${c.title}</h4>
            <p class="case-snippet">${c.textIntro.substring(0, 115)}...</p>
          </div>
          <div class="case-footer">
            <span class="case-xp">⭐ +${c.xp} XP</span>
            <span>${isCompleted ? 'Revisar Caso ▸' : 'Iniciar Investigação ▸'}</span>
          </div>
        `;

        card.addEventListener("click", () => {
          sounds.playClick();
          this.openCase(c);
        });

        grid.appendChild(card);
      });

      block.appendChild(grid);
      flowContainer.appendChild(block);
    });
  }

  // -------------------------------------------------------------
  // WORKSTATION DO CASO (LEITOR & QUESTÕES)
  // -------------------------------------------------------------
  openCase(caseObj) {
    this.currentCase = caseObj;
    this.currentQuestionIdx = 0;

    this.readerCategory.textContent = caseObj.category;
    this.readerTitle.textContent = caseObj.title;
    this.readerIntroText.textContent = caseObj.textIntro;
    this.readerDoc.innerHTML = caseObj.text.replace(/\n\n/g, "<br><br>");

    this.renderQuestion();
    this.readerModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  closeReader() {
    this.readerModal.classList.remove("open");
    document.body.style.overflow = "auto";
    this.currentCase = null;
  }

  renderQuestion() {
    const q = this.currentCase.questions[this.currentQuestionIdx];
    const totalQ = this.currentCase.questions.length;

    this.qCounter.textContent = `Pergunta ${this.currentQuestionIdx + 1} de ${totalQ}`;
    this.qTitle.textContent = q.question;

    // Hint
    this.hintBox.textContent = `💡 DICA DO MENTOR: ${q.hint}`;
    this.hintBox.classList.remove("show");

    // Options
    this.optionsContainer.innerHTML = "";
    this.feedbackBox.classList.remove("show");
    this.btnNextQ.classList.remove("show");

    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML = `
        <span class="option-letter">${opt.id}</span>
        <span>${opt.text}</span>
      `;

      btn.addEventListener("click", () => {
        this.handleAnswer(opt, btn);
      });

      this.optionsContainer.appendChild(btn);
    });
  }

  handleAnswer(selectedOpt, btnElement) {
    const q = this.currentCase.questions[this.currentQuestionIdx];
    const allBtns = this.optionsContainer.querySelectorAll(".option-btn");

    // Disable all options
    allBtns.forEach(b => b.disabled = true);

    if (selectedOpt.isCorrect) {
      sounds.playSuccess();
      btnElement.classList.add("selected-correct");
      this.feedbackBadge.className = "feedback-badge correct";
      this.feedbackBadge.textContent = "✓ DEDUÇÃO CORRETA!";
      this.feedbackText.textContent = selectedOpt.feedback;

      // Check if it's the last question of the case
      const isLast = this.currentQuestionIdx === this.currentCase.questions.length - 1;
      if (isLast) {
        if (!this.state.completedCases.includes(this.currentCase.id)) {
          this.state.completedCases.push(this.currentCase.id);
          this.addXP(this.currentCase.xp);
          this.triggerConfetti();
          this.renderCampaign();
          this.renderProfile();
        }
        this.btnNextQ.textContent = "🏆 CASO CONCLUÍDO! VOLTAR AO QUARTEL";
      } else {
        this.btnNextQ.textContent = "PRÓXIMA PERGUNTA ▸";
      }
    } else {
      sounds.playError();
      btnElement.classList.add("selected-wrong");
      this.feedbackBadge.className = "feedback-badge wrong";
      this.feedbackBadge.textContent = "✗ PISTA FALSA / ARMADILHA DETECTADA";
      this.feedbackText.textContent = selectedOpt.feedback;
      this.btnNextQ.textContent = "TENTAR NOVAMENTE ↺";
    }

    this.feedbackBox.classList.add("show");
    this.btnNextQ.classList.add("show");
  }

  nextQuestion() {
    const isRetry = this.btnNextQ.textContent.includes("TENTAR NOVAMENTE");

    if (isRetry) {
      this.renderQuestion();
      return;
    }

    const totalQ = this.currentCase.questions.length;
    if (this.currentQuestionIdx < totalQ - 1) {
      this.currentQuestionIdx++;
      this.renderQuestion();
    } else {
      this.closeReader();
      this.checkBadges();
    }
  }

  // -------------------------------------------------------------
  // FERRAMENTA DE GRIFAR TEXTO (HIGHLIGHTER)
  // -------------------------------------------------------------
  applyHighlight(color) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      this.showNotification("Selecione um trecho do texto com o mouse antes de grifar!", "info");
      return;
    }

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.className = `highlight-${color}`;
    span.textContent = range.toString();

    range.deleteContents();
    range.insertNode(span);
    selection.removeAllRanges();

    sounds.playClue();
    this.state.highlighterCount = (this.state.highlighterCount || 0) + 1;
    this.saveState();
    this.checkBadges();
  }

  // -------------------------------------------------------------
  // DOJÔ DE TREINO RÁPIDO (MINIGAMES)
  // -------------------------------------------------------------
  launchMinigame(type) {
    this.currentMinigame = type;
    this.minigameIdx = 0;
    this.minigameScore = 0;
    this.minigameStreak = 0;

    const modalTitle = document.getElementById("minigame-title");
    const container = document.getElementById("minigame-body-content");

    if (type === "factVsOpinion") {
      modalTitle.textContent = "⚖️ Fato ou Opinião Express";
      this.renderFactVsOpinion();
    } else if (type === "connectives") {
      modalTitle.textContent = "🌉 O Conectivo Mágico";
      this.renderConnectiveGame();
    } else if (type === "irony") {
      modalTitle.textContent = "🎭 Caçador de Ironia";
      this.renderIronyGame();
    }

    this.minigameModal.classList.add("open");
  }

  closeMinigame() {
    this.minigameModal.classList.remove("open");
    this.currentMinigame = null;
  }

  renderFactVsOpinion() {
    const list = MINI_GAMES.factVsOpinion;
    const item = list[this.minigameIdx % list.length];
    const scoreBadge = document.getElementById("minigame-score-text");
    scoreBadge.textContent = `Pontos: ${this.minigameScore} | Combo: ${this.minigameStreak}x`;

    const container = document.getElementById("minigame-body-content");
    container.innerHTML = `
      <div class="minigame-context">Julgue a afirmação abaixo com precisão de perita:</div>
      <div class="minigame-prompt">"${item.statement}"</div>
      <div class="minigame-actions-row">
        <button class="btn-game-choice btn-fact" id="btn-choice-fact">📊 É UM FATO</button>
        <button class="btn-game-choice btn-opinion" id="btn-choice-opinion">💭 É UMA OPINIÃO</button>
      </div>
      <div class="minigame-feedback" id="mg-feedback"></div>
    `;

    document.getElementById("btn-choice-fact").addEventListener("click", () => {
      this.handleFactChoice("FATO", item);
    });

    document.getElementById("btn-choice-opinion").addEventListener("click", () => {
      this.handleFactChoice("OPINIÃO", item);
    });
  }

  handleFactChoice(choice, item) {
    const fb = document.getElementById("mg-feedback");
    const isCorrect = choice === item.type;

    if (isCorrect) {
      sounds.playSuccess();
      this.minigameScore += 10 + (this.minigameStreak * 5);
      this.minigameStreak++;
      if (this.minigameStreak > this.state.dojoStreakMax) {
        this.state.dojoStreakMax = this.minigameStreak;
      }
      this.addXP(25);
      fb.style.background = "rgba(46, 204, 113, 0.2)";
      fb.style.color = "var(--accent-green)";
      fb.innerHTML = `✓ CORRETO! ${item.why}`;
    } else {
      sounds.playError();
      this.minigameStreak = 0;
      fb.style.background = "rgba(255, 71, 87, 0.2)";
      fb.style.color = "var(--accent-red)";
      fb.innerHTML = `✗ NÃO ERA ISSO! ${item.why}`;
    }

    fb.style.display = "block";

    setTimeout(() => {
      this.minigameIdx++;
      if (this.minigameIdx < MINI_GAMES.factVsOpinion.length) {
        this.renderFactVsOpinion();
      } else {
        this.finishMinigame();
      }
    }, 1800);
  }

  renderConnectiveGame() {
    const list = MINI_GAMES.connectives;
    const item = list[this.minigameIdx % list.length];
    const scoreBadge = document.getElementById("minigame-score-text");
    scoreBadge.textContent = `Pontos: ${this.minigameScore} | Combo: ${this.minigameStreak}x`;

    const container = document.getElementById("minigame-body-content");
    container.innerHTML = `
      <div class="minigame-context">Qual conectivo preenche a lacuna mantendo a lógica perfeita?</div>
      <div class="minigame-prompt">${item.phrase}</div>
      <div class="options-list" id="connective-options"></div>
      <div class="minigame-feedback" id="mg-feedback"></div>
    `;

    const optContainer = document.getElementById("connective-options");
    item.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML = `<span class="option-letter">▸</span> <strong>${opt.word}</strong>`;
      btn.addEventListener("click", () => {
        this.handleConnectiveChoice(opt);
      });
      optContainer.appendChild(btn);
    });
  }

  handleConnectiveChoice(opt) {
    const fb = document.getElementById("mg-feedback");
    if (opt.correct) {
      sounds.playSuccess();
      this.minigameScore += 20;
      this.minigameStreak++;
      this.addXP(30);
      fb.style.background = "rgba(46, 204, 113, 0.2)";
      fb.style.color = "var(--accent-green)";
      fb.innerHTML = `✓ EXATO! ${opt.explain}`;
    } else {
      sounds.playError();
      this.minigameStreak = 0;
      fb.style.background = "rgba(255, 71, 87, 0.2)";
      fb.style.color = "var(--accent-red)";
      fb.innerHTML = `✗ ERROU O RUMO! ${opt.explain}`;
    }
    fb.style.display = "block";

    setTimeout(() => {
      this.minigameIdx++;
      if (this.minigameIdx < MINI_GAMES.connectives.length) {
        this.renderConnectiveGame();
      } else {
        this.finishMinigame();
      }
    }, 1900);
  }

  renderIronyGame() {
    const list = MINI_GAMES.ironyRadar;
    const item = list[this.minigameIdx % list.length];
    const scoreBadge = document.getElementById("minigame-score-text");
    scoreBadge.textContent = `Pontos: ${this.minigameScore} | Combo: ${this.minigameStreak}x`;

    const container = document.getElementById("minigame-body-content");
    container.innerHTML = `
      <div class="minigame-context">${item.context}</div>
      <div class="minigame-prompt">"${item.phrase}"</div>
      <div class="minigame-actions-row">
        <button class="btn-game-choice btn-opinion" id="btn-is-irony">🎭 É IRONIA / SARCASMO</button>
        <button class="btn-game-choice btn-fact" id="btn-is-literal">📖 É SENTIDO LITERAL</button>
      </div>
      <div class="minigame-feedback" id="mg-feedback"></div>
    `;

    document.getElementById("btn-is-irony").addEventListener("click", () => {
      this.handleIronyChoice(true, item);
    });

    document.getElementById("btn-is-literal").addEventListener("click", () => {
      this.handleIronyChoice(false, item);
    });
  }

  handleIronyChoice(choseIrony, item) {
    const fb = document.getElementById("mg-feedback");
    const isCorrect = choseIrony === item.isIrony;

    if (isCorrect) {
      sounds.playSuccess();
      this.minigameScore += 20;
      this.minigameStreak++;
      this.addXP(30);
      fb.style.background = "rgba(46, 204, 113, 0.2)";
      fb.style.color = "var(--accent-green)";
      fb.innerHTML = `✓ DECODIFICADO COM SUCESSO! ${item.why}`;
    } else {
      sounds.playError();
      this.minigameStreak = 0;
      fb.style.background = "rgba(255, 71, 87, 0.2)";
      fb.style.color = "var(--accent-red)";
      fb.innerHTML = `✗ RADAR ENGANADO! ${item.why}`;
    }

    fb.style.display = "block";

    setTimeout(() => {
      this.minigameIdx++;
      if (this.minigameIdx < MINI_GAMES.ironyRadar.length) {
        this.renderIronyGame();
      } else {
        this.finishMinigame();
      }
    }, 1900);
  }

  finishMinigame() {
    sounds.playLevelUp();
    this.triggerConfetti();
    const container = document.getElementById("minigame-body-content");
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🏆</div>
        <h3>Treino do Dojô Finalizado!</h3>
        <p style="color: var(--text-muted); margin: 0.5rem 0 1.5rem;">Sua pontuação final foi de <strong>${this.minigameScore} pontos</strong>!</p>
        <button class="btn-launch-game" style="margin: 0 auto;" onclick="codice.closeMinigame()">Voltar ao Quartel</button>
      </div>
    `;
    this.saveState();
    this.checkBadges();
  }

  // -------------------------------------------------------------
  // ARSENAL DIDÁTICO (GUIA ESTRATÉGICO)
  // -------------------------------------------------------------
  renderArsenal() {
    const container = document.getElementById("arsenal-cards-container");
    if (!container) return;

    container.innerHTML = "";

    ARSENAL_GUIDE.forEach(guide => {
      const card = document.createElement("div");
      card.className = "arsenal-card";
      card.innerHTML = `
        <div class="arsenal-card-header">
          <div class="arsenal-icon-box" style="border: 1px solid ${guide.color}44">${guide.icon}</div>
          <div>
            <h3>${guide.title}</h3>
            <div class="arsenal-summary" style="color: ${guide.color}">${guide.summary}</div>
          </div>
        </div>
        <ul class="arsenal-points-list">
          ${guide.points.map(pt => `<li>${pt}</li>`).join("")}
        </ul>
      `;
      container.appendChild(card);
    });
  }

  // -------------------------------------------------------------
  // PERFIL & CONQUISTAS (BADGES)
  // -------------------------------------------------------------
  renderProfile() {
    const avatarEl = document.getElementById("profile-big-avatar");
    const nameEl = document.getElementById("profile-agent-name");
    const codenameEl = document.getElementById("profile-agent-codename");
    const rankEl = document.getElementById("profile-stat-rank");
    const xpEl = document.getElementById("profile-stat-xp");
    const casesEl = document.getElementById("profile-stat-cases");

    const avatar = AVATARS.find(a => a.id === this.state.avatarId) || AVATARS[0];
    if (avatarEl) avatarEl.innerHTML = avatar.svg;
    if (nameEl) nameEl.textContent = this.state.agentName;
    if (codenameEl) codenameEl.textContent = `Codinome: ${this.state.agentCodename}`;

    const rank = this.getCurrentRank();
    if (rankEl) rankEl.textContent = `${rank.level} - ${rank.name}`;
    if (xpEl) xpEl.textContent = `${this.state.xp}`;
    if (casesEl) casesEl.textContent = `${this.state.completedCases.length}`;

    // Render Badges
    const badgesGrid = document.getElementById("badges-grid-container");
    if (!badgesGrid) return;
    badgesGrid.innerHTML = "";

    BADGES.forEach(badge => {
      const isUnlocked = this.state.unlockedBadges.includes(badge.id);
      const card = document.createElement("div");
      card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
      card.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-info">
          <h4>${badge.name}</h4>
          <p>${badge.desc}</p>
        </div>
      `;
      badgesGrid.appendChild(card);
    });
  }

  checkBadges() {
    let unlockedAny = false;

    // First Case
    if (this.state.completedCases.length >= 1 && !this.state.unlockedBadges.includes("first_case")) {
      this.state.unlockedBadges.push("first_case");
      unlockedAny = true;
    }

    // Iron Core (3 cases completed)
    if (this.state.completedCases.length >= 3 && !this.state.unlockedBadges.includes("iron_core")) {
      this.state.unlockedBadges.push("iron_core");
      unlockedAny = true;
    }

    // Boss Slayer
    if (this.state.completedCases.some(id => id.includes("boss")) && !this.state.unlockedBadges.includes("boss_slayer")) {
      this.state.unlockedBadges.push("boss_slayer");
      unlockedAny = true;
    }

    // Highlighter Pro
    if (this.state.highlighterCount >= 3 && !this.state.unlockedBadges.includes("highlighter_pro")) {
      this.state.unlockedBadges.push("highlighter_pro");
      unlockedAny = true;
    }

    // Dojo Streak
    if (this.state.dojoStreakMax >= 5 && !this.state.unlockedBadges.includes("dojo_streak")) {
      this.state.unlockedBadges.push("dojo_streak");
      unlockedAny = true;
    }

    // Legendary Reader (Arquivo Ômega)
    if (this.state.completedCases.includes("case_6_boss") && !this.state.unlockedBadges.includes("legendary_reader")) {
      this.state.unlockedBadges.push("legendary_reader");
      unlockedAny = true;
    }

    if (unlockedAny) {
      sounds.playBadge();
      this.triggerConfetti();
      this.renderProfile();
      this.saveState();
    }
  }

  // -------------------------------------------------------------
  // MODAL DE EDIÇÃO DE PERFIL DO AGENTE
  // -------------------------------------------------------------
  openAgentEditor() {
    const editor = document.getElementById("agent-editor-modal");
    if (!editor) return;

    document.getElementById("input-agent-name").value = this.state.agentName;
    document.getElementById("input-agent-codename").value = this.state.agentCodename;
    this.selectedTempAvatar = this.state.avatarId;

    const row = document.getElementById("avatar-choices-row");
    if (row) {
      row.innerHTML = AVATARS.map(av => `
        <div class="avatar-select-pill ${av.id === this.state.avatarId ? 'active' : ''}" data-id="${av.id}" title="${av.tag}">
          ${av.svg}
        </div>
      `).join("");

      const pills = row.querySelectorAll(".avatar-select-pill");
      pills.forEach(p => {
        p.addEventListener("click", () => {
          sounds.playClick();
          pills.forEach(x => x.classList.remove("active"));
          p.classList.add("active");
          this.selectedTempAvatar = p.getAttribute("data-id");
        });
      });
    }

    editor.classList.add("open");
  }

  // -------------------------------------------------------------
  // CERTIFICADO DE MÉRITO OFICIAL
  // -------------------------------------------------------------
  openCertificate() {
    const certName = document.getElementById("cert-display-name");
    const certRank = document.getElementById("cert-display-rank");
    const certDate = document.getElementById("cert-display-date");

    const rank = this.getCurrentRank();
    const today = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

    if (certName) certName.textContent = this.state.agentName;
    if (certRank) certRank.textContent = rank.name;
    if (certDate) certDate.textContent = today;

    this.certificateModal.classList.add("open");
  }

  // -------------------------------------------------------------
  // NOTIFICAÇÃO TOAST
  // -------------------------------------------------------------
  showNotification(message, type = "info") {
    let toast = document.getElementById("codice-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "codice-toast";
      toast.style.position = "fixed";
      toast.style.bottom = "25px";
      toast.style.right = "25px";
      toast.style.zIndex = "99999";
      toast.style.padding = "0.9rem 1.5rem";
      toast.style.borderRadius = "var(--radius-md)";
      toast.style.background = "var(--bg-secondary)";
      toast.style.border = "1px solid var(--accent-cyan)";
      toast.style.color = "#fff";
      toast.style.fontSize = "0.9rem";
      toast.style.boxShadow = "var(--shadow-md)";
      toast.style.transition = "all 0.3s ease";
      toast.style.opacity = "0";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
    }, 3500);
  }

  // -------------------------------------------------------------
  // SISTEMA DE CONFETES (CANVAS PURO 60FPS)
  // -------------------------------------------------------------
  initConfetti() {
    this.canvas = document.getElementById("confetti-canvas");
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.confettiParticles = [];
    this.confettiActive = false;

    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  triggerConfetti() {
    if (!this.canvas) return;
    this.confettiParticles = [];
    const colors = ["#00f2fe", "#4facfe", "#c471ed", "#ffd700", "#ff76ac", "#2ecc71"];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        r: Math.random() * 6 + 4,
        dx: (Math.random() - 0.5) * 16,
        dy: (Math.random() - 0.7) * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        life: 1
      });
    }

    if (!this.confettiActive) {
      this.confettiActive = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiActive) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let alive = false;
    this.confettiParticles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.35; // gravity
      p.rotation += p.rotationSpeed;
      p.life -= 0.012;

      if (p.life > 0) {
        alive = true;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.life);
        this.ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 1.4);
        this.ctx.restore();
      }
    });

    if (alive) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.confettiActive = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// Instanciação e Inicialização Global
let codice;
document.addEventListener("DOMContentLoaded", () => {
  codice = new CodiceApp();
  window.codice = codice;
});
