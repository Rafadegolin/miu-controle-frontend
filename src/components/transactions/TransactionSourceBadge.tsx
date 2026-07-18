import {
  Camera,
  Repeat,
  Upload,
  MessageCircle,
  Bell,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { TransactionSource } from "@/types/api";

interface SourceMeta {
  label: string;
  icon: LucideIcon;
  className: string;
}

// MANUAL é a origem padrão → sem badge (evita ruído). As demais ganham badge.
const SOURCE_META: Partial<Record<TransactionSource, SourceMeta>> = {
  [TransactionSource.OCR]: {
    label: "Recibo",
    icon: Camera,
    className: "bg-[#32d6a5]/10 text-[#32d6a5] border-[#32d6a5]/20",
  },
  [TransactionSource.RECURRING]: {
    label: "Recorrente",
    icon: Repeat,
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  [TransactionSource.IMPORTED]: {
    label: "Importada",
    icon: Upload,
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  [TransactionSource.WHATSAPP]: {
    label: "WhatsApp",
    icon: MessageCircle,
    className: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  [TransactionSource.NOTIFICATION]: {
    label: "Notificação",
    icon: Bell,
    className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  [TransactionSource.OPEN_BANKING]: {
    label: "Open Finance",
    icon: Landmark,
    className: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
};

export function TransactionSourceBadge({
  source,
}: {
  source?: TransactionSource;
}) {
  if (!source) return null;
  const meta = SOURCE_META[source];
  if (!meta) return null;

  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${meta.className}`}
    >
      <Icon size={11} />
      {meta.label}
    </span>
  );
}
