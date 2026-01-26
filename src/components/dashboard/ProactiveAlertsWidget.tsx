"use client";

import { useProactiveAlerts, useDismissProactiveAlert } from "@/hooks/useProactiveAlerts";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, AlertTriangle, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./styles/Dashboard.module.css";
// We can use the same glassCard style or a more distinct alert style
// Let's make it stand out

export function ProactiveAlertsWidget() {
  const { data: alerts } = useProactiveAlerts();
  const { mutate: dismiss } = useDismissProactiveAlert();

  if (!alerts || alerts.length === 0) return null;

  return (
    <div className={`${styles.colSpan12} space-y-3`}>
      <AnimatePresence initial={false}>
        {alerts.map((alert) => {
          const isCritical = alert.priority === "CRITICAL";
          const bgColor = isCritical ? "bg-red-500/10" : "bg-yellow-500/10";
          const borderColor = isCritical ? "border-red-500/20" : "border-yellow-500/20";
          const iconColor = isCritical ? "text-red-500" : "text-yellow-500";
          const Icon = isCritical ? AlertCircle : AlertTriangle;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-4 p-4 rounded-xl border ${bgColor} ${borderColor} backdrop-blur-md relative overflow-hidden`}
            >
              <div className={`p-2 rounded-full ${isCritical ? "bg-red-500/10" : "bg-yellow-500/10"}`}>
                <Icon className={iconColor} size={24} />
              </div>
              
              <div className="flex-1 pt-1">
                <div className="flex justify-between items-start">
                   <h3 className={`font-bold text-base ${isCritical ? "text-red-400" : "text-yellow-400"}`}>
                      {alert.type === "NEGATIVE_BALANCE" ? "Risco de Saldo Negativo" : "Conta Próxima do Vencimento"}
                   </h3>
                   <span className="text-xs text-gray-400">
                      {format(new Date(alert.createdAt), "HH:mm", { locale: ptBR })}
                   </span>
                </div>
                
                <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                  {alert.message}
                </p>

                {alert.data && alert.data.balanceDate && (
                   <p className="text-xs text-gray-500 mt-2">
                      Previsão para: {format(new Date(alert.data.balanceDate), "dd 'de' MMM", { locale: ptBR })}
                   </p>
                )}
              </div>

              <button
                onClick={() => dismiss(alert.id)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
