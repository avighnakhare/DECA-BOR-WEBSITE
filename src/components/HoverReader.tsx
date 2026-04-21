"use client";

import { useEffect, useRef } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export function HoverReader() {
  const { settings } = useAccessibility();
  // We use a ref so we can cancel the exact utterance that is playing on mouseout
  const activeUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!settings.hoverToRead) {
      window.speechSynthesis.cancel();
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for readable text nodes
      if (
        ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'A', 'BUTTON', 'SPAN', 'LABEL'].includes(target.tagName) ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('role') === 'link'
      ) {
        const text = target.innerText || target.textContent;
        if (text && text.trim().length > 0) {
          // Add a small delay so we don't spam speech when moving mouse quickly
          if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
          
          hoverTimeout.current = setTimeout(() => {
            // Cancel any current speech
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text.trim());
            utterance.rate = 0.9;
            activeUtterance.current = utterance;
            
            // Add a subtle style to show what's being read
            const originalOutline = target.style.outline;
            const originalOutlineOffset = target.style.outlineOffset;
            
            target.style.outline = "2px dashed #f59e0b"; // amber-500
            target.style.outlineOffset = "4px";
            
            utterance.onend = () => {
              target.style.outline = originalOutline;
              target.style.outlineOffset = originalOutlineOffset;
            };
            
            utterance.onerror = () => {
              target.style.outline = originalOutline;
              target.style.outlineOffset = originalOutlineOffset;
            };

            window.speechSynthesis.speak(utterance);
          }, 300); // 300ms delay before speaking
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
      }
      
      // Stop speaking when mouse leaves the element
      if (activeUtterance.current) {
         window.speechSynthesis.cancel();
         activeUtterance.current = null;
      }
      
      // Clean up outline just in case
      const target = e.target as HTMLElement;
      if (target && target.style) {
         target.style.outline = "";
         target.style.outlineOffset = "";
      }
    };

    // Attach listeners to document body
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      window.speechSynthesis.cancel();
    };
  }, [settings.hoverToRead]);

  return null; // Invisible global tracking component
}
