"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define all the available accessibility modes
export type AccessibilityState = {
  largeText: boolean;
  extraLargeText: boolean;
  highContrast: boolean;
  darkMode: boolean;
  dyslexiaFont: boolean;
  grayscale: boolean;
  focusHighlight: boolean;
  reducedMotion: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  hoverToRead: boolean;
};

// Define macro presets
export type CarePreset = "none" | "senior" | "caregiver";

type AccessibilityContextType = {
  settings: AccessibilityState;
  activePreset: CarePreset;
  toggleSetting: (key: keyof AccessibilityState) => void;
  activatePreset: (preset: CarePreset) => void;
  resetAll: () => void;
};

const defaultSettings: AccessibilityState = {
  largeText: false,
  extraLargeText: false,
  highContrast: false,
  darkMode: false,
  dyslexiaFont: false,
  grayscale: false,
  focusHighlight: false,
  reducedMotion: false,
  bigCursor: false,
  readingGuide: false,
  hoverToRead: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilityState>(defaultSettings);
  const [activePreset, setActivePreset] = useState<CarePreset>("none");
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("audiology-acc-state");
      const savedPreset = localStorage.getItem("audiology-acc-preset") as CarePreset;
      if (saved) {
        setSettings(JSON.parse(saved));
      }
      if (savedPreset) {
        setActivePreset(savedPreset);
      }
    } catch (e) {
      console.warn("Failed to load accessibility settings from local storage");
    }
    setIsInitialized(true);
  }, []);

  // Sync to HTML element classes and local storage whenever settings change
  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("audiology-acc-state", JSON.stringify(settings));
    localStorage.setItem("audiology-acc-preset", activePreset);

    const html = document.documentElement;

    // A helper to toggle classes cleanly based on state
    const updateClass = (stateVal: boolean, className: string) => {
      if (stateVal) html.classList.add(className);
      else html.classList.remove(className);
    };

    updateClass(settings.largeText, "acc-large-text");
    updateClass(settings.extraLargeText, "acc-xl-text");
    updateClass(settings.highContrast, "acc-high-contrast");
    updateClass(settings.darkMode, "acc-dark");
    updateClass(settings.dyslexiaFont, "acc-dyslexia");
    updateClass(settings.grayscale, "acc-grayscale");
    updateClass(settings.focusHighlight, "acc-focus");
    updateClass(settings.reducedMotion, "acc-motion");
    updateClass(settings.bigCursor, "acc-cursor");

  }, [settings, activePreset, isInitialized]);

  const toggleSetting = (key: keyof AccessibilityState) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      
      // Handle mutually exclusive settings
      if (key === "largeText" && next.largeText) next.extraLargeText = false;
      if (key === "extraLargeText" && next.extraLargeText) next.largeText = false;
      
      return next;
    });
    // Break out of preset mode if user manually overrides a setting
    setActivePreset("none"); 
  };

  const activatePreset = (preset: CarePreset) => {
    setActivePreset(preset);
    if (preset === "senior") {
      setSettings({
        ...defaultSettings,
        largeText: true,
        highContrast: true,
        focusHighlight: true,
        reducedMotion: true,
      });
    } else if (preset === "caregiver") {
      setSettings({
        ...defaultSettings,
        reducedMotion: true,
        focusHighlight: true,
        grayscale: true, // often helps caregivers focus entirely on UI logic
      });
    } else {
      setSettings(defaultSettings);
    }
  };

  const resetAll = () => {
    setSettings(defaultSettings);
    setActivePreset("none");
  };

  // Don't display children until we've hydration matched (prevents React mismatch on initial render)
  // But we MUST still wrap them in the Provider so that components using the context don't throw errors during SSR
  if (!isInitialized) {
    return (
      <AccessibilityContext.Provider value={{ settings, activePreset, toggleSetting, activatePreset, resetAll }}>
        <div style={{ visibility: 'hidden', display: 'none' }}>{children}</div>
      </AccessibilityContext.Provider>
    );
  }

  return (
    <AccessibilityContext.Provider value={{ settings, activePreset, toggleSetting, activatePreset, resetAll }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
