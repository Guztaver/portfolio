"use client";

import React, { forwardRef, useState, useCallback } from "react";
import { TerminalOutputProps } from "../types";

export const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ lines }, ref) => {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);
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

      // For other lines, handle HTML content and preserve formatting
      if (content.includes("<span") || content.includes("</span>")) {
        return <span dangerouslySetInnerHTML={{ __html: content }} />;
      }

      // Handle line breaks and preserve whitespace
      const lines = content.split("\n");
      return (
        <>
          {lines.map((line, index) => (
            <React.Fragment key={index}>
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

        <div className="terminal-output" ref={ref} onScroll={handleScroll}>
          {lines.map((line) => (
            <div key={line.id} className={getLineClassName(line.type)}>
              {renderLineContent(line.content, line.type)}
            </div>
          ))}
        </div>

        {showScrollIndicator && !isScrolledToBottom && (
          <div
            className="scroll-to-bottom-btn"
            onClick={() => {
              if (ref && "current" in ref && ref.current) {
                ref.current.scrollTo({
                  top: ref.current.scrollHeight,
                  behavior: "smooth",
                });
              }
            }}
          >
            ⬇ Jump to bottom
          </div>
        )}
      </div>
    );
  },
);

TerminalOutput.displayName = "TerminalOutput";
