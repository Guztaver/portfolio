// Terminal Portfolio JavaScript with Multi-language Support
class TerminalPortfolio {
  constructor() {
    this.input = document.getElementById("terminal-input");
    this.output = document.getElementById("output");
    this.commandHistory = [];
    this.historyIndex = -1;
    this.currentPath = "~";
    this.currentLanguage = "en";

    // Language translations
    this.translations = {
      en: {
        commands: {
          help: () => this.showSection("help-content"),
          about: () => this.showSection("about-content"),
          experience: () => this.showSection("experience-content"),
          education: () => this.showSection("education-content"),
          skills: () => this.showSection("skills-content"),
          projects: () => this.showSection("projects-content"),
          resume: () => this.showSection("resume-content"),
          contact: () => this.showSection("contact-content"),
          clear: () => this.clearTerminal(),
          whoami: () => this.whoami(),
          ls: () => this.listSections(),
          pwd: () => this.printWorkingDirectory(),
          date: () => this.showDate(),
          uname: () => this.showSystem(),
          cat: (args) => this.catCommand(args),
          echo: (args) => this.echoCommand(args),
          neofetch: () => this.neofetch(),
          sudo: () => this.sudoCommand(),
          exit: () => this.exitCommand(),
          history: () => this.showHistory(),
          tree: () => this.showTree(),
          ps: () => this.showProcesses(),
          top: () => this.showTop(),
          df: () => this.showDiskUsage(),
          free: () => this.showMemory(),
          uptime: () => this.showUptime(),
        },
        messages: {
          welcome: "Welcome to Gustavo's Terminal Portfolio! 🚀",
          helpTip:
            "Type 'help' to see available commands or 'about' to learn more about me.",
          cleared: "Terminal cleared! ✨",
          whoami: "gustavo",
          whoamiDesc:
            "Full Stack Developer | Linux Enthusiast | Problem Solver",
          sections: "Available sections:",
          commandNotFound: "Command not found:",
          helpHint: "Type 'help' to see available commands.",
          usageCat: "Usage: cat [filename]",
          fileNotFound: "cat: {file}: No such file or directory",
          processes: "Active processes:",
          topProcesses: "Top processes by passion usage:",
          memory: "Memory Usage:",
          uptime: "System uptime:",
          uptimeDesc: "Developer uptime: Several years of passion! 🚀",
          niceTry: "Nice try! But this is a portfolio, not a real terminal 😄",
          permissions: "You already have all the permissions you need here!",
          goodbye: "Goodbye! Thanks for visiting my portfolio! 👋",
          jokingExit: "Just kidding! You can't exit from here 😉",
          closeTab: "But feel free to close the tab if you want to leave!",
          commandHistory: "Command History:",
          downloadingResume: "📥 Downloading {filename}...",
          resumeSuccess:
            "Resume downloaded successfully! Check your Downloads folder.",
        },
        content: {
          aboutTitle: "👨‍💻 GUSTAVO MUNIZ - Full Stack Developer",
          aboutBio:
            "With agility and performance in mind, I always aim to create systems that are not only highly efficient but also make life easier for the users who rely on them. With professional experience & years of study, I can swiftly identify errors and resolve them in short timeframes, contributing to the company's growth! I am also a passionate enthusiast of the Linux world!",
          experienceTitle: "💼 WORK EXPERIENCE",
          educationTitle: "🎓 ACADEMIC EDUCATION",
          skillsTitle: "⚡ TECHNICAL SKILLS",
          projectsTitle: "🚀 SIDE PROJECTS",
          resumeTitle: "📄 RESUME",
          contactTitle: "📞 CONTACT INFORMATION",
          helpTitle: "🆘 AVAILABLE COMMANDS",
          comingSoon:
            "🔧 Coming soon! This section will showcase my personal projects and open-source contributions.",
          checkGithub: "In the meantime, check out my GitHub:",
          resumeDesc: "Download my resume in PDF format:",
          downloadEn: "📥 Download English Resume",
          downloadPt: "📥 Download Portuguese Resume",
        },
      },
      pt: {
        commands: {
          ajuda: () => this.showSection("help-content"),
          sobre: () => this.showSection("about-content"),
          experiencia: () => this.showSection("experience-content"),
          educacao: () => this.showSection("education-content"),
          habilidades: () => this.showSection("skills-content"),
          projetos: () => this.showSection("projects-content"),
          curriculo: () => this.showSection("resume-content"),
          contato: () => this.showSection("contact-content"),
          limpar: () => this.clearTerminal(),
          quemSou: () => this.whoami(),
          listar: () => this.listSections(),
          pwd: () => this.printWorkingDirectory(),
          data: () => this.showDate(),
          sistema: () => this.showSystem(),
          ler: (args) => this.catCommand(args),
          eco: (args) => this.echoCommand(args),
          neofetch: () => this.neofetch(),
          sudo: () => this.sudoCommand(),
          sair: () => this.exitCommand(),
          historico: () => this.showHistory(),
          arvore: () => this.showTree(),
          processos: () => this.showProcesses(),
          topo: () => this.showTop(),
          disco: () => this.showDiskUsage(),
          memoria: () => this.showMemory(),
          tempo: () => this.showUptime(),
          // Keep English commands working too
          help: () => this.showSection("help-content"),
          about: () => this.showSection("about-content"),
          experience: () => this.showSection("experience-content"),
          education: () => this.showSection("education-content"),
          skills: () => this.showSection("skills-content"),
          projects: () => this.showSection("projects-content"),
          resume: () => this.showSection("resume-content"),
          contact: () => this.showSection("contact-content"),
          clear: () => this.clearTerminal(),
          whoami: () => this.whoami(),
          ls: () => this.listSections(),
        },
        messages: {
          welcome: "Bem-vindo ao meu portfólio terminal! 🚀",
          helpTip:
            "Digite 'ajuda' para ver os comandos disponíveis ou 'sobre' para saber mais sobre mim.",
          cleared: "Terminal limpo! ✨",
          whoami: "gustavo",
          whoamiDesc:
            "Desenvolvedor Full Stack | Entusiasta Linux | Solucionador de Problemas",
          sections: "Seções disponíveis:",
          commandNotFound: "Comando não encontrado:",
          helpHint: "Digite 'ajuda' para ver os comandos disponíveis.",
          usageCat: "Uso: ler [arquivo]",
          fileNotFound: "ler: {file}: Arquivo ou diretório não encontrado",
          processes: "Processos ativos:",
          topProcesses: "Top processos por uso de paixão:",
          memory: "Uso de Memória:",
          uptime: "Tempo de sistema:",
          uptimeDesc: "Tempo de desenvolvedor: Vários anos de paixão! 🚀",
          niceTry:
            "Boa tentativa! Mas isso é um portfólio, não um terminal real 😄",
          permissions: "Você já tem todas as permissões que precisa aqui!",
          goodbye: "Tchau! Obrigado por visitar meu portfólio! 👋",
          jokingExit: "Brincadeira! Você não pode sair daqui 😉",
          closeTab: "Mas fique à vontade para fechar a aba se quiser sair!",
          commandHistory: "Histórico de Comandos:",
          downloadingResume: "📥 Baixando {filename}...",
          resumeSuccess:
            "Currículo baixado com sucesso! Verifique sua pasta de Downloads.",
        },
        content: {
          aboutTitle: "👨‍💻 GUSTAVO MUNIZ - Desenvolvedor Full Stack",
          aboutBio:
            "Com agilidade e performance em mente, almejo sempre criar sistemas que, além de muito ágeis, facilitam a vida dos usuários que utilizam eles. Com experiência profissional & anos de estudo, posso identificar erros com agilidade e resolver-los em tempos curtos, que podem ajudar no crescimento da empresa! E um entusiasta do mundo Linux!",
          experienceTitle: "💼 EXPERIÊNCIA PROFISSIONAL",
          educationTitle: "🎓 FORMAÇÃO ACADÊMICA",
          skillsTitle: "⚡ HABILIDADES TÉCNICAS",
          projectsTitle: "🚀 PROJETOS PESSOAIS",
          resumeTitle: "📄 CURRÍCULO",
          contactTitle: "📞 INFORMAÇÕES DE CONTATO",
          helpTitle: "🆘 COMANDOS DISPONÍVEIS",
          comingSoon:
            "🔧 Em breve! Esta seção mostrará meus projetos pessoais e contribuições open-source.",
          checkGithub: "Enquanto isso, confira meu GitHub:",
          resumeDesc: "Baixe meu currículo em formato PDF:",
          downloadEn: "📥 Baixar Currículo em Inglês",
          downloadPt: "📥 Baixar Currículo em Português",
        },
      },
    };

    this.init();
  }

