"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface MobileKeyboardState {
  isKeyboardOpen: boolean;
  viewportHeight: number;
  initialHeight: number;
}

interface UseMobileKeyboardOptions {
  threshold?: number;
  debounceMs?: number;
  enableAutoScroll?: boolean;
}

export const useMobileKeyboard = (options: UseMobileKeyboardOptions = {}) => {
  const {
    threshold = 150,
    debounceMs = 150,
    enableAutoScroll = true,
  } = options;

  const [keyboardState, setKeyboardState] = useState<MobileKeyboardState>({
    isKeyboardOpen: false,
    viewportHeight: typeof window !== "undefined" ? window.innerHeight : 0,
    initialHeight: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialHeightRef = useRef<number>(0);
  const callbacksRef = useRef<Set<(isOpen: boolean) => void>>(new Set());

  // Initialize viewport height tracking
  const initializeViewport = useCallback(() => {
    if (typeof window === "undefined") return;

    const setViewportHeight = () => {
      if (typeof window === "undefined") return 0;

      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      if (initialHeightRef.current === 0) {
        initialHeightRef.current = window.innerHeight;
      }

      return window.innerHeight;
    };

    const height = setViewportHeight();
    setKeyboardState((prev) => ({
      ...prev,
      viewportHeight: height,
      initialHeight: initialHeightRef.current || height,
    }));
  }, []);

  // Detect keyboard state based on viewport changes
  const detectKeyboardState = useCallback(
    (currentHeight: number) => {
      const heightDifference = initialHeightRef.current - currentHeight;
      const isKeyboardOpen = heightDifference > threshold;

      setKeyboardState((prev) => {
        if (prev.isKeyboardOpen !== isKeyboardOpen) {
          // Toggle CSS classes
          const body = document.body;
          const terminal = document.querySelector(".terminal");
          const terminalBody = document.querySelector(".terminal-body");
          const terminalContent = document.querySelector(".terminal-content");
          const asciiArt = document.querySelector(".ascii-art");

          if (isKeyboardOpen) {
            body.classList.add("keyboard-open");
            terminal?.classList.add("keyboard-open");
            terminalBody?.classList.add("keyboard-open");
            terminalContent?.classList.add("keyboard-open");
            asciiArt?.classList.add("keyboard-open");
          } else {
            body.classList.remove("keyboard-open");
            terminal?.classList.remove("keyboard-open");
            terminalBody?.classList.remove("keyboard-open");
            terminalContent?.classList.remove("keyboard-open");
            asciiArt?.classList.remove("keyboard-open");
          }

          // Notify callbacks
          callbacksRef.current.forEach((callback) => {
            try {
              callback(isKeyboardOpen);
            } catch (error) {
              console.warn("Mobile keyboard callback error:", error);
            }
          });
        }

        return {
          ...prev,
          isKeyboardOpen,
          viewportHeight: currentHeight,
        };
      });
    },
    [threshold],
  );

  // Handle viewport changes
  const handleViewportChange = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (typeof window === "undefined") return;

      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const vh = currentHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      detectKeyboardState(currentHeight);
    }, debounceMs);
  }, [detectKeyboardState, debounceMs]);

  // Handle input focus
  const handleInputFocus = useCallback(
    (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      const isInput =
        ["input", "textarea", "select"].includes(
          target.tagName.toLowerCase(),
        ) || target.contentEditable === "true";

      if (isInput) {
        setTimeout(() => {
          const currentHeight =
            window.visualViewport?.height || window.innerHeight;
          detectKeyboardState(currentHeight);

          // Auto-scroll input into view if enabled
          if (enableAutoScroll && keyboardState.isKeyboardOpen) {
            const rect = target.getBoundingClientRect();
            const viewportHeight =
              window.visualViewport?.height || window.innerHeight;

            if (rect.bottom > viewportHeight * 0.8) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
            }
          }
        }, 300);
      }
    },
    [detectKeyboardState, enableAutoScroll, keyboardState.isKeyboardOpen],
  );

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    setTimeout(() => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      detectKeyboardState(currentHeight);
    }, 300);
  }, [detectKeyboardState]);

  // Handle orientation change
  const handleOrientationChange = useCallback(() => {
    setTimeout(() => {
      initialHeightRef.current = window.innerHeight;
      initializeViewport();
    }, 500);
  }, [initializeViewport]);

  // Subscribe to keyboard state changes
  const onKeyboardToggle = useCallback(
    (callback: (isOpen: boolean) => void) => {
      callbacksRef.current.add(callback);

      return () => {
        callbacksRef.current.delete(callback);
      };
    },
    [],
  );

  // Force focus on input (mobile-safe)
  const focusInput = useCallback((inputElement: HTMLInputElement) => {
    if (!inputElement || typeof window === "undefined") return;

    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      // Prevent double-tap zoom and handle mobile quirks
      const event = new TouchEvent("touchstart", {
        bubbles: true,
        cancelable: true,
        touches: [],
      });

      inputElement.dispatchEvent(event);

      setTimeout(() => {
        if (inputElement) {
          inputElement.focus({ preventScroll: true });
        }
      }, 50);
    } else {
      inputElement.focus();
    }
  }, []);

  // Prevent zoom on iOS
  const preventZoom = useCallback(() => {
    if (typeof window === "undefined") return;

    // Update viewport meta tag
    const viewportMeta = document.querySelector(
      'meta[name="viewport"]',
    ) as HTMLMetaElement;

    if (viewportMeta) {
      viewportMeta.content =
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    }

    // Add styles to prevent zoom
    const style = document.createElement("style");
    style.textContent = `
      input, textarea, select {
        font-size: 16px !important;
        transform: translateZ(0);
        -webkit-appearance: none;
        border-radius: 0;
      }

      body {
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        text-size-adjust: 100%;
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
      }
    `;

    if (!document.querySelector("#mobile-keyboard-styles")) {
      style.id = "mobile-keyboard-styles";
      document.head.appendChild(style);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Delay initialization to prevent hydration mismatch
    const timer = setTimeout(() => {
      initializeViewport();
      preventZoom();
    }, 0);

    return () => clearTimeout(timer);
  }, [initializeViewport, preventZoom]);

  // Setup event listeners after hydration
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Add event listeners
    window.addEventListener("resize", handleViewportChange, { passive: true });
    window.addEventListener("orientationchange", handleOrientationChange, {
      passive: true,
    });
    document.addEventListener("focusin", handleInputFocus, { passive: true });
    document.addEventListener("focusout", handleInputBlur, { passive: true });

    // Visual Viewport API support
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange, {
        passive: true,
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
      document.removeEventListener("focusin", handleInputFocus);
      document.removeEventListener("focusout", handleInputBlur);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportChange,
        );
      }

      // Clean up CSS classes
      const body = document.body;
      const terminal = document.querySelector(".terminal");
      const terminalBody = document.querySelector(".terminal-body");
      const terminalContent = document.querySelector(".terminal-content");
      const asciiArt = document.querySelector(".ascii-art");

      body.classList.remove("keyboard-open");
      terminal?.classList.remove("keyboard-open");
      terminalBody?.classList.remove("keyboard-open");
      terminalContent?.classList.remove("keyboard-open");
      asciiArt?.classList.remove("keyboard-open");
    };
  }, [
    handleViewportChange,
    handleOrientationChange,
    handleInputFocus,
    handleInputBlur,
  ]);

  return {
    isKeyboardOpen: keyboardState.isKeyboardOpen,
    viewportHeight: keyboardState.viewportHeight,
    initialHeight: keyboardState.initialHeight,
    onKeyboardToggle,
    focusInput,
  };
};

export default useMobileKeyboard;
