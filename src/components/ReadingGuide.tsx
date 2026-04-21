"use client";

import { useEffect, useState } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export function ReadingGuide() {
  const { settings } = useAccessibility();
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (!settings.readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Ensure the readiing guide stays within the viewport nicely
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [settings.readingGuide]);

  if (!settings.readingGuide) return null;

  return (
    <>
      <div 
        className="fixed left-0 w-full h-12 bg-blue-500/10 border-y border-blue-500/30 pointer-events-none z-[9999] transition-opacity duration-150"
        style={{
          top: `${mouseY - 24}px`, // Center the 48px height guide on the mouse
          backdropFilter: "contrast(1.1)"
        }}
      />
      {/* Optional completely black out mask for strict focus 
      <div className="fixed inset-0 pointer-events-none z-[9998] bg-black/40" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${mouseY - 24}px, 0 ${mouseY - 24}px, 0 ${mouseY + 24}px, 100% ${mouseY + 24}px, 100% 100%, 0 100%)` }} />
      */}
    </>
  );
}
