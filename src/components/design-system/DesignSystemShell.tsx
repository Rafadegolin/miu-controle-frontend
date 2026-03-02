"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  Palette,
  Type,
  LayoutGrid,
  BarChart2,
  Table2,
  Layers,
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { TypographySection } from "./TypographySection";
import { ColorPaletteSection } from "./ColorPaletteSection";
import { ComponentsSection } from "./ComponentsSection";
import { ChartsSection } from "./ChartsSection";
import { TablesSection } from "./TablesSection";
import { FeedbackSection } from "./FeedbackSection";
import { PatternsSection } from "./PatternsSection";

const THEMES = [
  {
    id: "original-dark",
    label: "Original Dark",
    icon: Moon,
    accent: "#32d6a5",
  },
  {
    id: "original-light",
    label: "Original Light",
    icon: Sun,
    accent: "#2563eb",
  },
  { id: "simple-dark", label: "Simple Dark", icon: Monitor, accent: "#ffffff" },
  {
    id: "simple-light",
    label: "Simple Light",
    icon: Monitor,
    accent: "#000000",
  },
];

const THEME_GRADIENTS: Record<string, string> = {
  "original-dark":
    "radial-gradient(circle at 10% 20%, #0c4a55 0%, transparent 40%), radial-gradient(circle at 90% 80%, #1f8566 0%, transparent 40%)",
  "original-light":
    "radial-gradient(circle at 10% 20%, #bfdbfe 0%, transparent 40%), radial-gradient(circle at 90% 80%, #bbf7d0 0%, transparent 40%)",
  "simple-dark": "none",
  "simple-light": "none",
};

const NAV_SECTIONS = [
  { id: "typography", label: "Tipografia", icon: Type },
  { id: "colors", label: "Paleta de Cores", icon: Palette },
  { id: "components", label: "Componentes", icon: LayoutGrid },
  { id: "charts", label: "Gráficos", icon: BarChart2 },
  { id: "tables", label: "Tabelas", icon: Table2 },
  { id: "feedback", label: "Feedback & Alertas", icon: Layers },
  { id: "patterns", label: "Padrões da UI", icon: LayoutGrid },
];

export function DesignSystemShell() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("typography");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const gradient = THEME_GRADIENTS[theme ?? "original-dark"] ?? "none";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Gradient background — igual ao dashboard */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: gradient }}
      />
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              {sidebarOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span
                className="font-semibold text-lg"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Miu Design System
              </span>
              <Badge
                variant="secondary"
                className="text-xs hidden sm:inline-flex"
              >
                v1.0
              </Badge>
            </div>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            {THEMES.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  title={t.label}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 max-w-screen-2xl mx-auto w-full">
        {/* Sidebar */}
        <aside
          className={cn(
            "sticky top-[57px] h-[calc(100vh-57px)] shrink-0 border-r border-border bg-card/50 transition-all duration-300 overflow-y-auto",
            sidebarOpen ? "w-56" : "w-0 overflow-hidden border-r-0",
          )}
        >
          <nav className="p-3 flex flex-col gap-1 mt-2">
            {NAV_SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleNavClick(s.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left w-full",
                    activeSection === s.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {s.label}
                </button>
              );
            })}
          </nav>

          {/* Current Theme Info */}
          <div className="mx-3 mt-4 p-3 rounded-lg border border-border bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Tema ativo</p>
            <p className="text-sm font-medium">
              {THEMES.find((t) => t.id === theme)?.label ?? theme}
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-6 lg:p-8 space-y-16">
          <SectionWrapper id="typography" onVisible={setActiveSection}>
            <TypographySection />
          </SectionWrapper>

          <SectionWrapper id="colors" onVisible={setActiveSection}>
            <ColorPaletteSection />
          </SectionWrapper>

          <SectionWrapper id="components" onVisible={setActiveSection}>
            <ComponentsSection />
          </SectionWrapper>

          <SectionWrapper id="charts" onVisible={setActiveSection}>
            <ChartsSection />
          </SectionWrapper>

          <SectionWrapper id="tables" onVisible={setActiveSection}>
            <TablesSection />
          </SectionWrapper>

          <SectionWrapper id="feedback" onVisible={setActiveSection}>
            <FeedbackSection />
          </SectionWrapper>

          <SectionWrapper id="patterns" onVisible={setActiveSection}>
            <PatternsSection />
          </SectionWrapper>
        </main>
      </div>
    </div>
  );
}

function SectionWrapper({
  id,
  children,
  onVisible,
}: {
  id: string;
  children: React.ReactNode;
  onVisible: (id: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible(id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [id, onVisible]);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
}
