"use client";

import React, { useEffect } from "react";
import { Terminal } from "../components/Terminal";

export default function Home() {
  useEffect(() => {
    // Prevent flash of unstyled content
    const timer = setTimeout(() => {
      document.documentElement.classList.add("loaded");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      <Terminal />
    </main>
  );
}
