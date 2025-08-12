import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type {
  TerminalLine,
  TerminalState,
  CommandResult,
  Language,
  UseTerminalReturn,
} from "../types";
import { translations, fileList, fileMapping } from "../data/translations";
import { generateResumePDF } from "../utils/pdfGenerator";

const INITIAL_STATE: TerminalState = {
  currentPath: "~",
  currentLanguage: "en",
  commandHistory: [],
  historyIndex: -1,
  isProcessing: false,
};

const SYSTEM_INFO = {
  username: "user",
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

  // Cache for command results to avoid recomputation
  const commandCache = useRef(new Map<string, CommandResult>());

  // Memoize system info that doesn't change
  const systemCommands = useMemo(
    () =>
      new Set([
        "clear",
        "limpar",
        "whoami",
        "quemSou",
        "pwd",
        "date",
        "data",
        "uname",
        "sistema",
        "ls",
        "listar",
        "cat",
        "ler",
        "echo",
        "eco",
        "history",
        "historico",
        "neofetch",
        "tree",
        "arvore",
        "ps",
        "processos",
        "top",
        "topo",
        "free",
        "memoria",
        "uptime",
        "tempo",
        "sudo",
        "exit",
        "sair",
        "df",
        "disco",
      ]),
    [],
  );

  const addLine = useCallback(
    (type: TerminalLine["type"], content: string, command?: string) => {
      const newLine: TerminalLine = {
        id: `line-${++lineIdCounter.current}`,
        type,
        content,
        timestamp: new Date(),
        command,
      };
      // Use functional update to avoid stale closures and optimize rendering
      setLines((prev) => {
        // Limit lines to prevent memory bloat (keep last 1000 lines)
        const newLines = [...prev, newLine];
        return newLines.length > 1000 ? newLines.slice(-1000) : newLines;
      });
    },
    [],
  );

  const clearTerminal = useCallback(() => {
    setLines([]);
    // Clear command cache when terminal is cleared
    commandCache.current.clear();
    const t = translations[state.currentLanguage];
    addLine("system", t.messages.cleared);
  }, [state.currentLanguage, addLine]);

  const changeLanguage = useCallback(
    (language: Language) => {
      setState((prev) => ({ ...prev, currentLanguage: language }));
      const t = translations[language];

      // Clear the terminal and command cache
      setLines([]);
      commandCache.current.clear();
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

      // Create cache key for cacheable commands
      const cacheKey = `${command}:${args.join(" ")}:${state.currentLanguage}`;

      // Check cache for non-dynamic commands
      const nonDynamicCommands = new Set([
        "whoami",
        "quemSou",
        "uname",
        "sistema",
        "ls",
        "listar",
        "neofetch",
        "tree",
        "arvore",
        "ps",
        "processos",
        "top",
        "topo",
        "free",
        "memoria",
        "df",
        "disco",
      ]);
      if (
        nonDynamicCommands.has(command) &&
        commandCache.current.has(cacheKey)
      ) {
        return (
          commandCache.current.get(cacheKey) || { output: "", isError: true }
        );
      }

      let result: CommandResult;

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
        case "listar": {
          const files = fileList[state.currentLanguage];
          return { output: files.join("  ") };
        }

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
          result = { output: "", isError: false };
      }

      // Cache non-dynamic results
      if (nonDynamicCommands.has(command)) {
        commandCache.current.set(cacheKey, result);
      }

      return result;
    },
    [state.currentLanguage, state.currentPath, state.commandHistory],
  );

  const executeContentCommand = useCallback(
    (contentKey: string): CommandResult => {
      const t = translations[state.currentLanguage];

      // Cache key for content commands (excluding resume due to side effects)
      const cacheKey = `content:${contentKey}:${state.currentLanguage}`;

      // Check cache for non-resume content
      if (
        contentKey !== "resume-content" &&
        commandCache.current.has(cacheKey)
      ) {
        return (
          commandCache.current.get(cacheKey) || { output: "", isError: true }
        );
      }

      let result: CommandResult;

      // Special handling for resume command - trigger PDF download
      if (contentKey === "resume-content") {
        try {
          generateResumePDF(state.currentLanguage);
          const filename =
            state.currentLanguage === "pt"
              ? "Gustavo_Muniz_Curriculo.pdf"
              : "Gustavo_Muniz_Resume.pdf";
          result = {
            output: `${t.messages.downloadingResume.replace("{filename}", filename)}\n${t.messages.resumeSuccess}\n\n${t.content[contentKey].title}\n\n${t.content[contentKey].content.join("\n")}`,
          };
        } catch (error) {
          result = {
            output: `Error generating PDF: ${error instanceof Error ? error.message : "Unknown error"}\n\n${t.content[contentKey].title}\n\n${t.content[contentKey].content.join("\n")}`,
            isError: true,
          };
        }
        return result; // Don't cache resume command due to side effects
      }

      const content = t.content[contentKey];

      if (!content) {
        result = { output: "Content not found", isError: true };
      } else {
        result = {
          output: `${content.title}\n\n${content.content.join("\n")}`,
        };
      }

      // Cache the result
      commandCache.current.set(cacheKey, result);
      return result;
    },
    [state.currentLanguage],
  );

  const executeCommand = useCallback(
    async (command: string, skipHistory = false) => {
      if (!command.trim()) return;

      if (!skipHistory) {
        setState((prev) => ({ ...prev, isProcessing: true }));

        // Add command to display
        addLine("input", `${getPrompt()} ${command}`, command);
      }

      const parts = command.trim().split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      const t = translations[state.currentLanguage];

      // Update command history only if not skipping
      if (!skipHistory) {
        setState((prev) => {
          const newHistoryEntry = {
            command,
            timestamp: new Date(),
          };

          return {
            ...prev,
            commandHistory: [
              ...prev.commandHistory.slice(-99),
              newHistoryEntry,
            ], // Keep last 100 commands
            historyIndex: -1,
          };
        });
      }

      // Defer heavy computation to avoid blocking UI
      const processCommand = async () => {
        let result: CommandResult;

        // Check if it's a content command
        const commandMapping = t.commands[cmd];
        if (commandMapping?.endsWith("-content")) {
          result = executeContentCommand(commandMapping);
        } else if (systemCommands.has(cmd)) {
          // System command
          result = executeSystemCommand(cmd, args);
        } else {
          // Command not found - create result directly to avoid function call
          result = { output: "", isError: true };
        }

        // Handle special cases
        if (result.shouldClear) {
          setLines([]);
          commandCache.current.clear();
          addLine("system", t.messages.cleared);
        } else if (result.output) {
          addLine(result.isError ? "error" : "output", result.output);
        } else if (!commandMapping && !systemCommands.has(cmd)) {
          // Command not found
          addLine("error", `${t.messages.commandNotFound} ${cmd}`);
          addLine("system", t.messages.helpHint);
        }

        if (!skipHistory) {
          setState((prev) => ({ ...prev, isProcessing: false }));
        }
      };

      // Use requestIdleCallback for better performance, fallback to setTimeout
      if ("requestIdleCallback" in window) {
        requestIdleCallback(processCommand);
      } else {
        setTimeout(processCommand, 0);
      }
    },
    [
      state.currentLanguage,
      addLine,
      getPrompt,
      executeSystemCommand,
      executeContentCommand,
      systemCommands,
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

  // Initialize with complete demo sequence
  useEffect(() => {
    if (!initialized.current) {
      const t = translations[state.currentLanguage];
      const isPortuguese = state.currentLanguage === "pt";

      // Demo sequence commands
      const demoSequence = [
        {
          command: isPortuguese ? "experiencia" : "experience",
          delay: 3000,
        },
        {
          command: isPortuguese ? "educacao" : "education",
          delay: 3000,
        },
        {
          command: isPortuguese ? "contato" : "contact",
          delay: 3000,
        },
        {
          command: isPortuguese ? "arvore" : "tree",
          delay: 3000,
        },
      ];

      // Add welcome messages
      addLine("system", t.messages.welcome);
      addLine("system", t.messages.helpTip);

      // Execute demo sequence
      let currentDelay = 500;
      demoSequence.forEach((step) => {
        setTimeout(() => {
          // Add command input line
          addLine("input", `${getPrompt()} ${step.command}`, step.command);

          // Execute command and show output
          setTimeout(() => {
            executeCommand(step.command, true);
          }, 300);
        }, currentDelay);

        currentDelay += step.delay;
      });

      initialized.current = true;
    }
  }, [addLine, executeCommand, getPrompt, state.currentLanguage]); // Only run once on mount

  // Handle language change to restart demo sequence
  useEffect(() => {
    if (initialized.current && languageChangeRef.current) {
      const isPortuguese = state.currentLanguage === "pt";

      // Simplified demo for language change
      const treeCommand = isPortuguese ? "arvore" : "tree";

      // Add prompt line to show user input
      setTimeout(() => {
        addLine("input", `${getPrompt()} ${treeCommand}`, treeCommand);
      }, 200);

      // Auto-execute tree command in new language after language change
      setTimeout(() => {
        executeCommand(treeCommand, true);
        languageChangeRef.current = false;
      }, 500);
    }
  }, [state.currentLanguage, addLine, executeCommand, getPrompt]);

  // Memoize available commands to avoid recalculation
  const availableCommands = useMemo(() => {
    const systemCommandsList = [
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

    return [...systemCommandsList, ...localizedCommands];
  }, [state.currentLanguage]);

  const getAvailableCommands = useCallback(
    () => availableCommands,
    [availableCommands],
  );

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
