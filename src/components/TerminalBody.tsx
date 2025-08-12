'use client';

import React, { useRef, useEffect } from 'react';
import { TerminalBodyProps } from '../types';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { ASCIIArt } from './ASCIIArt';

export const TerminalBody: React.FC<TerminalBodyProps> = ({
  lines,
  onCommand,
  isProcessing,
  currentPath,
  commandHistory,
  onHistoryNavigation,
}) => {
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="terminal-body" ref={terminalBodyRef}>
      <ASCIIArt />

      <div className="terminal-content">
        <TerminalOutput lines={lines} />

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
