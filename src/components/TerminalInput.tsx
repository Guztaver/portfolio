"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { TerminalInputProps } from "../types";

export const TerminalInput: React.FC<TerminalInputProps> = ({
  onCommand,
  currentPath,
  isProcessing,
  onHistoryNavigation,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when processing changes
  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  // Handle command execution
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim() && !isProcessing) {
        onCommand(input.trim());
        setInput("");
      }
    },
    [input, isProcessing, onCommand],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isProcessing) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          const upCommand = onHistoryNavigation("up");
          if (upCommand !== "") {
            setInput(upCommand);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          const downCommand = onHistoryNavigation("down");
          setInput(downCommand);
          break;

        case "Tab":
          e.preventDefault();
          // Basic autocomplete - could be enhanced
          const currentInput = input.toLowerCase();
          const commonCommands = [
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
            "history",
          ];

          const matches = commonCommands.filter(
            (cmd) => cmd.startsWith(currentInput) && cmd !== currentInput,
          );

          if (matches.length === 1) {
            setInput(matches[0]);
          } else if (matches.length > 1) {
            // Find common prefix
            let commonPrefix = matches[0];
            for (let i = 1; i < matches.length; i++) {
              let j = 0;
              while (
                j < commonPrefix.length &&
                j < matches[i].length &&
                commonPrefix[j] === matches[i][j]
              ) {
                j++;
              }
              commonPrefix = commonPrefix.substring(0, j);
            }
            if (commonPrefix.length > currentInput.length) {
              setInput(commonPrefix);
            }
          }
          break;

        case "Escape":
          setInput("");
          break;
      }
    },
    [input, isProcessing, onHistoryNavigation],
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    [],
  );

  // Get the prompt string
  const getPrompt = () => `gustavo@portfolio:${currentPath}$`;

  return (
    <div className="terminal-input-container">
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <div className="terminal-prompt">
          <span className="prompt-text">{getPrompt()}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            disabled={isProcessing}
            autoComplete="off"
            spellCheck={false}
            placeholder={isProcessing ? "Processing..." : ""}
          />
          {isProcessing && (
            <span className="processing-indicator">
              <span className="cursor-blink">_</span>
            </span>
          )}
          {!isProcessing && <span className="cursor">_</span>}
        </div>
      </form>
    </div>
  );
};
