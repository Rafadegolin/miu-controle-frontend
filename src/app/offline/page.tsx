import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline - Miu",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 bg-[#020809] px-6 text-center text-white">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#32d6a5] text-2xl font-bold text-[#020809]">
        M
      </div>
      <h1 className="text-xl font-semibold">Você está offline</h1>
      <p className="max-w-xs text-gray-400">
        Reconecte-se à internet para continuar usando o Miu.
      </p>
    </div>
  );
}
