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
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import { importActions } from "@/services/import.actions";
import { formatCurrency } from "@/lib/utils";
import { extractApiError } from "@/lib/api-error";
import {
  Account,
  ImportFormat,
  ImportPreviewOptions,
  ImportPreviewResponse,
} from "@/types/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Step = "config" | "preview" | "done";

export function ImportTransactionsModal({ isOpen, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("config");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountId, setAccountId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<ImportFormat>(ImportFormat.OFX);

  // Opções CSV
  const [delimiter, setDelimiter] = useState(";");
  const [decimalSeparator, setDecimalSeparator] = useState(",");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [dateColumn, setDateColumn] = useState("");
  const [amountColumn, setAmountColumn] = useState("");
  const [descriptionColumn, setDescriptionColumn] = useState("");
  const [typeColumn, setTypeColumn] = useState("");

  const [preview, setPreview] = useState<ImportPreviewResponse | null>(null);
  const [result, setResult] = useState<{
    imported: number;
    skipped: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    api.getAccounts(true).then((data: Account[]) => {
      setAccounts(data);
      if (data.length > 0) setAccountId((prev) => prev || data[0].id);
    });
  }, [isOpen]);

  const reset = () => {
    setStep("config");
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  const close = () => {
    reset();
    onClose();
  };

  const isCsv = format === ImportFormat.CSV;

  const handlePreview = async () => {
    if (!file) return toast.error("Selecione um arquivo.");
    if (isCsv && (!dateColumn || !amountColumn || !descriptionColumn)) {
      return toast.error("Mapeie as colunas de data, valor e descrição.");
    }
    setLoading(true);
    try {
      const options: ImportPreviewOptions = isCsv
        ? {
            format,
            delimiter,
            decimalSeparator,
            dateFormat,
            hasHeader: true,
            dateColumn,
            amountColumn,
            descriptionColumn,
            typeColumn: typeColumn || undefined,
          }
        : { format };
      const res = await importActions.preview(file, options);
      setPreview(res);
      setStep("preview");
    } catch (err) {
      toast.error(extractApiError(err, "Falha ao ler o arquivo."));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!preview || !accountId) return;
    setLoading(true);
    try {
      const res = await importActions.confirm({
        accountId,
        transactions: preview.transactions,
      });
      setResult({ imported: res.imported, skipped: res.skipped });
      setStep("done");
      onSuccess?.();
    } catch (err) {
      toast.error(extractApiError(err, "Falha ao importar."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="bg-[#0b1215] border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar extrato (OFX/CSV)</DialogTitle>
        </DialogHeader>

        {step === "config" && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Conta de destino</label>
              <Select value={accountId} onValueChange={setAccountId}>
                <SelectTrigger className="bg-[#020809] border-white/10">
                  <SelectValue placeholder="Selecione a conta" />
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Formato</label>
                <Select
                  value={format}
                  onValueChange={(v) => setFormat(v as ImportFormat)}
                >
                  <SelectTrigger className="bg-[#020809] border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ImportFormat.OFX}>OFX</SelectItem>
                    <SelectItem value={ImportFormat.CSV}>CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-400">Arquivo (máx 5MB)</label>
                <Input
                  type="file"
                  accept={isCsv ? ".csv,text/csv" : ".ofx"}
                  className="bg-[#020809] border-white/10 file:text-gray-300"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            {isCsv && (
              <div className="space-y-3 rounded-lg border border-white/5 bg-white/5 p-3">
                <p className="text-xs font-semibold text-gray-400">
                  Mapeamento de colunas (nome do cabeçalho ou índice)
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    placeholder="Coluna Data *"
                    value={dateColumn}
                    onChange={(e) => setDateColumn(e.target.value)}
                    className="bg-[#020809] border-white/10"
                  />
                  <Input
                    placeholder="Coluna Valor *"
                    value={amountColumn}
                    onChange={(e) => setAmountColumn(e.target.value)}
                    className="bg-[#020809] border-white/10"
                  />
                  <Input
                    placeholder="Coluna Descrição *"
                    value={descriptionColumn}
                    onChange={(e) => setDescriptionColumn(e.target.value)}
                    className="bg-[#020809] border-white/10"
                  />
                  <Input
                    placeholder="Coluna Tipo (opc)"
                    value={typeColumn}
                    onChange={(e) => setTypeColumn(e.target.value)}
                    className="bg-[#020809] border-white/10"
                  />
                  <Input
                    placeholder="Separador (;)"
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="bg-[#020809] border-white/10"
                  />
                  <Input
                    placeholder="Decimal (,)"
                    value={decimalSeparator}
                    onChange={(e) => setDecimalSeparator(e.target.value)}
                    className="bg-[#020809] border-white/10"
                  />
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger className="bg-[#020809] border-white/10 col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["DD/MM/YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "MM/DD/YYYY"].map(
                        (f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                onClick={handlePreview}
                disabled={loading || !accountId || !file}
                className="bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#2bc293]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <UploadCloud size={16} className="mr-2" /> Analisar
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "preview" && preview && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <SummaryTile label="Transações" value={String(preview.count)} />
              <SummaryTile
                label="Entradas"
                value={formatCurrency(preview.summary.totalIncome)}
                positive
              />
              <SummaryTile
                label="Saídas"
                value={formatCurrency(preview.summary.totalExpense)}
              />
            </div>

            <div className="max-h-64 overflow-y-auto rounded-lg border border-white/5">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-gray-400 sticky top-0">
                  <tr>
                    <th className="text-left px-3 py-2">Data</th>
                    <th className="text-left px-3 py-2">Descrição</th>
                    <th className="text-right px-3 py-2">Valor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {preview.transactions.slice(0, 100).map((t, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2 text-gray-400">{t.date}</td>
                      <td className="px-3 py-2">{t.description}</td>
                      <td
                        className={`px-3 py-2 text-right font-medium ${
                          t.type === "INCOME" ? "text-[#32d6a5]" : "text-white"
                        }`}
                      >
                        {t.type === "INCOME" ? "+" : "-"}{" "}
                        {formatCurrency(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {preview.count > 100 && (
              <p className="text-xs text-gray-500">
                Mostrando 100 de {preview.count}. Todas serão importadas
                (duplicatas são ignoradas automaticamente).
              </p>
            )}

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setStep("config")}
                className="border-white/10 text-white hover:bg-white/5"
              >
                Voltar
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#2bc293]"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  `Importar ${preview.count} transações`
                )}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === "done" && result && (
          <div className="space-y-4 text-center py-4">
            <div className="w-14 h-14 rounded-2xl bg-[#32d6a5]/10 grid place-items-center text-[#32d6a5] mx-auto">
              <UploadCloud size={26} />
            </div>
            <h3 className="text-lg font-semibold">Importação concluída</h3>
            <p className="text-gray-400">
              <span className="text-[#32d6a5] font-bold">{result.imported}</span>{" "}
              importadas
              {result.skipped > 0 && (
                <>
                  {" "}
                  · <span className="text-gray-300">{result.skipped}</span>{" "}
                  duplicadas ignoradas
                </>
              )}
              .
            </p>
            <DialogFooter>
              <Button
                onClick={close}
                className="bg-[#32d6a5] text-[#020809] font-bold hover:bg-[#2bc293] mx-auto"
              >
                Concluir
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SummaryTile({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/5 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p
        className={`text-lg font-bold ${positive ? "text-[#32d6a5]" : "text-white"}`}
      >
        {value}
      </p>
    </div>
  );
}
