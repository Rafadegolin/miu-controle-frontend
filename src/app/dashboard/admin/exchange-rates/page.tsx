"use client";

import { useEffect, useState } from "react";
import { exchangeRatesActions } from "@/services/exchange-rates.actions";
import { ExchangeRate } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Plus, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";

export default function AdminExchangeRatesPage() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // New Rate Form
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [amount, setAmount] = useState("");

  const loadRates = async () => {
    try {
        const data = await exchangeRatesActions.getRates();
        setRates(data);
    } catch (error) {
        toast.error("Erro ao carregar taxas");
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  const handleUpdateApi = async () => {
      setIsUpdating(true);
      try {
          await exchangeRatesActions.updateRatesFromApi();
          toast.success("Taxas atualizadas com sucesso!");
          loadRates();
      } catch (e) {
          toast.error("Erro ao atualizar taxas da API.");
      } finally {
          setIsUpdating(false);
      }
  };

  const handleAddManualRate = async () => {
      if (!amount || isNaN(Number(amount))) {
          toast.error("Valor inválido");
          return;
      }
      try {
          await exchangeRatesActions.createRate(from.toUpperCase(), to.toUpperCase(), Number(amount));
          toast.success("Taxa manual adicionada!");
          loadRates();
          setAmount("");
      } catch (e) {
          toast.error("Erro ao salvar taxa.");
      }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-white">Gestão de Câmbio</h2>
                <p className="text-gray-400">Verifique e configure as taxas de conversão do sistema.</p>
            </div>
            <Button onClick={handleUpdateApi} disabled={isUpdating} className="bg-[#32d6a5] text-black font-bold">
                {isUpdating ? <Loader2 className="animate-spin mr-2" /> : <RefreshCw className="mr-2" />}
                Atualizar via API
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-[#0b1215] border border-white/5 md:col-span-2">
                <h3 className="text-lg font-bold text-white mb-4">Taxas Atuais</h3>
                {isLoading ? (
                    <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#32d6a5]" /></div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-white/5">
                                <TableHead className="text-gray-400">Par</TableHead>
                                <TableHead className="text-gray-400">Taxa</TableHead>
                                <TableHead className="text-gray-400">Origem</TableHead>
                                <TableHead className="text-gray-400">Data</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rates.map((rate) => (
                                <TableRow key={rate.id} className="border-white/10 hover:bg-white/5">
                                    <TableCell className="font-medium text-white">
                                        {rate.fromCurrency} <span className="text-gray-500">➜</span> {rate.toCurrency}
                                    </TableCell>
                                    <TableCell className="text-[#32d6a5] font-mono font-bold">
                                        {rate.rate.toFixed(4)}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`text-xs px-2 py-1 rounded-full border ${rate.source === 'API' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                            {rate.source}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-xs">
                                        {new Date(rate.date).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Card>

            <Card className="p-6 bg-[#0b1215] border border-white/5 h-fit">
                <h3 className="text-lg font-bold text-white mb-4">Adicionar Taxa Manual</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                             <label className="text-xs text-gray-400 block mb-1">De</label>
                             <Input 
                                value={from} 
                                onChange={(e) => setFrom(e.target.value)} 
                                className="bg-white/5 border-white/10 text-white uppercase"
                             />
                        </div>
                        <div>
                             <label className="text-xs text-gray-400 block mb-1">Para</label>
                             <Input 
                                value={to} 
                                onChange={(e) => setTo(e.target.value)} 
                                className="bg-white/5 border-white/10 text-white uppercase"
                             />
                        </div>
                    </div>
                    <div>
                         <label className="text-xs text-gray-400 block mb-1">Taxa (1 {from} = X {to})</label>
                         <Input 
                            type="number"
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            className="bg-white/5 border-white/10 text-white font-bold"
                            placeholder="Ex: 5.15"
                         />
                    </div>
                    <Button onClick={handleAddManualRate} className="w-full bg-[#32d6a5] text-black font-bold">
                        <Save size={16} className="mr-2" /> Salvar Taxa
                    </Button>
                </div>
            </Card>
        </div>
    </div>
  );
}
