// Terminal Commands Handler
// Manages all terminal command implementations

class TerminalCommands {
  constructor(terminal) {
    this.terminal = terminal;
  }

  // Get current command mappings based on language
  getCommandMap() {
    const currentLang = this.terminal.currentLanguage;
    const commands = {};

    // Map command names to their functions
    Object.keys(translations[currentLang].commands).forEach((cmd) => {
      const action = translations[currentLang].commands[cmd];

      switch (action) {
        case "help-content":
          commands[cmd] = () => this.terminal.showSection("help-content");
          break;
        case "about-content":
          commands[cmd] = () => this.terminal.showSection("about-content");
          break;
        case "experience-content":
          commands[cmd] = () => this.terminal.showSection("experience-content");
          break;
        case "education-content":
          commands[cmd] = () => this.terminal.showSection("education-content");
          break;
        case "skills-content":
          commands[cmd] = () => this.terminal.showSection("skills-content");
          break;
        case "projects-content":
          commands[cmd] = () => this.terminal.showSection("projects-content");
          break;
        case "resume-content":
          commands[cmd] = () => this.terminal.showSection("resume-content");
          break;
        case "contact-content":
          commands[cmd] = () => this.terminal.showSection("contact-content");
          break;
        case "clear":
          commands[cmd] = () => this.clearTerminal();
          break;
        case "whoami":
          commands[cmd] = () => this.whoami();
          break;
        case "ls":
          commands[cmd] = () => this.listSections();
          break;
        case "pwd":
          commands[cmd] = () => this.printWorkingDirectory();
          break;
        case "date":
          commands[cmd] = () => this.showDate();
          break;
        case "uname":
          commands[cmd] = () => this.showSystem();
          break;
        case "cat":
          commands[cmd] = (args) => this.catCommand(args);
          break;
        case "echo":
          commands[cmd] = (args) => this.echoCommand(args);
          break;
        case "neofetch":
          commands[cmd] = () => this.neofetch();
          break;
        case "sudo":
          commands[cmd] = () => this.sudoCommand();
          break;
        case "exit":
          commands[cmd] = () => this.exitCommand();
          break;
        case "history":
          commands[cmd] = () => this.showHistory();
          break;
        case "tree":
          commands[cmd] = () => this.showTree();
          break;
        case "ps":
          commands[cmd] = () => this.showProcesses();
          break;
        case "top":
          commands[cmd] = () => this.showTop();
          break;
        case "df":
          commands[cmd] = () => this.showDiskUsage();
          break;
        case "free":
          commands[cmd] = () => this.showMemory();
          break;
        case "uptime":
          commands[cmd] = () => this.showUptime();
          break;
      }
    });

    return commands;
  }

  // Execute a command
  execute(commandLine) {
    const [command, ...args] = commandLine.split(" ");
    const lowerCommand = command.toLowerCase();
    const commands = this.getCommandMap();

    if (commands[lowerCommand]) {
      try {
        commands[lowerCommand](args);
      } catch (error) {
        this.terminal.appendToOutput(
          `<span class="error">Error executing command: ${error.message}</span>`,
        );
      }
    } else {
      this.terminal.appendToOutput(
        `<span class="error">${this.terminal.t("messages.commandNotFound")} ${command}</span>`,
      );
    }
  }

  // Command implementations
  clearTerminal() {
    this.terminal.output.innerHTML = "";
    this.terminal.appendToOutput(
      `<span class="success">${this.terminal.t("messages.cleared")}</span>`,
    );
  }

