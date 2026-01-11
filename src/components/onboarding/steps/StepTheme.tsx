"use client";

import { useFormContext, useController } from 'react-hook-form';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import { Check, ArrowLeft, ArrowRight, Sun, Moon, Palette, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const themes = [
  {
    id: 'original-dark',
    name: 'Miu Default',
    description: 'Nossa experiência premium.',
    icon: Moon,
    color: '#020809', // Deep Ocean
    accent: '#32d6a5' // Neon Teal
  },
  {
    id: 'original-light',
    name: 'Light',
    description: 'Clean e moderno.',
    icon: Sun,
    color: '#ffffff',
    accent: '#32d6a5'
  },
  {
    id: 'simple-dark',
    name: 'OLED',
    description: 'Preto absoluto.',
    icon: Palette,
    color: '#000000',
    accent: '#ffffff'
  },
  {
    id: 'simple-light',
    name: 'Minimal',
    description: 'Sem distrações.',
    icon: Layers,
    color: '#f4f4f5',
    accent: '#18181b'
  }
];

export default function StepTheme({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const { control } = useFormContext();
  const { setTheme } = useTheme();

  const { field } = useController({
    name: 'theme',
    control,
    defaultValue: 'original-dark' 
  });

  const handleThemeChange = (themeId: string) => {
    field.onChange(themeId); // Update form state
    setTheme(themeId); // Update next-themes state
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-2">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Escolha seu Estilo</h2>
        <p className="text-sm text-muted-foreground">Personalize sua experiência visual.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={cn(
              "cursor-pointer group relative p-4 rounded-xl border transition-all duration-200",
              field.value === theme.id 
                ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(50,214,165,0.1)]" 
                : "border-border hover:border-primary/50 bg-card hover:bg-muted/50"
            )}
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start">
                 <div className={cn("p-2 rounded-lg bg-muted/20")}>
                    <theme.icon className={cn("w-5 h-5", field.value === theme.id ? "text-primary" : "text-muted-foreground")} />
                 </div>
                 {field.value === theme.id && (
                   <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                     <Check className="w-3 h-3 text-primary-foreground font-bold" />
                   </div>
                 )}
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground text-sm">{theme.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{theme.description}</p>
              </div>
            </div>

            {/* Mini Visual Preview */}
            <div className="mt-4 flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
               <div 
                 className="h-8 w-full rounded shadow-sm border border-border" 
                 style={{ backgroundColor: theme.color }}
               />
               <div 
                 className="h-8 w-1/3 rounded shadow-sm" 
                 style={{ backgroundColor: theme.accent }}
               />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-6 w-full justify-between items-center mt-auto">
        <Button variant="ghost" onClick={onPrev} className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/20">
          <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
        </Button>
        <Button 
          onClick={onNext} 
          className="cursor-pointer rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 h-10 transition-transform hover:scale-105"
        >
          Confirmar <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
