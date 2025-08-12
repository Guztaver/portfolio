// Core types for the Terminal Portfolio application

export interface Translation {
  commands: Record<string, string>;
  messages: Record<string, string>;
  content: {
    [key: string]: {
      title: string;
      content: string[];
    };
  };
}

export interface Translations {
  en: Translation;
  pt: Translation;
}

export type Language = "en" | "pt";

export interface CommandHistory {
  command: string;
  timestamp: Date;
  output?: string;
}

export interface TerminalState {
  currentPath: string;
  currentLanguage: Language;
  commandHistory: CommandHistory[];
  historyIndex: number;
  isProcessing: boolean;
}

export interface CommandResult {
  output: string;
  isError?: boolean;
  shouldClear?: boolean;
}

export type CommandFunction = (
  args: string[],
) => CommandResult | Promise<CommandResult>;

export interface CommandMap {
  [key: string]: CommandFunction;
}

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  timestamp: Date;
  command?: string;
}

export interface TerminalConfig {
  maxHistorySize: number;
  maxOutputLines: number;
  typingSpeed: number;
  welcomeDelay: number;
}

export interface SystemInfo {
  username: string;
  hostname: string;
  shell: string;
  version: string;
  uptime: string;
}

export interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: FileSystemNode[];
  permissions?: string;
  size?: number;
  modified?: Date;
}

export interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: string;
}

export interface MemoryInfo {
  total: string;
  used: string;
  free: string;
  available: string;
}

export interface TerminalTheme {
  backgroundColor: string;
  textColor: string;
  promptColor: string;
  commandColor: string;
  errorColor: string;
  successColor: string;
  warningColor: string;
  borderColor: string;
  headerBackgroundColor: string;
}

// Component Props
export interface TerminalHeaderProps {
  onLanguageChange: (language: Language) => void;
  currentLanguage: Language;
}

export interface TerminalBodyProps {
  lines: TerminalLine[];
  onCommand: (command: string) => void;
  isProcessing: boolean;
  currentPath: string;
  commandHistory: string[];
  onHistoryNavigation: (direction: "up" | "down") => string;
}

export interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export interface TerminalInputProps {
  onCommand: (command: string) => void;
  currentPath: string;
  isProcessing: boolean;
  commandHistory: string[];
  onHistoryNavigation: (direction: "up" | "down") => string;
}

export interface TerminalOutputProps {
  lines: TerminalLine[];
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Event types
export interface TerminalEvents {
  commandExecuted: (command: string, result: CommandResult) => void;
  languageChanged: (language: Language) => void;
  terminalCleared: () => void;
  historyUpdated: (history: CommandHistory[]) => void;
}

// Hook return types
export interface UseTerminalReturn {
  state: TerminalState;
  lines: TerminalLine[];
  executeCommand: (command: string) => Promise<void>;
  clearTerminal: () => void;
  changeLanguage: (language: Language) => void;
  navigateHistory: (direction: "up" | "down") => string;
}

export interface UseTranslationReturn {
  t: (key: string, params?: Record<string, string>) => string;
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  translations: Translations;
}

// PDF Generator types
export interface PDFOptions {
  filename: string;
  language: Language;
  format: "A4" | "Letter";
  orientation: "portrait" | "landscape";
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string[];
    technologies: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    description?: string;
  }>;
  skills: {
    technical: string[];
    languages: string[];
    tools: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
  }>;
}
