"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { TerminalInputProps } from "../types";

export const TerminalInput: React.FC<TerminalInputProps> = ({
  onCommand,
  currentPath,
  isProcessing,
  onHistoryNavigation,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and when processing changes
  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  // Memoize common commands for autocomplete
  const commonCommands = useMemo(
    () => [
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
    ],
    [],
  );

  // Handle command execution
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim() && !isProcessing) {
        // Use requestAnimationFrame to defer command execution
        requestAnimationFrame(() => {
          onCommand(input.trim());
          setInput("");
        });
      }
    },
    [input, isProcessing, onCommand],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isProcessing) return;

      // Use requestAnimationFrame for non-critical operations to avoid blocking
      const deferOperation = (operation: () => void) => {
        requestAnimationFrame(operation);
      };

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

        case "PageUp":
          e.preventDefault();
          deferOperation(() => {
            const terminalOutput = document.querySelector(
              ".terminal-output",
            ) as HTMLElement;
            if (terminalOutput) {
              terminalOutput.scrollBy(0, -terminalOutput.clientHeight * 0.8);
            }
          });
          break;

        case "PageDown":
          e.preventDefault();
          deferOperation(() => {
            const terminalOutput = document.querySelector(
              ".terminal-output",
            ) as HTMLElement;
            if (terminalOutput) {
              terminalOutput.scrollBy(0, terminalOutput.clientHeight * 0.8);
            }
          });
          break;

        case "Home":
          if (e.ctrlKey) {
            e.preventDefault();
            deferOperation(() => {
              const terminalOutput = document.querySelector(
                ".terminal-output",
              ) as HTMLElement;
              if (terminalOutput) {
                terminalOutput.scrollTo({ top: 0, behavior: "smooth" });
              }
            });
          }
          break;

        case "End":
          if (e.ctrlKey) {
            e.preventDefault();
            deferOperation(() => {
              const terminalOutput = document.querySelector(
                ".terminal-output",
              ) as HTMLElement;
              if (terminalOutput) {
                terminalOutput.scrollTo({
                  top: terminalOutput.scrollHeight,
                  behavior: "smooth",
                });
              }
            });
          }
          break;

        case "Tab":
          e.preventDefault();
          // Optimized autocomplete with memoized commands
          const currentInput = input.toLowerCase();
          const matches = commonCommands.filter(
            (cmd) => cmd.startsWith(currentInput) && cmd !== currentInput,
          );

          if (matches.length === 1) {
            setInput(matches[0]);
          } else if (matches.length > 1) {
            // Find common prefix efficiently
            let commonPrefix = matches[0];
            for (let i = 1; i < matches.length; i++) {
              let j = 0;
              const minLength = Math.min(
                commonPrefix.length,
                matches[i].length,
              );
              while (j < minLength && commonPrefix[j] === matches[i][j]) {
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
    [input, isProcessing, onHistoryNavigation, commonCommands],
  );

  // Handle input change with debouncing for performance
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Update input immediately for responsive UI
      setInput(value);
    },
    [],
  );

  // Handle clicks on the display area to focus hidden input
  const handleDisplayClick = useCallback(() => {
    // Use requestAnimationFrame to avoid blocking the click event
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  }, []);

  // Get the prompt string
  const getPrompt = () => `user@portfolio:${currentPath}$`;

  return (
    <div className="terminal-input-container">
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <div
          className="terminal-prompt"
          onClick={handleDisplayClick}
          ref={displayRef}
        >
          <span className="prompt-text">{getPrompt()}</span>
          <span className="input-display">
            <span className="input-text">{input}</span>
            {isProcessing && <span className="cursor-blink">_</span>}
            {!isProcessing && <span className="cursor">_</span>}
          </span>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="terminal-input-hidden"
          disabled={isProcessing}
          autoComplete="off"
          spellCheck={false}
          style={{
            position: "absolute",
            left: "-9999px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </form>
    </div>
  );
};
