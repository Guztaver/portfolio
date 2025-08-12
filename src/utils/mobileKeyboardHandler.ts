"use client";

/**
 * Mobile Keyboard Handler Utility
 * Handles virtual keyboard behavior on mobile devices to prevent layout issues
 */

interface ViewportState {
  initialHeight: number;
  currentHeight: number;
  isKeyboardOpen: boolean;
}

class MobileKeyboardHandler {
  private viewportState: ViewportState = {
    initialHeight: 0,
    currentHeight: 0,
    isKeyboardOpen: false,
  };

  private resizeTimeout: NodeJS.Timeout | null = null;
  private isInitialized = false;
  private callbacks: Set<(isKeyboardOpen: boolean) => void> = new Set();

  constructor() {
    this.handleResize = this.handleResize.bind(this);
    this.handleVisualViewportChange = this.handleVisualViewportChange.bind(this);
  }

  /**
   * Initialize the keyboard handler
   */
  public init(): void {
    if (this.isInitialized || typeof window === "undefined") {
      return;
    }

    this.setInitialViewportHeight();
    this.setupEventListeners();
    this.preventZoom();
    this.isInitialized = true;
  }

  /**
   * Cleanup event listeners
   */
  public destroy(): void {
    if (!this.isInitialized) {
      return;
    }

    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("orientationchange", this.handleResize);

    if (window.visualViewport) {
      window.visualViewport.removeEventListener(
        "resize",
        this.handleVisualViewportChange
      );
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.callbacks.clear();
    this.isInitialized = false;
  }

  /**
   * Subscribe to keyboard state changes
   */
  public onKeyboardToggle(callback: (isKeyboardOpen: boolean) => void): () => void {
    this.callbacks.add(callback);

    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  /**
   * Get current keyboard state
   */
  public isKeyboardOpen(): boolean {
    return this.viewportState.isKeyboardOpen;
  }

  /**
   * Set initial viewport height and CSS custom properties
   */
  private setInitialViewportHeight(): void {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);

    this.viewportState.initialHeight = window.innerHeight;
    this.viewportState.currentHeight = window.innerHeight;
  }

  /**
   * Setup event listeners for viewport changes
   */
  private setupEventListeners(): void {
    // Standard resize event
    window.addEventListener("resize", this.handleResize, { passive: true });
    window.addEventListener("orientationchange", this.handleResize, { passive: true });

    // Visual Viewport API for better mobile support
    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        "resize",
        this.handleVisualViewportChange,
        { passive: true }
      );
    }