  init() {
    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));
    this.input.focus();

    // Set current year
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }

    // Setup event listeners for language buttons
    this.setupEventListeners();

    // Welcome animation
    setTimeout(() => {
      this.typeMessage(this.t("messages.welcome"), "success");
      setTimeout(() => {
        this.typeMessage(this.t("messages.helpTip"), "info");
      }, 1000);
    }, 3000);
  }

  setupEventListeners() {
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
          downloadResume(lang);
        }
      });
    });
  }

  // Translation helper
  t(key) {
    const keys = key.split(".");
    let value = this.translations[this.currentLanguage];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  // Get current commands based on language
  getCurrentCommands() {
    return this.translations[this.currentLanguage].commands;
  }

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
      case "l":
        if (e.ctrlKey) {
          e.preventDefault();
          this.clearTerminal();
        }
        break;
    }
  }

  executeCommand() {
    const commandLine = this.input.value.trim();
    if (!commandLine) return;

    this.addToHistory(commandLine);
    this.appendToOutput(
      `<span class="prompt">gustavo@portfolio:${this.currentPath}$</span> ${commandLine}`,
    );

    const [command, ...args] = commandLine.split(" ");
    const lowerCommand = command.toLowerCase();

    const commands = this.getCurrentCommands();

    if (commands[lowerCommand]) {
      try {
        commands[lowerCommand](args);
      } catch (error) {
        this.appendToOutput(
          `<span class="error">Error executing command: ${error.message}</span>`,
        );
      }
    } else {
      this.appendToOutput(
        `<span class="error">${this.t("messages.commandNotFound")} ${command}</span>`,
      );
      this.appendToOutput(
        `<span class="info">${this.t("messages.helpHint")}</span>`,
      );
    }

    this.input.value = "";
    this.scrollToBottom();
  }

  showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      let content = section.innerHTML;

      // Replace content based on current language
      if (this.currentLanguage === "pt") {
        content = this.translateContent(content);
      }

      this.appendToOutput(content);
    }
  }

  translateContent(content) {
    // Translate section titles and content
    const translations = {
      "👨‍💻 GUSTAVO MUNIZ - Full Stack Developer":
        "👨‍💻 GUSTAVO MUNIZ - Desenvolvedor Full Stack",
      "💼 WORK EXPERIENCE": "💼 EXPERIÊNCIA PROFISSIONAL",
      "🎓 ACADEMIC EDUCATION": "🎓 FORMAÇÃO ACADÊMICA",
      "⚡ TECHNICAL SKILLS": "⚡ HABILIDADES TÉCNICAS",
      "🚀 SIDE PROJECTS": "🚀 PROJETOS PESSOAIS",
      "📄 RESUME": "📄 CURRÍCULO",
      "📞 CONTACT INFORMATION": "📞 INFORMAÇÕES DE CONTATO",
      "🆘 AVAILABLE COMMANDS": "🆘 COMANDOS DISPONÍVEIS",
      "Support and Development Analyst":
        "Analista de Suporte e Desenvolvimento",
      "Full Stack Developer": "Desenvolvedor Full Stack",
      "Speaker - Workshops": "Palestrante - Workshops",
      "Information Systems": "Sistemas de Informação",
      "Native Mobile Development": "Desenvolvimento Mobile Nativo",
      Backend: "Backend",
      Frontend: "Frontend",
      "DevOps & Tools": "DevOps & Ferramentas",
      "Phone:": "Telefone:",
      "Email:": "E-mail:",
      "Website:": "Website:",
      "Download my resume in PDF format:":
        "Baixe meu currículo em formato PDF:",
      "📥 Download English Resume": "📥 Baixar Currículo em Inglês",
      "📥 Download Portuguese Resume": "📥 Baixar Currículo em Português",
      "Show this help message": "Mostrar esta mensagem de ajuda",
      "Learn about me and my background":
        "Saber mais sobre mim e minha experiência",
      "View my work experience": "Ver minha experiência profissional",
      "View my academic background": "Ver minha formação acadêmica",
      "See my technical skills": "Ver minhas habilidades técnicas",
      "View my side projects": "Ver meus projetos pessoais",
      "Download my resume": "Baixar meu currículo",
      "Get my contact information": "Obter minhas informações de contato",
      "Clear the terminal": "Limpar o terminal",
      "Display current user": "Mostrar usuário atual",
      "List available sections": "Listar seções disponíveis",
    };

    let translatedContent = content;

    // Replace English experience content with Portuguese
    if (content.includes("Allied with development tools")) {
      translatedContent = translatedContent.replace(
        "Allied with development tools (Laravel, Symfony, Golang, C#), I identified structural problems in the city hall, and developed applications to help manage, control and facilitate public management through software! In addition to maintaining servers and workstations.",
        "Aliado as ferramentas de desenvolvimento (Laravel, Symfony, Golang, C#), identifiquei problemas estruturais na prefeitura, e desenvolvi aplicativos para ajudar a gerir, controlar e facilitar a gestão pública através de software! Além de dar manutenção em servidores e workstations.",
      );
    }

    if (content.includes("Using technologies like Symfony")) {
      translatedContent = translatedContent.replace(
        "Using technologies like Symfony aligned with Twig, I build systems to help small businesses streamline and centralize their internal processes, simplifying the daily tasks of administrators and consolidating their team data into a single platform.",
        "Com tecnologias como Symfony alinhadas ao Twig, construo sistemas para que empresas pequenas possam agilizar e centralizar os seus processos internos, facilitando a vida dos administradores e centralizando os dados das suas equipes em uma única plataforma.",
      );
    }

    if (content.includes("Whether the topic is AI")) {
      translatedContent = translatedContent.replace(
        "Whether the topic is AI, development, infrastructure (infra), or automation, delivering talks on these subjects is a strong suit. These sessions can help internal teams onboard with new technologies and work more agilely, achieving high performance.",
        "Seja o assunto IAs, desenvolvimento, infra ou automação, palestras dessas assuntos são um forte, podendo ajudar equipes internas a se introduzirem com uma nova tecnologia e trabalhar de forma mais ágil e com ótima performance.",
      );
    }

    // Replace about bio
    if (content.includes("With agility and performance in mind")) {
      translatedContent = translatedContent.replace(
        "With agility and performance in mind, I always aim to create systems that are not only highly efficient but also make life easier for the users who rely on them. With professional experience & years of study, I can swiftly identify errors and resolve them in short timeframes, contributing to the company's growth! I am also a passionate enthusiast of the Linux world!",
        "Com agilidade e performance em mente, almejo sempre criar sistemas que, além de muito ágeis, facilitam a vida dos usuários que utilizam eles. Com experiência profissional & anos de estudo, posso identificar erros com agilidade e resolver-los em tempos curtos, que podem ajudar no crescimento da empresa! E um entusiasta do mundo Linux!",
      );
    }

    // Replace coming soon message
    if (content.includes("Coming soon! This section")) {
      translatedContent = translatedContent.replace(
        "🔧 Coming soon! This section will showcase my personal projects and open-source contributions.",
        "🔧 Em breve! Esta seção mostrará meus projetos pessoais e contribuições open-source.",
      );
    }

    if (content.includes("In the meantime, check out")) {
      translatedContent = translatedContent.replace(
        "In the meantime, check out my GitHub:",
        "Enquanto isso, confira meu GitHub:",
      );
    }

    // Apply other translations
    Object.entries(translations).forEach(([en, pt]) => {
      translatedContent = translatedContent.replace(new RegExp(en, "g"), pt);
    });

    return translatedContent;
  }

  clearTerminal() {
    this.output.innerHTML = "";
    this.appendToOutput(
      `<span class="success">${this.t("messages.cleared")}</span>`,
    );
  }

  whoami() {
    this.appendToOutput(
      `<span class="info">${this.t("messages.whoami")}</span>`,
    );
    this.appendToOutput(
      `<span class="success">${this.t("messages.whoamiDesc")}</span>`,
    );
  }

  listSections() {
    const sections =
      this.currentLanguage === "pt"
        ? [
            "sobre.md",
            "experiencia.md",
            "educacao.md",
            "habilidades.md",
            "projetos.md",
            "curriculo.pdf",
            "contato.txt",
          ]
        : [
            "about.md",
            "experience.md",
            "education.md",
            "skills.md",
            "projects.md",
            "resume.pdf",
            "contact.txt",
          ];

    this.appendToOutput(
      `<span class="info">${this.t("messages.sections")}</span>`,
    );
    sections.forEach((section) => {
      const icon = section.includes(".pdf")
        ? "📄"
        : section.includes(".txt")
          ? "📝"
          : "📁";
      this.appendToOutput(`${icon} ${section}`);
    });
  }

  printWorkingDirectory() {
    this.appendToOutput(`<span class="info">/home/gustavo/portfolio</span>`);
  }

  showDate() {
    const now = new Date();
    const locale = this.currentLanguage === "pt" ? "pt-BR" : "en-US";
    this.appendToOutput(
      `<span class="info">${now.toLocaleString(locale)}</span>`,
    );
  }

  showSystem() {
    this.appendToOutput(
      '<span class="info">Linux portfolio-server 5.4.0-portfolio #1 SMP Web Terminal x86_64 GNU/Linux</span>',
    );
  }

  catCommand(args) {
    if (!args || args.length === 0) {
      this.appendToOutput(
        `<span class="error">${this.t("messages.usageCat")}</span>`,
      );
      return;
    }

    const file = args[0].toLowerCase();
    const fileMap =
      this.currentLanguage === "pt"
        ? {
            "sobre.md": "about-content",
            "experiencia.md": "experience-content",
            "educacao.md": "education-content",
            "habilidades.md": "skills-content",
            "projetos.md": "projects-content",
            "contato.txt": "contact-content",
            // Keep English files working
            "about.md": "about-content",
            "experience.md": "experience-content",
            "education.md": "education-content",
            "skills.md": "skills-content",
            "projects.md": "projects-content",
            "contact.txt": "contact-content",
          }
        : {
            "about.md": "about-content",
            "experience.md": "experience-content",
            "education.md": "education-content",
            "skills.md": "skills-content",
            "projects.md": "projects-content",
            "contact.txt": "contact-content",
          };

    if (fileMap[file]) {
      this.showSection(fileMap[file]);
    } else {
      this.appendToOutput(
        `<span class="error">${this.t("messages.fileNotFound").replace("{file}", file)}</span>`,
      );
    }
  }

  echoCommand(args) {
    if (args && args.length > 0) {
      this.appendToOutput(`<span class="info">${args.join(" ")}</span>`);
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
    this.appendToOutput(neofetchOutput);
  }

  sudoCommand() {
    this.appendToOutput(
      `<span class="error">${this.t("messages.niceTry")}</span>`,
    );
    this.appendToOutput(
      `<span class="info">${this.t("messages.permissions")}</span>`,
    );
  }

  exitCommand() {
    this.appendToOutput(
      `<span class="warning">${this.t("messages.goodbye")}</span>`,
    );
    setTimeout(() => {
      this.appendToOutput(
        `<span class="info">${this.t("messages.jokingExit")}</span>`,
      );
      this.appendToOutput(
        `<span class="info">${this.t("messages.closeTab")}</span>`,
      );
    }, 1000);
  }

  showHistory() {
    this.appendToOutput(
      `<span class="info">${this.t("messages.commandHistory")}</span>`,
    );
    this.commandHistory.forEach((cmd, index) => {
      this.appendToOutput(`<span class="info">${index + 1}  ${cmd}</span>`);
    });
  }

  showTree() {
    const tree =
      this.currentLanguage === "pt"
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
    this.appendToOutput(`<span class="info">${tree}</span>`);
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

    this.appendToOutput(
      `<span class="info">${this.t("messages.processes")}</span>`,
    );
    processes.forEach((process) => {
      this.appendToOutput(`<span class="info">${process}</span>`);
    });
  }

  showTop() {
    this.appendToOutput(
      `<span class="info">${this.t("messages.topProcesses")}</span>`,
    );
    this.appendToOutput(
      '<span class="success">85.2% - Backend Development</span>',
    );
    this.appendToOutput(
      '<span class="success">12.1% - Learning New Technologies</span>',
    );
    this.appendToOutput('<span class="success">2.5% - Coffee Breaks</span>');
    this.appendToOutput('<span class="success">0.2% - Sleeping</span>');
  }

  showDiskUsage() {
    this.appendToOutput(
      '<span class="info">Filesystem     Size  Used Avail Use%</span>',
    );
    this.appendToOutput(
      '<span class="info">/dev/brain     ∞TB   95%   ∞TB  95% Knowledge</span>',
    );
    this.appendToOutput(
      '<span class="info">/dev/passion   ∞TB   100%  ∞TB  100% Projects</span>',
    );
    this.appendToOutput(
      '<span class="info">/dev/coffee    1GB   85%   150MB 85% Energy</span>',
    );
  }

  showMemory() {
    this.appendToOutput(
      `<span class="info">${this.t("messages.memory")}</span>`,
    );
    this.appendToOutput('<span class="success">Total:     ∞ GB</span>');
    this.appendToOutput(
      '<span class="success">Used:      95% (Programming Knowledge)</span>',
    );
    this.appendToOutput(
      '<span class="success">Free:      5% (Available for new learning)</span>',
    );
    this.appendToOutput(
      '<span class="success">Cached:    ∞ GB (Experience)</span>',
    );
  }

  showUptime() {
    this.appendToOutput(
      `<span class="info">${this.t("messages.uptime")} ${this.getUptime()}</span>`,
    );
    this.appendToOutput(
      `<span class="success">${this.t("messages.uptimeDesc")}</span>`,
    );
  }

  getUptime() {
    const start = new Date("2020-01-01"); // Approximate career start
    const now = new Date();
    const diff = now - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days, ${Math.floor(days / 365)} years of coding`;
  }

  addToHistory(command) {
    this.commandHistory.push(command);
    this.historyIndex = this.commandHistory.length;
  }

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

  autoComplete() {
    const current = this.input.value.toLowerCase();
    const commands = Object.keys(this.getCurrentCommands());
    const matches = commands.filter((cmd) => cmd.startsWith(current));

    if (matches.length === 1) {
      this.input.value = matches[0];
    } else if (matches.length > 1) {
      this.appendToOutput(
        `<span class="info">Available completions: ${matches.join(", ")}</span>`,
      );
    }
  }

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

  appendToOutput(content) {
    const line = document.createElement("div");
    line.innerHTML = content;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  scrollToBottom() {
    const terminalBody = document.querySelector(".terminal-body");
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Language switching method
  switchLanguage(lang) {
    this.currentLanguage = lang;

    // Update active language button
    document
      .querySelectorAll(".lang-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document.getElementById(`lang-${lang}`).classList.add("active");

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update welcome message
    this.updateWelcomeMessage();

    // Clear terminal and show language switch message
    this.clearTerminal();
    if (lang === "pt") {
      this.appendToOutput(
        '<span class="success">Idioma alterado para Português! 🇧🇷</span>',
      );
      this.appendToOutput(
        '<span class="info">Agora você pode usar comandos em português como "ajuda", "sobre", "experiencia", etc.</span>',
      );
    } else {
      this.appendToOutput(
        '<span class="success">Language switched to English! 🇺🇸</span>',
      );
      this.appendToOutput(
        '<span class="info">You can now use English commands like "help", "about", "experience", etc.</span>',
      );
    }
  }

  updateWelcomeMessage() {
    const welcomeEl = document.getElementById("welcome-message");
    if (welcomeEl) {
      const elements = welcomeEl.querySelectorAll("[data-en][data-pt]");
      elements.forEach((el) => {
        const text =
          this.currentLanguage === "pt"
            ? el.getAttribute("data-pt")
            : el.getAttribute("data-en");

        // Always use innerHTML to preserve formatting, and properly handle command highlights
        if (this.currentLanguage === "pt") {
          if (text.includes("'ajuda'") || text.includes("'sobre'")) {
            el.innerHTML = text
              .replace(/'ajuda'/g, "<span class='command'>'ajuda'</span>")
              .replace(/'sobre'/g, "<span class='command'>'sobre'</span>");
          } else {
            el.innerHTML = text;
          }
        } else {
          if (text.includes("'help'") || text.includes("'about'")) {
            el.innerHTML = text
              .replace(/'help'/g, "<span class='command'>'help'</span>")
              .replace(/'about'/g, "<span class='command'>'about'</span>");
          } else {
            el.innerHTML = text;
          }
        }
      });
    }
  }
}

// PDF Generation Functions
function downloadResume(language) {
  const filename =
    language === "en"
      ? "Gustavo_Muniz_Resume_EN.pdf"
      : "Gustavo_Muniz_Resume_PT.pdf";

  // Create PDF content based on language
  const resumeContent =
    language === "en"
      ? getEnglishResumeContent()
      : getPortugueseResumeContent();

  // Generate PDF using browser's print functionality
  generatePDF(resumeContent, filename);

  // Add terminal output
  const terminal = window.terminalApp;
  if (terminal) {
    const message = terminal
      .t("messages.downloadingResume")
      .replace("{filename}", filename);
    terminal.appendToOutput(`<span class="success">${message}</span>`);
    terminal.appendToOutput(
      `<span class="info">${terminal.t("messages.resumeSuccess")}</span>`,
    );
  }
}

function getEnglishResumeContent() {
  return {
    title: "GUSTAVO MUNIZ - Full Stack Developer",
    sections: {
      profile: {
        title: "PROFESSIONAL PROFILE",
        content:
          "With agility and performance in mind, I always aim to create systems that are not only highly efficient but also make life easier for the users who rely on them. With professional experience & years of study, I can swiftly identify errors and resolve them in short timeframes, contributing to the company's growth! I am also a passionate enthusiast of the Linux world!",
      },
      contact: {
        title: "CONTACT",
        content: [
          "(73) 981155999",
          "contact@gustavoanjos.com",
          "https://gustavoanjos.com",
          "https://github.com/guztaver",
          "https://linkedin.com/in/gustavo404",
        ],
      },
      experience: {
        title: "WORK EXPERIENCE",
        items: [
          {
            period: "2025 - CURRENT",
            company: "PREFEITURA DE PAU BRASIL",
            position: "Support and Development Analyst",
            description:
              "Allied with development tools (Laravel, Symfony, Golang, C#), I identified structural problems in the city hall, and developed applications to help manage, control and facilitate public management through software! In addition to maintaining servers and workstations.",
          },
          {
            period: "2024 - 2025",
            company: "WEMIND GROUP",
            position: "Full Stack Developer",
            description:
              "Using technologies like Symfony aligned with Twig, I build systems to help small businesses streamline and centralize their internal processes, simplifying the daily tasks of administrators and consolidating their team data into a single platform.",
          },
          {
            period: "2025",
            company: "ACADEMIC PRESENTATIONS",
            position: "Speaker - Workshops",
            description:
              "Whether the topic is AI, development, infrastructure (infra), or automation, delivering talks on these subjects is a strong suit. These sessions can help internal teams onboard with new technologies and work more agilely, achieving high performance.",
          },
        ],
      },
      education: {
        title: "ACADEMIC EDUCATION",
        items: [
          {
            period: "2023 - 2027",
            institution: "UNIVERSITY OF EXCELLENCE - UNEX",
            course: "Information Systems",
          },
          {
            period: "2020",
            institution: "SENAC",
            course: "Native Mobile Development",
          },
        ],
      },
    },
  };
}

function getPortugueseResumeContent() {
  return {
    title: "GUSTAVO MUNIZ - Desenvolvedor Full Stack",
    sections: {
      profile: {
        title: "OBJETIVOS",
        content:
          "Com agilidade e performance em mente, almejo sempre criar sistemas que, além de muito ágeis, facilitam a vida dos usuários que utilizam eles. Com experiência profissional & anos de estudo, posso identificar erros com agilidade e resolver-los em tempos curtos, que podem ajudar no crescimento da empresa! E um entusiasta do mundo Linux!",
      },
      contact: {
        title: "CONTATO",
        content: [
          "(73) 981155999",
          "contact@gustavoanjos.com",
          "https://gustavoanjos.com",
          "https://github.com/guztaver",
          "https://linkedin.com/in/gustavo404",
        ],
      },
      experience: {
        title: "EXPERIÊNCIAS",
        items: [
          {
            period: "2025 - ATUAL",
            company: "PREFEITURA DE PAU BRASIL",
            position: "Analista de Suporte e Desenvolvimento",
            description:
              "Aliado as ferramentas de desenvolvimento (Laravel, Symfony, Golang, C#), identifiquei problemas estruturais na prefeitura, e desenvolvi aplicativos para ajudar a gerir, controlar e facilitar a gestão pública através de software! Além de dar manutenção em servidores e workstations.",
          },
          {
            period: "2024 - 2025",
            company: "WEMIND GROUP",
            position: "Desenvolvedor Full Stack",
            description:
              "Com tecnologias como Symfony alinhadas ao Twig, construo sistemas para que empresas pequenas possam agilizar e centralizar os seus processos internos, facilitando a vida dos administradores e centralizando os dados das suas equipes em uma única plataforma.",
          },
          {
            period: "2025",
            company: "DIVERSAS PALESTRAS ACADÊMICAS",
            position: "Palestrante",
            description:
              "Seja o assunto IAs, desenvolvimento, infra ou automação, palestras dessas assuntos são um forte, podendo ajudar equipes internas a se introduzirem com uma nova tecnologia e trabalhar de forma mais ágil e com ótima performance.",
          },
        ],
      },
      education: {
        title: "FORMAÇÃO",
        items: [
          {
            period: "2023 - 2027",
            institution: "FACULDADE DE EXCELÊNCIA - UNEX",
            course: "Sistemas de Informação",
          },
          {
            period: "2020",
            institution: "SENAC",
            course: "Desenvolvimento de Aplicativos Mobile - Nativo",
          },
        ],
      },
    },
  };
}

function generatePDF(content, filename) {
  // Create a new window for PDF generation
  const printWindow = window.open("", "_blank");

  const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${content.title}</title>
            <style>
                @media print {
                    body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; margin: 20px; }
                    h1 { color: #333; font-size: 18px; text-align: center; margin-bottom: 20px; }
                    h2 { color: #555; font-size: 14px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 20px; }
                    h3 { color: #666; font-size: 13px; margin-bottom: 5px; }
                    .contact-info { text-align: center; margin-bottom: 20px; }
                    .contact-info p { margin: 2px 0; }
                    .experience-item, .education-item { margin-bottom: 15px; }
                    .period { font-weight: bold; color: #333; }
                    .company { font-weight: bold; color: #555; }
                    .position { font-style: italic; color: #666; }
                    .description { margin-top: 5px; text-align: justify; }
                    .profile { background: #f9f9f9; padding: 10px; border-left: 4px solid #333; margin-bottom: 20px; text-align: justify; }
                }
                body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; margin: 20px; }
                h1 { color: #333; font-size: 18px; text-align: center; margin-bottom: 20px; }
                h2 { color: #555; font-size: 14px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 20px; }
                h3 { color: #666; font-size: 13px; margin-bottom: 5px; }
                .contact-info { text-align: center; margin-bottom: 20px; }
                .contact-info p { margin: 2px 0; }
                .experience-item, .education-item { margin-bottom: 15px; }
                .period { font-weight: bold; color: #333; }
                .company { font-weight: bold; color: #555; }
                .position { font-style: italic; color: #666; }
                .description { margin-top: 5px; text-align: justify; }
                .profile { background: #f9f9f9; padding: 10px; border-left: 4px solid #333; margin-bottom: 20px; text-align: justify; }
            </style>
        </head>
        <body>
            <h1>${content.title}</h1>

            <div class="contact-info">
                ${content.sections.contact.content.map((item) => `<p>${item}</p>`).join("")}
            </div>

            <h2>${content.sections.profile.title}</h2>
            <div class="profile">${content.sections.profile.content}</div>

            <h2>${content.sections.experience.title}</h2>
            ${content.sections.experience.items
              .map(
                (item) => `
                <div class="experience-item">
                    <div class="period">${item.period} | <span class="company">${item.company}</span></div>
                    <div class="position">${item.position}</div>
                    <div class="description">${item.description}</div>
                </div>
            `,
              )
              .join("")}

            <h2>${content.sections.education.title}</h2>
            ${content.sections.education.items
              .map(
                (item) => `
                <div class="education-item">
                    <div class="period">${item.period} | <span class="company">${item.institution}</span></div>
                    <div class="position">${item.course}</div>
                </div>
            `,
              )
              .join("")}
        </body>
        </html>
    `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to load, then print
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    setTimeout(() => {
      printWindow.close();
    }, 1000);
  }, 500);
}

