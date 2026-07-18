/* Miu Controle Service Worker — manual, agnóstico ao bundler (Turbopack-safe) */
const VERSION = "v1";
const SHELL_CACHE = `miu-shell-${VERSION}`;
const STATIC_CACHE = `miu-static-${VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE = [OFFLINE_URL, "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  // Sem skipWaiting automático: app financeiro, evitamos trocar chunks no meio da sessão.
  // O novo SW ativa no próximo carregamento (ou via mensagem SKIP_WAITING abaixo).
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => ![SHELL_CACHE, STATIC_CACHE].includes(key))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // 1) Cross-origin (API financeira api.miucontrole.com.br, socket.io) -> bypass total.
  //    Garante que dados financeiros/tokens JWT nunca são cacheados e que
  //    refresh de token + websocket permanecem intactos.
  if (url.origin !== self.location.origin) return;

  // 2) RSC / dados do App Router -> sempre rede (nada de view autenticada stale).
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) return;

  // 3) Build assets imutáveis (content-hashed) -> Cache First.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // 4) Imagens/ícones/fontes same-origin -> Stale-While-Revalidate.
  if (/\.(?:png|jpe?g|svg|gif|webp|ico|woff2?)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // 5) Navegações (HTML) -> Network First com fallback offline.
  if (request.mode === "navigate") {
    event.respondWith(networkFirstWithOffline(request));
    return;
  }

  // Resto same-origin: deixa passar (rede).
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => hit);
  return hit || network;
}

async function networkFirstWithOffline(request) {
  try {
    return await fetch(request);
  } catch {
    const cache = await caches.open(SHELL_CACHE);
    const offline = await cache.match(OFFLINE_URL);
    return offline || Response.error();
  }
}

/* --- Fase 2: Web Push (stub preparado, requer VAPID + backend) ---
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Miu", {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: data.url || "/dashboard" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
});
*/
