"use client";

import { useEffect, useState } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { 
  X, Type, Languages, Contrast, Moon, Eye, MousePointer2, 
  Activity, ArrowRight, RotateCcw, HeartHandshake, FileText, 
  AlignLeft, TypeOutline, Volume2, VolumeX
} from "lucide-react";
import { Button } from "./ui/button";

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const { settings, activePreset, toggleSetting, activatePreset, resetAll } = useAccessibility();

  if (!isOpen) return null;

  const PresetCard = ({ 
    presetId, 
    icon: Icon, 
    title, 
    description 
  }: { 
    presetId: "senior" | "caregiver", 
    icon: any, 
    title: string, 
    description: string 
  }) => (
    <button
      onClick={() => activatePreset(presetId)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        activePreset === presetId 
          ? "border-primary bg-primary/5 shadow-md" 
          : "border-slate-200 hover:border-primary/40 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${activePreset === presetId ? "bg-primary text-primary-foreground" : "bg-slate-100 text-slate-600"}`}>
          <Icon size={20} />
        </div>
        <h4 className="font-semibold text-foreground text-lg">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );

  const ToggleRow = ({ 
    settingKey, 
    icon: Icon, 
    label 
  }: { 
    settingKey: keyof typeof settings, 
    icon: any, 
    label: string 
  }) => (
    <button
      onClick={() => toggleSetting(settingKey)}
      className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
        settings[settingKey] 
          ? "border-primary bg-primary/5" 
          : "border-transparent hover:bg-slate-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={settings[settingKey] ? "text-primary" : "text-slate-500"} />
        <span className={`font-medium ${settings[settingKey] ? "text-primary" : "text-foreground"}`}>
          {label}
        </span>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings[settingKey] ? "bg-primary" : "bg-slate-300"}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings[settingKey] ? "translate-x-6" : "translate-x-0"}`} />
      </div>
    </button>
  );

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div 
        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-background shadow-2xl z-[101] flex flex-col animate-in slide-in-from-right duration-300 border-l"
        role="dialog"
        aria-modal="true"
        aria-labelledby="acc-panel-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-muted/30">
          <div>
            <h2 id="acc-panel-title" className="text-2xl font-semibold text-foreground tracking-tight">
              Accessibility
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Adjust this site for easier reading and navigation.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            aria-label="Close accessibility panel"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Audio Controls */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Audio & Speech</h3>
            <div className="space-y-4 bg-white border rounded-xl p-4 shadow-sm">
              <button
                onClick={() => toggleSetting('hoverToRead')}
                className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all ${
                  settings.hoverToRead 
                    ? "border-amber-500 bg-amber-50 shadow-sm" 
                    : "border-transparent border bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {settings.hoverToRead ? (
                    <Volume2 size={18} className="text-amber-600" />
                  ) : (
                    <VolumeX size={18} className="text-slate-600" />
                  )}
                  <span className={`font-medium ${settings.hoverToRead ? "text-amber-700" : "text-foreground"}`}>
                    Hover to Read (Screen Reader)
                  </span>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.hoverToRead ? "bg-amber-500" : "bg-slate-300"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.hoverToRead ? "translate-x-6" : "translate-x-0"}`} />
                </div>
              </button>
              <p className="text-xs text-slate-500 pl-1">When turned on, the computer will automatically read text aloud when you point your mouse at it.</p>
            </div>
          </section>

          {/* Smart Presets */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Smart Presets</h3>
            <div className="space-y-3">
              <PresetCard 
                presetId="senior"
                icon={HeartHandshake}
                title="Senior Comfort Mode"
                description="Larger text, high contrast, and reduced motion for an easier, calmer reading experience."
              />
              <PresetCard 
                presetId="caregiver"
                icon={FileText}
                title="Caregiver Mode"
                description="Reduces visual distractions to help focus on navigating forms and booking appointments."
              />
            </div>
          </section>

          {/* Reading & Text */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Reading & Text</h3>
            <div className="space-y-1 bg-white border rounded-xl p-2 shadow-sm">
              <ToggleRow settingKey="largeText" icon={Type} label="Large Text" />
              <ToggleRow settingKey="extraLargeText" icon={TypeOutline} label="Extra Large Text" />
              <ToggleRow settingKey="dyslexiaFont" icon={Languages} label="Dyslexia Friendly Font" />
              <ToggleRow settingKey="readingGuide" icon={AlignLeft} label="Reading Guide Bar" />
            </div>
          </section>

          {/* Display & Contrast */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Display & Contrast</h3>
            <div className="space-y-1 bg-white border rounded-xl p-2 shadow-sm">
              <ToggleRow settingKey="highContrast" icon={Contrast} label="High Contrast" />
              <ToggleRow settingKey="darkMode" icon={Moon} label="Dark Mode" />
              <ToggleRow settingKey="grayscale" icon={Eye} label="Grayscale (Remove Color)" />
            </div>
          </section>

          {/* Interaction & Motion */}
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Interaction & Motion</h3>
            <div className="space-y-1 bg-white border rounded-xl p-2 shadow-sm">
              <ToggleRow settingKey="focusHighlight" icon={ArrowRight} label="Focus Highlight" />
              <ToggleRow settingKey="bigCursor" icon={MousePointer2} label="Large Cursor" />
              <ToggleRow settingKey="reducedMotion" icon={Activity} label="Reduce Motion & Animations" />
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/30">
          <Button 
            variant="outline" 
            className="w-full gap-2 font-semibold h-12"
            onClick={resetAll}
          >
            <RotateCcw size={18} />
            Reset All Settings
          </Button>
        </div>

      </div>
    </>
  );
}