    // Focus events on input elements
    document.addEventListener("focusin", this.handleInputFocus, { passive: true });
    document.addEventListener("focusout", this.handleInputBlur, { passive: true });
  }

  /**
   * Handle standard window resize
   */
  private handleResize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.updateViewportHeight();
      this.detectKeyboardState();
    }, 150);
  }

  /**
   * Handle Visual Viewport API changes (better for mobile)
   */
  private handleVisualViewportChange(): void {
    if (!window.visualViewport) return;

    const viewport = window.visualViewport;
    const vh = viewport.height * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);

    this.viewportState.currentHeight = viewport.height;
    this.detectKeyboardState();
  }

  /**
   * Update viewport height CSS custom property
   */
  private updateViewportHeight(): void {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);

    this.viewportState.currentHeight = window.innerHeight;
  }

  /**
   * Detect if virtual keyboard is open based on viewport changes
   */
  private detectKeyboardState(): void {
    const heightDifference = this.viewportState.initialHeight - this.viewportState.currentHeight;
    const threshold = Math.min(150, this.viewportState.initialHeight * 0.25);

    const wasKeyboardOpen = this.viewportState.isKeyboardOpen;
    this.viewportState.isKeyboardOpen = heightDifference > threshold;

    // Only trigger callbacks if state changed
    if (wasKeyboardOpen !== this.viewportState.isKeyboardOpen) {
      this.toggleKeyboardClasses(this.viewportState.isKeyboardOpen);
      this.notifyCallbacks(this.viewportState.isKeyboardOpen);
    }
  }

  /**
   * Handle input focus events
   */
  private handleInputFocus = (event: FocusEvent): void => {
    const target = event.target as HTMLElement;

    if (this.isInputElement(target)) {
      // Small delay to allow keyboard to appear
      setTimeout(() => {
        this.detectKeyboardState();
        this.scrollInputIntoView(target);
      }, 300);
    }
  };

  /**
   * Handle input blur events
   */
  private handleInputBlur = (): void => {
    // Delay to allow keyboard to disappear
    setTimeout(() => {
      this.detectKeyboardState();
    }, 300);
  };

  /**
   * Check if element is an input element
   */
  private isInputElement(element: HTMLElement): boolean {
    const inputTypes = ['input', 'textarea', 'select'];
    return inputTypes.includes(element.tagName.toLowerCase()) ||
           element.contentEditable === 'true';
  }

  /**
   * Scroll input element into view when keyboard opens
   */
  private scrollInputIntoView(element: HTMLElement): void {
    if (!this.viewportState.isKeyboardOpen) return;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const threshold = viewportHeight * 0.8;

    if (rect.bottom > threshold) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }

  /**
   * Toggle CSS classes for keyboard state
   */
  private toggleKeyboardClasses(isKeyboardOpen: boolean): void {
    const body = document.body;
    const terminal = document.querySelector('.terminal');
    const terminalBody = document.querySelector('.terminal-body');
    const terminalContent = document.querySelector('.terminal-content');
    const asciiArt = document.querySelector('.ascii-art');

    if (isKeyboardOpen) {
      body.classList.add('keyboard-open');
      terminal?.classList.add('keyboard-open');
      terminalBody?.classList.add('keyboard-open');
      terminalContent?.classList.add('keyboard-open');
      asciiArt?.classList.add('keyboard-open');
    } else {
      body.classList.remove('keyboard-open');
      terminal?.classList.remove('keyboard-open');
      terminalBody?.classList.remove('keyboard-open');
      terminalContent?.classList.remove('keyboard-open');
      asciiArt?.classList.remove('keyboard-open');
    }
  }

  /**
   * Notify all subscribed callbacks
   */
  private notifyCallbacks(isKeyboardOpen: boolean): void {
    this.callbacks.forEach(callback => {
      try {
        callback(isKeyboardOpen);
      } catch (error) {
        console.warn('Error in keyboard state callback:', error);
      }
    });
  }

  /**
   * Prevent zoom on input focus (iOS Safari)
   */
  private preventZoom(): void {
    // Add viewport meta tag if not present
    let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;

    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }

    // Set viewport to prevent zoom
    const viewportContent = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    viewportMeta.content = viewportContent;

    // iOS Safari specific: prevent zoom on input focus
    const style = document.createElement('style');
    style.textContent = `
      input, textarea, select {
        font-size: 16px !important;
        transform: translateZ(0);
        -webkit-appearance: none;
        border-radius: 0;
      }
    `;
    document.head.appendChild(style);
  }
}

// Export singleton instance
export const mobileKeyboardHandler = new MobileKeyboardHandler();

// Export utility functions
export const useMobileKeyboard = () => {
  return {
    init: () => mobileKeyboardHandler.init(),
    destroy: () => mobileKeyboardHandler.destroy(),
    isKeyboardOpen: () => mobileKeyboardHandler.isKeyboardOpen(),
    onKeyboardToggle: (callback: (isKeyboardOpen: boolean) => void) =>
      mobileKeyboardHandler.onKeyboardToggle(callback),
  };
};

// Auto-initialize on import if in browser
if (typeof window !== 'undefined') {
  // Initialize after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      mobileKeyboardHandler.init();
    });
  } else {
    mobileKeyboardHandler.init();
  }
}
