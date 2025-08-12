import { useState, useCallback, useRef, useEffect } from "react";
import type {
  TerminalLine,
  TerminalState,
  CommandResult,
  Language,
  UseTerminalReturn,
} from "../types";
import { translations, fileList, fileMapping } from "../data/translations";

const INITIAL_STATE: TerminalState = {
  currentPath: "~",
  currentLanguage: "en",
  commandHistory: [],
  historyIndex: -1,
  isProcessing: false,
};

const SYSTEM_INFO = {
  username: "gustavo",
  hostname: "portfolio",
  shell: "bash",
  version: "1.0.0",
  uptime: "Several years of passion! 🚀",
};

export const useTerminal = (): UseTerminalReturn => {
  const [state, setState] = useState<TerminalState>(INITIAL_STATE);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const lineIdCounter = useRef(0);
  const initialized = useRef(false);
  const languageChangeRef = useRef(false);

  const addLine = useCallback(
    (type: TerminalLine["type"], content: string, command?: string) => {
      const newLine: TerminalLine = {
        id: `line-${++lineIdCounter.current}`,
        type,
        content,
        timestamp: new Date(),
        command,
      };
      setLines((prev) => [...prev, newLine]);
    },
    [],
  );

  const clearTerminal = useCallback(() => {
    setLines([]);
    const t = translations[state.currentLanguage];
    addLine("system", t.messages.cleared);
  }, [state.currentLanguage, addLine]);

  const changeLanguage = useCallback(
    (language: Language) => {
      setState((prev) => ({ ...prev, currentLanguage: language }));
      const t = translations[language];

      // Clear the terminal and show fresh welcome message
      setLines([]);
      addLine("system", t.messages.welcome);
      addLine("system", t.messages.helpTip);

      // Set flag to trigger tree command after language change
      languageChangeRef.current = true;
    },
    [addLine],
  );

  const getPrompt = useCallback(() => {
    return `${SYSTEM_INFO.username}@${SYSTEM_INFO.hostname}:${state.currentPath}$`;
  }, [state.currentPath]);

  const executeSystemCommand = useCallback(
    (command: string, args: string[]): CommandResult => {
      const t = translations[state.currentLanguage];

      switch (command) {
        case "clear":
        case "limpar":
          return { output: "", shouldClear: true };

        case "whoami":
        case "quemSou":
          return { output: `${t.messages.whoami}\n${t.messages.whoamiDesc}` };

        case "pwd":
          return { output: state.currentPath };

        case "date":
        case "data":
          return { output: new Date().toLocaleString() };

        case "uname":
        case "sistema":
          return {
            output: `${SYSTEM_INFO.shell} ${SYSTEM_INFO.version}\n${SYSTEM_INFO.hostname} portfolio terminal`,
          };

        case "ls":
        case "listar":
          const files = fileList[state.currentLanguage];
          return { output: files.join("  ") };

        case "cat":
        case "ler": {
          if (args.length === 0) {
            return {
              output:
                state.currentLanguage === "en"
                  ? t.messages.usageCat
                  : t.messages.usageCat,
              isError: true,
            };
          }
          const filename = args[0];
          const mapping = fileMapping[state.currentLanguage];
          const contentKey = mapping[filename as keyof typeof mapping];

          if (!contentKey || !t.content[contentKey]) {
            return {
              output: t.messages.fileNotFound.replace("{file}", filename),
              isError: true,
            };
          }

          const content = t.content[contentKey];
          return {
            output: `${content.title}\n\n${content.content.join("\n")}`,
          };
        }

        case "echo":
        case "eco":
          return { output: args.join(" ") };

        case "history":
        case "historico": {
          const history = state.commandHistory
            .map((cmd, index) => `${index + 1}  ${cmd.command}`)
            .join("\n");
          return { output: `${t.messages.commandHistory}\n${history}` };
        }

        case "neofetch":
          return {
            output: `
╭─────────────────────────────────────╮
│     ${SYSTEM_INFO.username}@${SYSTEM_INFO.hostname}                     │
│─────────────────────────────────────│
│ OS: Portfolio Terminal              │
│ Host: Web Browser                   │
│ Kernel: JavaScript                  │
│ Uptime: ${SYSTEM_INFO.uptime}        │
│ Shell: ${SYSTEM_INFO.shell}                           │
│ DE: Terminal Portfolio              │
│ Theme: Dark Terminal                │
│ CPU: Your Processor                 │
│ Memory: Unlimited Passion           │
╰─────────────────────────────────────╯`,
          };

        case "tree":
        case "arvore": {
          const commands =
            state.currentLanguage === "pt"
              ? [
                  "ajuda",
                  "sobre",
                  "experiencia",
                  "educacao",
                  "habilidades",
                  "projetos",
                  "curriculo",
                  "contato",
                ]
              : [
                  "help",
                  "about",
                  "experience",
                  "education",
                  "skills",
                  "projects",
                  "resume",
                  "contact",
                ];

          const tree = commands
            .map((command, index) => {
              const isLast = index === commands.length - 1;
              return `${isLast ? "└──" : "├──"} ${command}`;
            })
            .join("\n");
          return { output: `.\n${tree}` };
        }

        case "ps":
        case "processos":
          return {
            output: `${t.messages.processes}
  PID  COMMAND
  001  portfolio-app
  002  translation-service
  003  command-handler
  004  ui-renderer
  005  passion-driver`,
          };

        case "top":
        case "topo":
          return {
            output: `${t.messages.topProcesses}
  PID  %CPU  %MEM  COMMAND
  005  95.0  100   passion-driver
  001  85.0   80   portfolio-app
  002  75.0   60   learning-process
  003  70.0   55   coding-engine
  004  65.0   50   coffee-consumer`,
          };

        case "free":
        case "memoria":
          return {
            output: `${t.messages.memory}
               total        used        free      shared
Mem:         ∞ GB      95% GB      5% GB         0 GB
Swap:        0 GB       0 GB       0 GB
Passion:     ∞ GB     100% GB      0 GB        ∞ GB`,
          };

        case "uptime":
        case "tempo":
          return { output: `${t.messages.uptime}\n${t.messages.uptimeDesc}` };

        case "sudo":
          return { output: t.messages.permissions };

        case "exit":
        case "sair":
          return {
            output: `${t.messages.goodbye}\n${t.messages.jokingExit}\n${t.messages.closeTab}`,
          };

        case "df":
        case "disco":
          return {
            output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/passion     ∞TB   95%   5%  95% /
/dev/skills     100GB  80%  20%  80% /skills
/dev/projects   500GB  60%  40%  60% /projects
/dev/dreams      ∞TB  100%   0% 100% /dreams`,
          };

        default:
          return { output: "", isError: false };
      }
    },
    [state.currentLanguage, state.currentPath, state.commandHistory],
  );

  const executeContentCommand = useCallback(
    (contentKey: string): CommandResult => {
      const t = translations[state.currentLanguage];
      const content = t.content[contentKey];

      if (!content) {
        return { output: "Content not found", isError: true };
      }

      return { output: `${content.title}\n\n${content.content.join("\n")}` };
    },
    [state.currentLanguage],
  );

  const executeCommand = useCallback(
    async (command: string) => {
      if (!command.trim()) return;

      setState((prev) => ({ ...prev, isProcessing: true }));

      // Add command to display
      addLine("input", `${getPrompt()} ${command}`, command);

      const parts = command.trim().split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      const t = translations[state.currentLanguage];

      // Update command history
      const newHistoryEntry = {
        command,
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        commandHistory: [...prev.commandHistory, newHistoryEntry],
        historyIndex: -1,
      }));

      let result: CommandResult;

      // Check if it's a content command
      const commandMapping = t.commands[cmd];
      if (commandMapping && commandMapping.endsWith("-content")) {
        result = executeContentCommand(commandMapping);
      } else {
        // System command
        result = executeSystemCommand(cmd, args);
      }

      // Handle special cases
      if (result.shouldClear) {
        setLines([]);
        addLine("system", t.messages.cleared);
      } else if (result.output) {
        addLine(result.isError ? "error" : "output", result.output);
      } else if (!commandMapping) {
        // Command not found
        addLine("error", `${t.messages.commandNotFound} ${cmd}`);
        addLine("system", t.messages.helpHint);
      }

      setState((prev) => ({ ...prev, isProcessing: false }));
    },
    [
      state.currentLanguage,
      addLine,
      getPrompt,
      executeSystemCommand,
      executeContentCommand,
    ],
  );

  const navigateHistory = useCallback(
    (direction: "up" | "down"): string => {
      const historyLength = state.commandHistory.length;
      if (historyLength === 0) return "";

      let newIndex = state.historyIndex;

      if (direction === "up") {
        newIndex =
          newIndex === -1 ? historyLength - 1 : Math.max(0, newIndex - 1);
      } else {
        newIndex =
          newIndex === -1 ? -1 : Math.min(historyLength - 1, newIndex + 1);
        if (newIndex === historyLength - 1) newIndex = -1;
      }

      setState((prev) => ({ ...prev, historyIndex: newIndex }));

      return newIndex === -1 ? "" : state.commandHistory[newIndex].command;
    },
    [state.commandHistory, state.historyIndex],
  );

  // Initialize with welcome message and auto-execute tree command
  useEffect(() => {
    if (!initialized.current) {
      addLine("system", translations["en"].messages.welcome);
      addLine("system", translations["en"].messages.helpTip);

      // Auto-execute tree command on startup
      setTimeout(() => {
        executeCommand("tree");
      }, 500);

      initialized.current = true;
    }
  }, [addLine, executeCommand]); // Only run once on mount

  // Handle language change to auto-execute tree command
  useEffect(() => {
    if (initialized.current && languageChangeRef.current) {
      // Auto-execute tree command in new language after language change
      const timer = setTimeout(() => {
        executeCommand(state.currentLanguage === "pt" ? "arvore" : "tree");
        languageChangeRef.current = false;
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [state.currentLanguage, executeCommand]);

  // Function to get all available commands for clickable functionality
  const getAvailableCommands = useCallback(() => {
    const systemCommands = [
      "help",
      "about",
      "experience",
      "education",
      "skills",
      "projects",
      "resume",
      "contact",
      "clear",
      "whoami",
      "ls",
      "pwd",
      "date",
      "uname",
      "cat",
      "echo",
      "neofetch",
      "history",
      "tree",
      "ps",
      "top",
      "free",
      "uptime",
      "sudo",
      "exit",
      "df",
    ];
    const localizedCommands =
      state.currentLanguage === "pt"
        ? [
            "ajuda",
            "sobre",
            "experiencia",
            "educacao",
            "habilidades",
            "projetos",
            "curriculo",
            "contato",
            "limpar",
            "quemSou",
            "listar",
            "data",
            "sistema",
            "ler",
            "eco",
            "historico",
            "arvore",
            "processos",
            "topo",
            "memoria",
            "tempo",
            "sair",
            "disco",
          ]
        : [];

    return [...systemCommands, ...localizedCommands];
  }, [state.currentLanguage]);

  return {
    state,
    lines,
    executeCommand,
    clearTerminal,
    changeLanguage,
    navigateHistory,
    getAvailableCommands,
  };
};
