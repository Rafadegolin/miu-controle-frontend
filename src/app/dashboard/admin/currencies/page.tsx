"use client";

import { useEffect, useState } from "react";
import { getCurrencies, toggleCurrencyActive, createCurrency } from "@/services/currencies.actions";
import { Currency } from "@/types/api";
import { Loader2, Plus, DollarSign, Power, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

export default function AdminCurrenciesPage() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Form State
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newSymbol, setNewSymbol] = useState("");
  const [newLocale, setNewLocale] = useState("");
  const [creating, setCreating] = useState(false);

  async function loadData() {
    try {
      setLoading(true);
      // Fetch ALL currencies (active and inactive)
      const data = await getCurrencies(false); 
      setCurrencies(data);
    } catch (error) {
      toast.error("Erro ao carregar moedas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleToggle = async (code: string) => {
    try {
      const updated = await toggleCurrencyActive(code);
      setCurrencies(prev => prev.map(c => c.code === code ? updated : c));
      toast.success(`Moeda ${updated.code} ${updated.isActive ? 'ativada' : 'desativada'} com sucesso.`);
    } catch (error) {
      toast.error("Erro ao atualizar moeda");
    }
  };

  const handleCreate = async () => {
    if (!newCode || !newName || !newSymbol) {
        toast.error("Preencha os campos obrigatórios");
        return;
    }

    try {
        setCreating(true);
        const created = await createCurrency({
            code: newCode.toUpperCase(),
            name: newName,
            symbol: newSymbol,
            locale: newLocale || undefined
        });
        
        setCurrencies(prev => [...prev, created]);
        toast.success("Moeda adicionada com sucesso!");
        setIsCreateOpen(false);
        
        // Reset form
        setNewCode("");
        setNewName("");
        setNewSymbol("");
        setNewLocale("");
    } catch (error) {
        toast.error("Erro ao criar moeda");
    } finally {
        setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="text-[#32d6a5]" /> Gerenciar Moedas
          </h2>
          <p className="text-gray-400">Configure as moedas disponíveis no sistema.</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#32d6a5] hover:bg-[#2bc293] text-[#020809] font-bold">
              <Plus className="mr-2" size={18} /> Nova Moeda
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0b1215] border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Moeda</DialogTitle>
              <DialogDescription className="text-gray-400">
                Cadastre uma nova divisa ISO 4217.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">Código</Label>
                <Input 
                    id="code" 
                    placeholder="EX: GBP" 
                    value={newCode} 
                    onChange={e => setNewCode(e.target.value.toUpperCase())}
                    className="col-span-3 bg-white/5 border-white/10 text-white" 
                    maxLength={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Nome</Label>
                <Input 
                    id="name" 
                    placeholder="Libra Esterlina" 
                    value={newName} 
                    onChange={e => setNewName(e.target.value)}
                    className="col-span-3 bg-white/5 border-white/10 text-white" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="symbol" className="text-right">Símbolo</Label>
                <Input 
                    id="symbol" 
                    placeholder="£" 
                    value={newSymbol} 
                    onChange={e => setNewSymbol(e.target.value)}
                    className="col-span-3 bg-white/5 border-white/10 text-white" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="locale" className="text-right">Locale (Opc)</Label>
                <Input 
                    id="locale" 
                    placeholder="en-GB" 
                    value={newLocale} 
                    onChange={e => setNewLocale(e.target.value)}
                    className="col-span-3 bg-white/5 border-white/10 text-white" 
                />
              </div>
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setIsCreateOpen(false)} disabled={creating}>Cancelar</Button>
                <Button onClick={handleCreate} disabled={creating} className="bg-[#32d6a5] text-black hover:bg-[#2bc293]">
                    {creating ? <Loader2 className="animate-spin" /> : "Salvar"}
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currencies.map((currency) => (
          <Card 
            key={currency.code} 
            className={`p-5 transition-all flex flex-col justify-between min-h-[160px] border ${
                currency.isActive 
                ? 'bg-linear-to-br from-[#0b1215] to-[#131f24] border-[#32d6a5]/30' 
                : 'bg-gray-900/50 border-gray-800 opacity-60 grayscale'
            }`}
          >
            <div>
                <div className="flex justify-between items-start mb-2">
                    <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                        <span className="text-xl font-bold text-white">{currency.symbol}</span>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        currency.isActive 
                        ? 'bg-[#32d6a5]/10 text-[#32d6a5] border-[#32d6a5]/20' 
                        : 'bg-gray-800 text-gray-400 border-gray-700'
                    }`}>
                        {currency.code}
                    </div>
                </div>
                <h3 className="font-bold text-white text-lg">{currency.name}</h3>
                <p className="text-xs text-gray-500 font-mono mt-1">
                    Ex: {formatCurrency(1234.56, currency.code, currency.locale)}
                </p>
            </div>
            
            <div className="flex justify-end mt-4">
                <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleToggle(currency.code)}
                    className={currency.isActive ? "text-red-400 hover:text-red-300 hover:bg-red-900/20" : "text-green-400 hover:text-green-300 hover:bg-green-900/20"}
                >
                    <Power size={14} className="mr-2" />
                    {currency.isActive ? "Desativar" : "Ativar"}
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
