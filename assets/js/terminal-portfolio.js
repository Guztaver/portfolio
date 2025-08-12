// Main Terminal Portfolio Class
// Core terminal functionality and application orchestration

class TerminalPortfolio {
  constructor() {
    // Core elements
    this.input = document.getElementById("terminal-input");
    this.output = document.getElementById("output");

    // Application state
    this.commandHistory = [];
    this.historyIndex = -1;
    this.currentPath = "~";
    this.currentLanguage = "en";

    // Initialize components
    this.translator = new ContentTranslator();
    this.commands = new TerminalCommands(this);
    this.pdfGenerator = new PDFGenerator();

    // Initialize application
    this.init();
  }

  // Initialize the terminal application
  init() {
    this.setupEventListeners();
    this.setupKeyboardHandlers();
    this.setupInitialState();
    this.startWelcomeSequence();
  }

  // Setup all event listeners
  setupEventListeners() {
    // Input handling
    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));
    this.input.focus();

    // Language switcher buttons
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const lang = e.target.getAttribute("data-lang");
        if (lang) {
          this.switchLanguage(lang);
        }
      });
    });

    // Resume download buttons
    document.querySelectorAll(".download-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const lang = e.target.getAttribute("data-resume");
        if (lang) {
          this.downloadResume(lang);
        }
      });
    });

    // Clickable commands
    this.setupClickableCommands();

    // Keep focus on input
    document.addEventListener("click", (e) => {
      // Don't focus input if clicking on a command
      if (
        !e.target.classList.contains("command") &&
        !e.target.classList.contains("cmd")
      ) {
        this.input.focus();
      }
    });
  }

  // Setup clickable commands
  setupClickableCommands() {
    // Setup initial clickable commands
    this.makeCommandsClickable();

    // Observer to make new commands clickable when added dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.makeCommandsClickable(node);
          }
        });
      });
    });

    observer.observe(this.output, {
      childList: true,
      subtree: true,
    });
  }

  // Make command elements clickable
  makeCommandsClickable(container = document) {
    const commandElements = container.querySelectorAll(
      ".command:not([data-clickable]), .cmd:not([data-clickable])",
    );

    commandElements.forEach((element) => {
      element.setAttribute("data-clickable", "true");
      element.style.cursor = "pointer";
      element.style.textDecoration = "underline";

      element.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Extract command text, removing quotes if present
        let commandText = element.textContent.trim();
        commandText = commandText.replace(/^['"`](.+)['"`]$/, "$1");

        // Set the command in the input and execute
        this.input.value = commandText;
        this.executeCommand();

        // Keep focus on input
        this.input.focus();
      });

      // Add hover effect
      element.addEventListener("mouseenter", () => {
        element.style.opacity = "0.8";
      });

      element.addEventListener("mouseleave", () => {
        element.style.opacity = "1";
      });
    });
  }

  // Setup keyboard event handlers
  setupKeyboardHandlers() {
    // Global keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl+L to clear terminal
      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        this.commands.clearTerminal();
      }

      // Ctrl+C to interrupt (just for show)
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        this.appendToOutput('<span class="warning">^C</span>');
        this.input.value = "";
      }
    });
  }

  // Setup initial application state
  setupInitialState() {
    // Set current year in footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Set initial language
    this.translator.setLanguage(this.currentLanguage);
  }

  // Start welcome animation sequence
  startWelcomeSequence() {
    setTimeout(() => {
      this.typeMessage(this.t("messages.welcome"), "success");
      setTimeout(() => {
        this.typeMessage(this.t("messages.helpTip"), "info");
      }, 1000);
    }, 3000);
  }

  // Handle keyboard input
  handleKeyDown(e) {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this.executeCommand();
        break;
      case "ArrowUp":
        e.preventDefault();
        this.navigateHistory(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        this.navigateHistory(1);
        break;
      case "Tab":
        e.preventDefault();
        this.autoComplete();
        break;
    }
  }

  // Execute command from input
  executeCommand() {
    const commandLine = this.input.value.trim();
    if (!commandLine) return;

    // Add to history and display prompt
    this.addToHistory(commandLine);
    this.appendToOutput(
      `<span class="prompt">gustavo@portfolio:${this.currentPath}$</span> ${commandLine}`,
    );

    // Execute command
    this.commands.execute(commandLine);

    // Clear input and scroll
    this.input.value = "";
    this.scrollToBottom();
  }

  // Navigate command history
  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;

    this.historyIndex += direction;

    if (this.historyIndex < 0) {
      this.historyIndex = 0;
    } else if (this.historyIndex >= this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length;
      this.input.value = "";
      return;
    }

    this.input.value = this.commandHistory[this.historyIndex] || "";
  }

  // Auto-complete commands
  autoComplete() {
    const current = this.input.value.toLowerCase();
    const matches = this.commands.getCompletions(current);

    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.appendToOutput(
        `<span class="info">Available completions: ${matches.join(", ")}</span>`,
      );
    }
  }

  // Add command to history
  addToHistory(command) {
    this.commandHistory.push(command);
    this.historyIndex = this.commandHistory.length;
  }

  // Translation helper
  t(key) {
    return this.translator.translate(key);
  }

  // Show content section
  showSection(sectionId) {
    // For Portuguese, try to find language-specific section first
    let targetSectionId = sectionId;
    if (this.currentLanguage === "pt") {
      const ptSectionId = sectionId + "-pt";
      const ptSection = document.getElementById(ptSectionId);
      if (ptSection) {
        targetSectionId = ptSectionId;
      }
    }

    const section = document.getElementById(targetSectionId);
    if (section) {
      let content = section.innerHTML;

      // Only translate content if no language-specific section was found
      if (this.currentLanguage === "pt" && targetSectionId === sectionId) {
        content = this.translator.translateContent(content);
      }

      this.appendToOutput(content);

      // Ensure new content has clickable commands
      this.makeCommandsClickable();
    }
  }

  // Switch language
  switchLanguage(lang) {
    this.currentLanguage = lang;
    this.translator.setLanguage(lang);

    // Update UI elements
    this.updateLanguageUI(lang);
    this.translator.updateWelcomeMessage();

    // Re-apply clickable functionality specifically to welcome message after content update
    setTimeout(() => {
      const welcomeMessage = document.getElementById("welcome-message");
      if (welcomeMessage) {
        this.makeCommandsClickable(welcomeMessage);
      }
    }, 50);

    // Show language switch message
    this.commands.clearTerminal();
    const messages = this.translator.getLanguageSwitchMessage();
    this.appendToOutput(`<span class="success">${messages.switched}</span>`);
    this.appendToOutput(`<span class="info">${messages.info}</span>`);
  }

  // Update language-related UI elements
  updateLanguageUI(lang) {
    // Update active language button
    document
      .querySelectorAll(".lang-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document.getElementById(`lang-${lang}`).classList.add("active");

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }

  // Download resume
  downloadResume(language) {
    const result = this.pdfGenerator.downloadResume(language);

    if (result.success) {
      const message = this.t("messages.downloadingResume").replace(
        "{filename}",
        result.filename,
      );
      this.appendToOutput(`<span class="success">${message}</span>`);
      this.appendToOutput(
        `<span class="info">${this.t("messages.resumeSuccess")}</span>`,
      );
    } else {
      this.appendToOutput(
        '<span class="error">Error generating PDF. Please try again.</span>',
      );
    }
  }

  // Type message with animation
  typeMessage(message, className = "") {
    const messageElement = document.createElement("div");
    messageElement.className = className;
    this.output.appendChild(messageElement);

    let index = 0;
    const typing = setInterval(() => {
      messageElement.textContent += message[index];
      index++;
      if (index >= message.length) {
        clearInterval(typing);
      }
    }, 50);

    this.scrollToBottom();
  }

  // Append content to output
  appendToOutput(content) {
    const line = document.createElement("div");
    line.innerHTML = content;
    this.output.appendChild(line);
    this.scrollToBottom();

    // Make any new commands in the appended content clickable
    this.makeCommandsClickable(line);
  }

  // Scroll terminal to bottom
  scrollToBottom() {
    const terminalBody = document.querySelector(".terminal-body");
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Get current working directory
  getCurrentPath() {
    return this.currentPath;
  }

  // Set current working directory
  setCurrentPath(path) {
    this.currentPath = path;
  }

  // Check if terminal is ready
  isReady() {
    return this.input && this.output && this.translator && this.commands;
  }

  // Cleanup resources (for potential SPA usage)
  destroy() {
    // Remove event listeners
    this.input?.removeEventListener("keydown", this.handleKeyDown);

    // Clear intervals/timeouts if any
    // Clear references
    this.input = null;
    this.output = null;
    this.translator = null;
    this.commands = null;
    this.pdfGenerator = null;
  }

  // Debug helper
  debug() {
    return {
      currentLanguage: this.currentLanguage,
      currentPath: this.currentPath,
      historyLength: this.commandHistory.length,
      isReady: this.isReady(),
      translations: this.translator.validateTranslations(),
    };
  }
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = TerminalPortfolio;
}
