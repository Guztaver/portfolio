"use client";

import React, { forwardRef, useState, useCallback, useMemo } from "react";
import type { TerminalOutputProps } from "../types";

export const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ lines, onCommand, availableCommands = [] }, ref) => {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    // Memoize the command processing patterns to avoid recreating them on every render
    const commandPatterns = useMemo(() => {
      if (!onCommand || !availableCommands.length) return [];

      return availableCommands.map((command) => ({
        command,
        treePattern: new RegExp(`(├──|└──)\\s+(${command})(?=\\s|$)`, "gi"),
        helpPattern: new RegExp(`(\\s{2,})(${command})(?=\\s+-)`, "gi"),
      }));
    }, [onCommand, availableCommands]);

    // Memoize processed content to avoid reprocessing the same content
    const processedContentCache = useMemo(() => new Map<string, string>(), []);

    // Function to make commands clickable - only in help content and system messages
    const makeCommandsClickable = useCallback(
      (content: string, type: string) => {
        if (!onCommand || !commandPatterns.length) {
          return content;
        }

        // Create a cache key
        const cacheKey = `${type}:${content}`;
        if (processedContentCache.has(cacheKey)) {
          return processedContentCache.get(cacheKey) || content;
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
          processedContentCache.set(cacheKey, content);
          return content;
        }

        let processedContent = content;

        // Use pre-compiled patterns
        commandPatterns.forEach(({ treePattern, helpPattern }) => {
          // Reset regex lastIndex to avoid state issues
          treePattern.lastIndex = 0;
          helpPattern.lastIndex = 0;

          // Pattern 1: Tree structure (├── command or └── command)
          processedContent = processedContent.replace(
            treePattern,
            (_match, prefix, cmd) => {
              return `${prefix} <span class="clickable-command" data-command="${cmd.toLowerCase()}">${cmd}</span>`;
            },
          );

          // Pattern 2: Help menu format (  command - description)
          processedContent = processedContent.replace(
            helpPattern,
            (_match, spaces, cmd) => {
              return `${spaces}<span class="clickable-command" data-command="${cmd.toLowerCase()}">${cmd}</span>`;
            },
          );
        });

        // Cache the result
        processedContentCache.set(cacheKey, processedContent);
        return processedContent;
      },
      [onCommand, commandPatterns, processedContentCache],
    );

    // Handle clicks on commands with event delegation
    const handleContentClick = useCallback(
      (
        e:
          | React.MouseEvent<HTMLDivElement>
          | React.KeyboardEvent<HTMLDivElement>,
      ) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("clickable-command")) {
          const commandAttr = target.getAttribute("data-command");
          if (commandAttr && onCommand) {
            e.preventDefault();
            e.stopPropagation();
            // Defer command execution to avoid blocking the current interaction
            requestAnimationFrame(() => onCommand(commandAttr));
          }
        }
      },
      [onCommand],
    );
    const getLineClassName = useCallback((type: string) => {
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
    }, []);

    // Memoize line content rendering to avoid re-processing unchanged content
    const renderLineContent = useCallback(
      (content: string, type: string) => {
        // Make commands clickable in output and system messages
        const processedContent = makeCommandsClickable(content, type);

        // For terminal content that contains HTML styling, we need to render it safely
        // This is safe because:
        // 1. Content comes only from our trusted translation files, not user input
        // 2. HTML is limited to <span> tags with style attributes for color highlighting
        // 3. No scripts, event handlers, or dangerous attributes are used
        if (
          processedContent.includes("<span") ||
          processedContent.includes("</span>")
        ) {
          return (
            <span dangerouslySetInnerHTML={{ __html: processedContent }} />
          );
        }

        // Handle plain text with line breaks
        const lines = processedContent.split("\n");
        return (
          <>
            {lines.map((line, index) => (
              <React.Fragment key={`line-${index}-${line.slice(0, 20)}`}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </>
        );
      },
      [makeCommandsClickable],
    );

    // Debounce scroll events to improve performance
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      const { scrollTop, scrollHeight, clientHeight } = target;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

      // Use requestAnimationFrame to debounce scroll updates
      requestAnimationFrame(() => {
        setIsScrolledToBottom(isAtBottom);
        setShowScrollIndicator(scrollHeight > clientHeight && scrollTop > 10);
      });
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
          role="log"
          aria-label="Terminal output"
        >
          {lines.map((line) => {
            // Memoize individual line rendering
            const LineComponent = React.memo(
              ({ lineData }: { lineData: typeof line }) => (
                <div className={getLineClassName(lineData.type)}>
                  {renderLineContent(lineData.content, lineData.type)}
                </div>
              ),
            );
            LineComponent.displayName = `Line-${line.id}`;

            return <LineComponent key={line.id} lineData={line} />;
          })}
        </div>

        {showScrollIndicator && !isScrolledToBottom && (
          <button
            type="button"
            className="scroll-to-bottom-btn"
            onClick={() => {
              if (ref && "current" in ref && ref.current) {
                // Use requestAnimationFrame to avoid blocking user interactions
                requestAnimationFrame(() => {
                  if (ref && "current" in ref && ref.current) {
                    ref.current.scrollTo({
                      top: ref.current.scrollHeight,
                      behavior: "smooth",
                    });
                  }
                });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                requestAnimationFrame(() => {
                  if (ref && "current" in ref && ref.current) {
                    ref.current.scrollTo({
                      top: ref.current.scrollHeight,
                      behavior: "smooth",
                    });
                  }
                });
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
