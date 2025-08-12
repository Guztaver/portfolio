"use client";

import React, { forwardRef, useState, useCallback } from "react";
import type { TerminalOutputProps } from "../types";

export const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ lines, onCommand, availableCommands = [] }, ref) => {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    // Function to make commands clickable - only in help content and system messages
    const makeCommandsClickable = useCallback(
      (content: string, type: string) => {
        if (!onCommand || !availableCommands.length) {
          return content;
        }

        // Only make commands clickable in very specific contexts
        const shouldMakeClickable =
          type === "system" ||
          content.includes("AVAILABLE COMMANDS") ||
          content.includes("Navigation Commands:") ||
          content.includes("System Commands:") ||
          content.includes("Try running:") ||
          content.includes("Available commands:") ||
          content.includes("Type 'help'") ||
          content.includes("run: help") ||
          content.includes("├──") ||
          content.includes("└──"); // Tree structure

        if (!shouldMakeClickable) {
          return content;
        }

        let processedContent = content;

        // Simple approach: process each command individually
        availableCommands.forEach((command) => {
          // Pattern 1: Tree structure (├── command or └── command)
          const treePattern = new RegExp(
            `(├──|└──)\\s+(${command})(?=\\s|$)`,
            "gi",
          );
          processedContent = processedContent.replace(
            treePattern,
            (match, prefix, cmd) => {
              return `${prefix} <span class="clickable-command" data-command="${cmd.toLowerCase()}" style="color: #61dafb; cursor: pointer; text-decoration: underline; transition: color 0.2s ease;" onmouseover="this.style.color='#21a1c4'" onmouseout="this.style.color='#61dafb'">${cmd}</span>`;
            },
          );

          // Pattern 2: Help menu format (  command - description)
          const helpPattern = new RegExp(
            `(\\s{2,})(${command})(?=\\s+-)`,
            "gi",
          );
          processedContent = processedContent.replace(
            helpPattern,
            (match, spaces, cmd) => {
              return `${spaces}<span class="clickable-command" data-command="${cmd.toLowerCase()}" style="color: #61dafb; cursor: pointer; text-decoration: underline; transition: color 0.2s ease;" onmouseover="this.style.color='#21a1c4'" onmouseout="this.style.color='#61dafb'">${cmd}</span>`;
            },
          );
        });

        return processedContent;
      },
      [onCommand, availableCommands],
    );

    // Handle clicks on commands
    const handleContentClick = useCallback(
      (
        e:
          | React.MouseEvent<HTMLDivElement>
          | React.KeyboardEvent<HTMLDivElement>,
      ) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("clickable-command")) {
          const command = target.getAttribute("data-command");
          if (command && onCommand) {
            e.preventDefault();
            e.stopPropagation();
            onCommand(command);
          }
        }
      },
      [onCommand],
    );
    const getLineClassName = (type: string) => {
      switch (type) {
        case "input":
          return "terminal-line terminal-input-line";
        case "output":
          return "terminal-line terminal-output-line";
        case "error":
          return "terminal-line terminal-error";
        case "system":
          return "terminal-line terminal-system";
        default:
          return "terminal-line";
      }
    };

    const renderLineContent = (content: string, type: string) => {
      if (type === "input") {
        // For input lines, we want to preserve the prompt formatting
        return <span dangerouslySetInnerHTML={{ __html: content }} />;
      }

      // Make commands clickable in output and system messages
      const processedContent = makeCommandsClickable(content, type);

      // For other lines, handle HTML content and preserve formatting
      if (
        processedContent.includes("<span") ||
        processedContent.includes("</span>")
      ) {
        return <span dangerouslySetInnerHTML={{ __html: processedContent }} />;
      }

      // Handle line breaks and preserve whitespace
      const lines = processedContent.split("\n");
      return (
        <>
          {lines.map((line, index) => (
            <React.Fragment key={`line-${index}-${line}`}>
              {index > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </>
      );
    };

    // Handle scroll events to show/hide scroll indicators
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      setIsScrolledToBottom(isAtBottom);
      setShowScrollIndicator(scrollHeight > clientHeight && scrollTop > 10);
    }, []);

    return (
      <div className="terminal-output-container">
        {!isScrolledToBottom && showScrollIndicator && (
          <div className="scroll-indicator scroll-indicator-bottom">
            <span>↓ More content below ↓</span>
          </div>
        )}

        <div
          className="terminal-output"
          ref={ref}
          onScroll={handleScroll}
          onClick={handleContentClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleContentClick(e);
            }
          }}
          tabIndex={0}
        >
          {lines.map((line) => (
            <div key={line.id} className={getLineClassName(line.type)}>
              {renderLineContent(line.content, line.type)}
            </div>
          ))}
        </div>

        {showScrollIndicator && !isScrolledToBottom && (
          <button
            type="button"
            className="scroll-to-bottom-btn"
            onClick={() => {
              if (ref && "current" in ref && ref.current) {
                ref.current.scrollTo({
                  top: ref.current.scrollHeight,
                  behavior: "smooth",
                });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (ref && "current" in ref && ref.current) {
                  ref.current.scrollTo({
                    top: ref.current.scrollHeight,
                    behavior: "smooth",
                  });
                }
              }
            }}
          >
            ⬇ Jump to bottom
          </button>
        )}
      </div>
    );
  },
);

TerminalOutput.displayName = "TerminalOutput";
