"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "miu-install-dismissed";

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [isIOS, setIsIOS] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
        true;
    if (isStandalone || localStorage.getItem(DISMISS_KEY)) return;

    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    const isSafari = /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua);
    if (ios && isSafari) {
      setIsIOS(true);
      setShow(true);
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      setShow(true);
    };
    const onInstalled = () => setShow(false);

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-[60] mx-auto max-w-md rounded-2xl border border-[#32d6a5]/20 bg-[#06181b]/95 p-4 shadow-lg shadow-[#32d6a5]/10 backdrop-blur lg:bottom-6">
      <button
        onClick={dismiss}
        aria-label="Fechar"
        className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-white"
      >
        <X size={18} />
      </button>
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#32d6a5] text-[#020809]">
          <Download size={22} />
        </div>
        <div className="pr-6">
          <p className="font-semibold text-white">Instalar o Miu</p>
          {isIOS ? (
            <p className="mt-1 text-sm text-gray-300">
              Toque em <Share size={14} className="inline align-text-bottom" />{" "}
              Compartilhar e depois em{" "}
              <strong className="text-white">Adicionar à Tela de Início</strong>
              .
            </p>
          ) : (
            <>
              <p className="mt-1 text-sm text-gray-300">
                Use o Miu como app, direto na sua tela inicial.
              </p>
              <button
                onClick={install}
                className="mt-3 rounded-lg bg-[#32d6a5] px-4 py-2 text-sm font-semibold text-[#020809] transition-transform active:scale-95"
              >
                Instalar app
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
