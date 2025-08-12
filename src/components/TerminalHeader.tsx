'use client';

import React from 'react';
import { TerminalHeaderProps } from '../types';

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="terminal-header">
      <div className="terminal-controls">
        <span className="control close"></span>
        <span className="control minimize"></span>
        <span className="control maximize"></span>
      </div>

      <div className="terminal-title">
        gustavo@portfolio:~$ terminal
      </div>

      <div className="language-switcher">
        <button
          className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
          onClick={() => onLanguageChange('en')}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          className={`lang-btn ${currentLanguage === 'pt' ? 'active' : ''}`}
          onClick={() => onLanguageChange('pt')}
          aria-label="Alternar para Português"
        >
          PT
        </button>
      </div>
    </div>
  );
};
