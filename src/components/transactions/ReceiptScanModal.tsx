"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Camera, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import { transactionsActions } from "@/services/transactions.actions";
import { extractApiError } from "@/lib/api-error";
import {
  Account,
  Category,
  ReceiptPreview,
  TransactionType,
} from "@/types/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Step = "upload" | "review";

const today = () => new Date().toISOString().split("T")[0];

export function ReceiptScanModal({ isOpen, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("upload");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<ReceiptPreview | null>(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [date, setDate] = useState(today());
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    api.getAccounts(true).then((data: Account[]) => {
      setAccounts(data);
      if (data.length > 0) setAccountId((prev) => prev || data[0].id);
    });
    api.getCategories().then((data: Category[]) => setCategories(data));
  }, [isOpen]);

  const reset = () => {
    setStep("upload");
    setPreview(null);
    setDescription("");
    setAmount("");
    setType(TransactionType.EXPENSE);
    setDate(today());
    setCategoryId("");
  };

  const close = () => {
    reset();
    onClose();
  };

  const handleAnalyze = async (file: File) => {
    setLoading(true);
    try {
      const res = await transactionsActions.analyzeReceipt(file);
      const p = res.preview;
      setPreview(p);
      setDescription(p.description ?? p.merchant ?? "");
      setAmount(p.amount != null ? String(p.amount) : "");
      setType(p.type ?? TransactionType.EXPENSE);
      setDate(p.date ?? today());
      setCategoryId(p.categoryId ?? "");
      setStep("review");
    } catch (err) {
      toast.error(extractApiError(err, "Não foi possível ler o recibo."));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!accountId) return toast.error("Selecione uma conta.");
    if (!categoryId) return toast.error("Selecione uma categoria.");
    const value = Number(amount);
    if (!value || value <= 0) return toast.error("Informe um valor válido.");

    setLoading(true);
    try {
      await transactionsActions.confirmReceipt({
        accountId,
        categoryId,
        type,
        amount: value,
        description: description || "Recibo",
        date,
        merchant: preview?.merchant ?? undefined,
        receiptImageUrl: preview?.receiptImageUrl ?? undefined,
        receiptRawText: preview?.rawText ?? undefined,
        receiptItems: preview?.items,
      });
      toast.success("Transação criada a partir do recibo!");
      onSuccess?.();
      close();
    } catch (err) {
      toast.error(extractApiError(err, "Falha ao salvar a transação."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="bg-[#0b1215] border-white/10 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera size={18} className="text-[#32d6a5]" /> Escanear recibo (OCR)
          </DialogTitle>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Envie uma foto ou PDF do comprovante. A IA extrai valor, data e
              estabelecimento para você conferir.
            </p>
            <label className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 p-10 cursor-pointer hover:border-[#32d6a5]/40 transition-colors">
              {loading ? (
                <Loader2 className="animate-spin text-[#32d6a5]" size={28} />
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-[#32d6a5]/10 grid place-items-center text-[#32d6a5]">
                    <Sparkles size={22} />
                  </div>
                  <span className="text-sm text-gray-300">
                    Toque para enviar a imagem do recibo
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*,application/pdf"
                capture="environment"
                className="hidden"
                disabled={loading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleAnalyze(f);
                }}
              />
            </label>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4">
            {preview && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Sparkles size={13} className="text-[#32d6a5]" />
                Extraído por IA · confiança{" "}
                {Math.round((preview.confidence ?? 0) * 100)}%
              </div>
            )}

            <div>
              <label className="text-sm text-gray-400">Descrição</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#020809] border-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Valor</label>
                <Input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#020809] border-white/10"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Data</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-[#020809] border-white/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Tipo</label>
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as TransactionType)}
                >
                  <SelectTrigger className="bg-[#020809] border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TransactionType.EXPENSE}>
                      Despesa
                    </SelectItem>
                    <SelectItem value={TransactionType.INCOME}>
                      Receita
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Conta</label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger className="bg-[#020809] border-white/10">
                    <SelectValue placeholder="Conta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">Categoria</label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="bg-[#020809] border-white/10">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setStep("upload")}
                className="border-white/10 text-white hover:bg-white/5"
              >
                Trocar imagem
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#2bc293]"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Salvar transação"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
