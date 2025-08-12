'use client';

import React from 'react';
import { TerminalOutputProps } from '../types';

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines }) => {
  const getLineClassName = (type: string) => {
    switch (type) {
      case 'input':
        return 'terminal-line terminal-input-line';
      case 'output':
        return 'terminal-line terminal-output';
      case 'error':
        return 'terminal-line terminal-error';
      case 'system':
        return 'terminal-line terminal-system';
      default:
        return 'terminal-line';
    }
  };

  const renderLineContent = (content: string, type: string) => {
    if (type === 'input') {
      // For input lines, we want to preserve the prompt formatting
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // For other lines, handle HTML content and preserve formatting
    if (content.includes('<span') || content.includes('</span>')) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // Handle line breaks and preserve whitespace
    const lines = content.split('\n');
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

  return (
    <div className="terminal-output">
      {lines.map((line) => (
        <div key={line.id} className={getLineClassName(line.type)}>
          {renderLineContent(line.content, line.type)}
        </div>
      ))}
    </div>
  );
};
