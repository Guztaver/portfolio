"use client";

import React from "react";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalBody } from "./TerminalBody";
import { useTerminal } from "../hooks/useTerminal";

export const Terminal: React.FC = () => {
  const { state, lines, executeCommand, changeLanguage, navigateHistory } =
    useTerminal();

  return (
    <div className="terminal">
      <TerminalHeader
        currentLanguage={state.currentLanguage}
        onLanguageChange={changeLanguage}
      />
      <TerminalBody
        lines={lines}
        onCommand={executeCommand}
        isProcessing={state.isProcessing}
        currentPath={state.currentPath}
        commandHistory={state.commandHistory.map((h) => h.command)}
        onHistoryNavigation={navigateHistory}
      />
    </div>
  );
};
