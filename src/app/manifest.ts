import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Miu - Controle Financeiro Inteligente",
    short_name: "Miu",
    description: "Controle suas finanças em piloto automático com IA",
    start_url: "/dashboard?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#020809",
    theme_color: "#020809",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["finance", "productivity", "business"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Nova transação",
        short_name: "Nova",
        url: "/dashboard/transactions?new=1",
      },
      {
        name: "Relatórios",
        short_name: "Relatórios",
        url: "/dashboard/reports",
      },
    ],
  };
}
