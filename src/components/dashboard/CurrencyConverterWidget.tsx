"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowRightLeft, Loader2, RefreshCw } from "lucide-react";
import { exchangeRatesActions } from "@/services/exchange-rates.actions";
import { getCurrencies } from "@/services/currencies.actions";
import { toast } from "sonner";
import { Currency } from "@/types/api";

export function CurrencyConverterWidget() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BRL");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrencies().then(setCurrencies);
    handleConvert(); // Initial convert
  }, []);

  const handleConvert = async () => {
      if (!amount || isNaN(Number(amount))) return;
      
      setLoading(true);
      try {
          const res = await exchangeRatesActions.convertCurrency(Number(amount), fromCurrency, toCurrency);
          setResult(res.convertedAmount);
          setRate(res.rate);
      } catch (error) {
          toast.error("Erro ao converter ou taxa não encontrada.");
          setResult(null);
          setRate(null);
      } finally {
          setLoading(false);
      }
  };

  const swapCurrencies = () => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      // Trigger convert after state update (using useEffect or just calling handleConvert with swapped values is tricky without effect, 
      // simple way is to useEffect on from/to but that might trigger on initial load too many times. 
      // Let's just wait for user to click convert or use a distinct effect for auto-convert)
  };
  
  // Auto-convert when deps change
  useEffect(() => {
      const timeout = setTimeout(() => {
        if(amount && fromCurrency && toCurrency) handleConvert();
      }, 500);
      return () => clearTimeout(timeout);
  }, [amount, fromCurrency, toCurrency]);

  return (
    <Card className="p-6 bg-[#0b1215] border border-white/5 relative overflow-hidden h-full flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2">
                <RefreshCw size={18} className="text-[#32d6a5]" />
                Conversor
            </h3>
            {rate && (
                <div className="text-xs text-gray-500">
                    1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                </div>
            )}
        </div>

        <div className="space-y-4">
             <div>
                 <Input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white/5 border-white/10 text-white text-2xl font-bold font-mono text-center h-14"
                 />
             </div>

             <div className="flex items-center gap-2">
                 <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                        {currencies.map(c => (
                            <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                        ))}
                    </SelectContent>
                 </Select>

                 <Button size="icon" variant="ghost" onClick={swapCurrencies} className="shrink-0 text-[#32d6a5] hover:bg-[#32d6a5]/10 rounded-full">
                     <ArrowRightLeft size={18} />
                 </Button>

                 <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1215] border-white/10 text-white">
                        {currencies.map(c => (
                            <SelectItem key={c.code} value={c.code}>{c.code}</SelectItem>
                        ))}
                    </SelectContent>
                 </Select>
             </div>

             <div className="bg-[#131b20] rounded-xl p-4 text-center border border-white/5 min-h-[80px] flex flex-col justify-center items-center">
                 {loading ? (
                     <Loader2 className="animate-spin text-[#32d6a5]" />
                 ) : (
                     <>
                        <p className="text-gray-400 text-xs">Valor Convertido</p>
                        <p className="text-3xl font-bold text-[#32d6a5] tracking-tight">
                            {result?.toLocaleString('pt-BR', { style: 'currency', currency: toCurrency })}
                        </p>
                     </>
                 )}
             </div>
        </div>
    </Card>
  );
}
