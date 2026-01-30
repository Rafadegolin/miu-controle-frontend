"use client";

import { useEffect, useState } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Wallet, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrencies } from '@/services/currencies.actions';
import { Currency } from '@/types/api';

export default function StepCurrency({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const { register, control } = useFormContext();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { field } = useController({
    name: 'currency',
    control,
    defaultValue: 'BRL'
  });

  useEffect(() => {
    async function load() {
        try {
            const list = await getCurrencies(true);
            setCurrencies(list);
        } catch (error) {
            console.error("Failed to load currencies", error);
        } finally {
            setLoading(false);
        }
    }
    load();
  }, []);

  const selectedCurrency = currencies.find(c => c.code === field.value);

  return (
    <div className="flex flex-col items-center space-y-6 py-2 w-full max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Moeda & Renda</h2>
        <p className="text-sm text-muted-foreground">Escolha a moeda principal da sua conta.</p>
      </div>

      <div className="w-full space-y-6 bg-card/50 p-6 rounded-xl border border-border backdrop-blur-md shadow-sm">
        
        <div className="space-y-3">
          <Label className="text-base font-semibold text-foreground">Moeda Principal</Label>
          
          {loading ? (
             <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-primary" />
             </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
                {currencies.map((curr) => (
                <div 
                    key={curr.code}
                    onClick={() => field.onChange(curr.code)}
                    className={cn(
                    "cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200",
                    field.value === curr.code 
                        ? "border-primary bg-primary/10 text-primary shadow-inner" 
                        : "border-border hover:border-primary/50 text-muted-foreground hover:bg-muted/20"
                    )}
                >
                    <span className="font-bold text-xl">{curr.code}</span>
                    <span className="text-xs font-medium opacity-80 text-center line-clamp-1">
                        {curr.name}
                    </span>
                    <span className="text-[10px] bg-background/50 px-2 py-0.5 rounded-full border border-border">
                        {curr.symbol}
                    </span>
                </div>
                ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="monthlyIncome" className="text-base font-semibold text-foreground flex items-center gap-2">
            <Wallet className="w-4 h-4 text-primary" /> Renda Mensal (Opcional)
          </Label>
          <div className="relative">
             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">
               {selectedCurrency?.symbol || '$'}
             </span>
             <Input 
              id="monthlyIncome"
              type="number"
              placeholder="0,00"
              className="pl-12 text-lg h-12 bg-background/50 border-input focus-visible:ring-primary focus-visible:border-primary transition-all"
              {...register('monthlyIncome', { valueAsNumber: true })}
             />
          </div>
          <p className="text-xs text-muted-foreground">
            Usado apenas para gerar insights personalizados.
          </p>
        </div>

      </div>

      <div className="flex gap-4 pt-4 w-full justify-between">
        <Button variant="ghost" onClick={onPrev} className="cursor-pointer text-muted-foreground">
          <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
        </Button>
        <Button onClick={onNext} size="lg" className="cursor-pointer px-8 rounded-full shadow-lg shadow-primary/20">
          Continuar <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
