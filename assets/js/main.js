// Main Application Initialization
// Entry point for the terminal portfolio application

// Application state
let terminalApp = null;

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Prevent flash of unstyled content
  setTimeout(() => {
    document.documentElement.classList.add('loaded');
  }, 100);

  // Initialize terminal application
  try {
    terminalApp = new TerminalPortfolio();

    // Make terminal globally available for debugging and external access
    window.terminalApp = terminalApp;

    // Log successful initialization
    console.log('Terminal Portfolio initialized successfully');

    // Development mode helpers
    if (isDevelopmentMode()) {
      window.debug = () => terminalApp.debug();
      console.log('Development mode enabled. Use debug() for application state.');
    }

  } catch (error) {
    console.error('Failed to initialize Terminal Portfolio:', error);
    showFallbackError();
  }
});

// Handle window load for font loading
window.addEventListener('load', () => {
  document.documentElement.classList.add('loaded');

  // Ensure terminal is focused
  if (terminalApp && terminalApp.input) {
    terminalApp.input.focus();
  }
});

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);

  if (terminalApp) {
    terminalApp.appendToOutput(
      '<span class="error">An unexpected error occurred. Please refresh the page.</span>'
    );
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Global functions for backward compatibility and external access
window.switchLanguage = function(lang) {
  if (terminalApp) {
    terminalApp.switchLanguage(lang);
  } else {
    console.warn('Terminal not initialized yet');
  }
};

window.downloadResume = function(lang) {
  if (terminalApp) {
    terminalApp.downloadResume(lang);
  } else {
    console.warn('Terminal not initialized yet');
  }
};

// Utility functions
function isDevelopmentMode() {
  return window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname === '';
}

function showFallbackError() {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'fallback-error';
  errorMessage.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #ff4444;
      color: white;
      padding: 20px;
      border-radius: 8px;
      font-family: monospace;
      text-align: center;
      z-index: 9999;
    ">
      <h3>Terminal Portfolio Error</h3>
      <p>Failed to initialize the application.</p>
      <p>Please refresh the page or check the console for details.</p>
      <button onclick="location.reload()" style="
        background: white;
        color: #ff4444;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      ">Refresh Page</button>
    </div>
  `;
  document.body.appendChild(errorMessage);
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && terminalApp && terminalApp.input) {
    // Refocus terminal when page becomes visible
    setTimeout(() => {
      terminalApp.input.focus();
    }, 100);
  }
});

// Handle page beforeunload
window.addEventListener('beforeunload', () => {
  if (terminalApp && typeof terminalApp.destroy === 'function') {
    terminalApp.destroy();
  }
});

// Console welcome message for curious developers
console.log(`
 ██████  ██    ██ ███████ ████████  █████  ██    ██  ██████
██       ██    ██ ██         ██    ██   ██ ██    ██ ██    ██
██   ███ ██    ██ ███████    ██    ███████ ██    ██ ██    ██
██    ██ ██    ██      ██    ██    ██   ██  ██  ██  ██    ██
 ██████   ██████  ███████    ██    ██   ██   ████    ██████

███    ███ ██    ██ ███    ██ ██ ███████
████  ████ ██    ██ ████   ██ ██      ███
██ ████ ██ ██    ██ ██ ██  ██ ██     ███
██  ██  ██ ██    ██ ██  ██ ██ ██    ███
██      ██  ██████  ██   ████ ██   ███████

Hey there, curious developer! 👋
Nice to see you checking out the console!
If you're reading this, you might be the kind of person I'd love to work with.
Feel free to reach out: contact@gustavoanjos.com

Built with ❤️ and lots of ☕ by Gustavo Muniz
`);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    terminalApp: () => terminalApp,
    isDevelopmentMode,
    showFallbackError
  };
}