// Global function for language switching (for backwards compatibility)
window.switchLanguage = function (lang) {
  if (window.terminalApp) {
    window.terminalApp.switchLanguage(lang);
  }
};

// Global function for resume download (for backwards compatibility)
window.downloadResume = downloadResume;

// Initialize terminal when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Remove flash of unstyled content
  setTimeout(() => {
    document.documentElement.classList.add("loaded");
  }, 100);

  // Initialize terminal
  window.terminalApp = new TerminalPortfolio();
});

// Also handle window load for font loading
window.addEventListener("load", () => {
  document.documentElement.classList.add("loaded");
});

// Console message for curious developers
console.log(`
 ██████  ██    ██ ███████ ████████  █████  ██    ██  ██████
██       ██    ██ ██         ██    ██   ██ ██    ██ ██    ██
██   ███ ██    ██ ███████    ██    ███████ ██    ██ ██    ██
██    ██ ██    ██      ██    ██    ██   ██  ██  ██  ██    ██
 ██████   ██████  ███████    ██    ██   ██   ████    ██████

Hey there, curious developer! 👋
Nice to see you checking out the console!
If you're reading this, you might be the kind of person I'd love to work with.
Feel free to reach out: contact@gustavoanjos.com

Built with ❤️ and lots of ☕ by Gustavo Muniz
`);
