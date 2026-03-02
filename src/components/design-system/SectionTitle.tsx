"use client";

import {
  Type,
  Palette,
  LayoutGrid,
  BarChart2,
  Table2,
  Layers,
} from "lucide-react";

const ICONS = { Type, Palette, LayoutGrid, BarChart2, Table2, Layers } as const;
type IconName = keyof typeof ICONS;

interface SectionTitleProps {
  icon: IconName;
  title: string;
  description?: string;
}

export function SectionTitle({ icon, title, description }: SectionTitleProps) {
  const Icon = ICONS[icon];
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="size-4 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground ml-12">{description}</p>
      )}
      <div className="mt-4 h-px bg-linear-to-r from-primary/30 via-border to-transparent" />
    </div>
  );
}
