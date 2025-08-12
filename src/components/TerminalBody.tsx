"use client";

import React, { useRef, useEffect } from "react";
import { TerminalBodyProps } from "../types";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalInput } from "./TerminalInput";
import { ASCIIArt } from "./ASCIIArt";

export const TerminalBody: React.FC<TerminalBodyProps> = ({
  lines,
  onCommand,
  isProcessing,
  currentPath,
  commandHistory,
  onHistoryNavigation,
  availableCommands,
}) => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalOutputRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new lines are added with smooth animation
  useEffect(() => {
    if (terminalOutputRef.current) {
      // Small delay to ensure DOM is updated
      const scrollTimeout = setTimeout(() => {
        if (terminalOutputRef.current) {
          terminalOutputRef.current.scrollTo({
            top: terminalOutputRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 10);

      return () => clearTimeout(scrollTimeout);
    }
  }, [lines]);

  return (
    <div className="terminal-body" ref={terminalBodyRef}>
      <ASCIIArt />

      <div className="terminal-content">
        <TerminalOutput
          lines={lines}
          ref={terminalOutputRef}
          onCommand={onCommand}
          availableCommands={availableCommands}
        />

        <TerminalInput
          onCommand={onCommand}
          currentPath={currentPath}
          isProcessing={isProcessing}
          commandHistory={commandHistory}
          onHistoryNavigation={onHistoryNavigation}
        />
      </div>
    </div>
  );
};
