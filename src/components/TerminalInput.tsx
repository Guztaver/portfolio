"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { TerminalInputProps } from "../types";
import { useMobileKeyboard } from "../hooks/useMobileKeyboard";

export const TerminalInput: React.FC<TerminalInputProps> = ({
  onCommand,
  currentPath,
  isProcessing,
  onHistoryNavigation,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLButtonElement>(null);
  const { isKeyboardOpen, focusInput } = useMobileKeyboard({
    threshold: 150,
    debounceMs: 150,
    enableAutoScroll: true,
  });

  // Focus input on mount and when processing changes
  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      // Delay focus slightly on mobile to prevent keyboard flicker
      const delay =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
          ? 100
          : 0;

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, delay);
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
        case "ArrowUp": {
          e.preventDefault();
          const upCommand = onHistoryNavigation("up");
          if (upCommand !== "") {
            setInput(upCommand);
          }
          break;
        }

        case "ArrowDown": {
          e.preventDefault();
          const downCommand = onHistoryNavigation("down");
          setInput(downCommand);
          break;
        }

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

        case "Tab": {
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
        }

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
        focusInput(inputRef.current);
      }
    });
  }, [focusInput]);

  // Get the prompt string
  const getPrompt = () => `user@portfolio:${currentPath}$`;

  return (
    <div
      className={`terminal-input-container ${isKeyboardOpen ? "mobile-keyboard-open" : ""}`}
    >
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <button
          type="button"
          className="terminal-prompt"
          onClick={handleDisplayClick}
          aria-label="Terminal input area - click to focus"
          ref={displayRef}
        >
          <span className="prompt-text">{getPrompt()}</span>
          <span className="input-display">
            <span className="input-text">{input}</span>
            {isProcessing && <span className="cursor-blink">_</span>}
            {!isProcessing && <span className="cursor">_</span>}
          </span>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="terminal-input-hidden"
          disabled={isProcessing}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          inputMode="text"
          enterKeyHint="go"
          style={{
            position: "absolute",
            left: "-9999px",
            opacity: 0,
            pointerEvents: "none",
            fontSize: "16px", // Prevent zoom on iOS
            transform: "scale(0)",
          }}
          onFocus={(e) => {
            // Prevent scroll on focus for mobile
            e.preventDefault();
            if (window.scrollTo) {
              window.scrollTo({ top: 0, behavior: "instant" });
            }
          }}
          onBlur={() => {
            // Reset scroll position when keyboard closes
            if (window.scrollTo && isKeyboardOpen) {
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "instant" });
              }, 300);
            }
          }}
        />
      </form>
    </div>
  );
};