  whoami() {
    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.whoami")}</span>`,
    );
    this.terminal.appendToOutput(
      `<span class="success">${this.terminal.t("messages.whoamiDesc")}</span>`,
    );
  }

  listSections() {
    const currentLang = this.terminal.currentLanguage;
    const sections = translations[currentLang].fileList;

    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.sections")}</span>`,
    );
    sections.forEach((section) => {
      const icon = section.includes(".pdf")
        ? "📄"
        : section.includes(".txt")
          ? "📝"
          : "📁";
      this.terminal.appendToOutput(`${icon} ${section}`);
    });
  }

  printWorkingDirectory() {
    this.terminal.appendToOutput(
      `<span class="info">/home/gustavo/portfolio</span>`,
    );
  }

  showDate() {
    const now = new Date();
    const locale = this.terminal.currentLanguage === "pt" ? "pt-BR" : "en-US";
    this.terminal.appendToOutput(
      `<span class="info">${now.toLocaleString(locale)}</span>`,
    );
  }

  showSystem() {
    this.terminal.appendToOutput(
      '<span class="info">Linux portfolio-server 5.4.0-portfolio #1 SMP Web Terminal x86_64 GNU/Linux</span>',
    );
  }

  catCommand(args) {
    if (!args || args.length === 0) {
      this.terminal.appendToOutput(
        `<span class="error">Usage: <span class="command">cat</span> &lt;filename&gt;</span>`,
      );
      this.terminal.appendToOutput(
        `<span class="info">Example: <span class="command">cat about.md</span></span>`,
      );
      return;
    }

    const file = args[0].toLowerCase();
    const currentLang = this.terminal.currentLanguage;
    const fileMap = translations[currentLang].files;

    if (fileMap[file]) {
      this.terminal.showSection(fileMap[file]);
    } else {
      this.terminal.appendToOutput(
        `<span class="error">${this.terminal.t("messages.fileNotFound").replace("{file}", file)}</span>`,
      );
      this.terminal.appendToOutput(
        `<span class="info">Try <span class="command">ls</span> to see available files</span>`,
      );
    }
  }

  echoCommand(args) {
    if (args && args.length > 0) {
      this.terminal.appendToOutput(
        `<span class="info">${args.join(" ")}</span>`,
      );
    }
  }

  neofetch() {
    const neofetchOutput = `
<span class="success">                    gustavo@portfolio</span>
<span class="success">                    -----------------</span>
<span class="info">OS:</span> Portfolio Linux x86_64
<span class="info">Host:</span> Terminal Portfolio
<span class="info">Kernel:</span> 5.4.0-portfolio
<span class="info">Uptime:</span> ${this.getUptime()}
<span class="info">Packages:</span> experience, skills, projects
<span class="info">Shell:</span> bash 5.0.17
<span class="info">Terminal:</span> web-terminal
<span class="info">CPU:</span> Coffee-powered Developer Brain
<span class="info">Memory:</span> ∞ curiosity / ∞ passion
<span class="info">Disk:</span> Unlimited potential
<span class="info">Local IP:</span> 127.0.0.1 (home)
<span class="info">Favorite OS:</span> <span class="success">Fedora</span>
        `;
    this.terminal.appendToOutput(neofetchOutput);
  }

  sudoCommand() {
    this.terminal.appendToOutput(
      `<span class="error">${this.terminal.t("messages.niceTry")}</span>`,
    );
    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.permissions")}</span>`,
    );
  }

  exitCommand() {
    this.terminal.appendToOutput(
      `<span class="warning">${this.terminal.t("messages.goodbye")}</span>`,
    );
    setTimeout(() => {
      this.terminal.appendToOutput(
        `<span class="info">${this.terminal.t("messages.jokingExit")}</span>`,
      );
      this.terminal.appendToOutput(
        `<span class="info">${this.terminal.t("messages.closeTab")}</span>`,
      );
      this.terminal.appendToOutput(
        `<span class="info">Or try <span class="command">clear</span> to start fresh!</span>`,
      );
    }, 1000);
  }

  showHistory() {
    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.commandHistory")}</span>`,
    );
    this.terminal.commandHistory.forEach((cmd, index) => {
      this.terminal.appendToOutput(
        `<span class="info">${index + 1}  ${cmd}</span>`,
      );
    });
  }

  showTree() {
    const currentLang = this.terminal.currentLanguage;
    const tree =
      currentLang === "pt"
        ? `
portfolio/
├── sobre.md
├── experiencia.md
├── educacao.md
├── habilidades.md
├── projetos.md
├── curriculo.pdf
└── contato.txt
        `
        : `
portfolio/
├── about.md
├── experience.md
├── education.md
├── skills.md
├── projects.md
├── resume.pdf
└── contact.txt
        `;
    this.terminal.appendToOutput(`<span class="info">${tree}</span>`);
  }

  showProcesses() {
    const processes = [
      "PID  TTY      TIME CMD",
      "1    pts/0    00:00:01 passion",
      "2    pts/0    00:00:05 coding",
      "3    pts/0    00:00:10 learning",
      "4    pts/0    00:00:02 coffee-drinking",
      "5    pts/0    00:00:01 problem-solving",
    ];

    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.processes")}</span>`,
    );
    processes.forEach((process) => {
      this.terminal.appendToOutput(`<span class="info">${process}</span>`);
    });
  }

  showTop() {
    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.topProcesses")}</span>`,
    );
    this.terminal.appendToOutput(
      '<span class="success">85.2% - Backend Development</span>',
    );
    this.terminal.appendToOutput(
      '<span class="success">12.1% - Learning New Technologies</span>',
    );
    this.terminal.appendToOutput(
      '<span class="success">2.5% - Coffee Breaks</span>',
    );
    this.terminal.appendToOutput(
      '<span class="success">0.2% - Sleeping</span>',
    );
  }

  showDiskUsage() {
    this.terminal.appendToOutput(
      '<span class="info">Filesystem     Size  Used Avail Use%</span>',
    );
    this.terminal.appendToOutput(
      '<span class="info">/dev/brain     ∞TB   95%   ∞TB  95% Knowledge</span>',
    );
    this.terminal.appendToOutput(
      '<span class="info">/dev/passion   ∞TB   100%  ∞TB  100% Projects</span>',
    );
    this.terminal.appendToOutput(
      '<span class="info">/dev/coffee    1GB   85%   150MB 85% Energy</span>',
    );
  }

  showMemory() {
    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.memory")}</span>`,
    );
    this.terminal.appendToOutput(
      '<span class="success">Total:     ∞ GB</span>',
    );
    this.terminal.appendToOutput(
      '<span class="success">Used:      95% (Programming Knowledge)</span>',
    );
    this.terminal.appendToOutput(
      '<span class="success">Free:      5% (Available for new learning)</span>',
    );
    this.terminal.appendToOutput(
      '<span class="success">Cached:    ∞ GB (Experience)</span>',
    );
  }

  showUptime() {
    this.terminal.appendToOutput(
      `<span class="info">${this.terminal.t("messages.uptime")} ${this.getUptime()}</span>`,
    );
    this.terminal.appendToOutput(
      `<span class="success">${this.terminal.t("messages.uptimeDesc")}</span>`,
    );
  }

  getUptime() {
    const start = new Date("2020-01-01"); // Approximate career start
    const now = new Date();
    const diff = now - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days, ${Math.floor(days / 365)} years of coding`;
  }

  // Auto-completion helper
  getCompletions(partial) {
    const commands = Object.keys(this.getCommandMap());
    return commands.filter((cmd) => cmd.startsWith(partial.toLowerCase()));
  }
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = TerminalCommands;
}
