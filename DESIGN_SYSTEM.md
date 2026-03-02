# Miu Controle — Design System Guide

> Guia completo de componentes e padrões visuais para a construção do **app mobile** do Miu Controle.  
> Todas as especificações foram extraídas diretamente da rota `/design-system` do frontend web.

---

## Índice

1. [Fundação — Tema e Tokens](#1-fundação--tema-e-tokens)
2. [Fundação — Gradientes de Fundo](#2-fundação--gradientes-de-fundo)
3. [Fundação — Tipografia](#3-fundação--tipografia)
4. [Sistema Glassmorphism](#4-sistema-glassmorphism)
5. [Componentes — Botões](#5-componentes--botões)
6. [Componentes — Badges](#6-componentes--badges)
7. [Componentes — Cards](#7-componentes--cards)
8. [Componentes — Formulários](#8-componentes--formulários)
9. [Componentes — Feedback Inline (Alertas)](#9-componentes--feedback-inline-alertas)
10. [Componentes — Toasts](#10-componentes--toasts)
11. [Componentes — Notificações](#11-componentes--notificações)
12. [Componentes — Loading States](#12-componentes--loading-states)
13. [Componentes — Overlays e Modais](#13-componentes--overlays-e-modais)
14. [Componentes — Outros (Switch, Progress, Tabs, Avatar, Skeleton, Pagination)](#14-componentes--outros)
15. [Padrões da UI — Stat Cards](#15-padrões-da-ui--stat-cards)
16. [Padrões da UI — Transaction Items](#16-padrões-da-ui--transaction-items)
17. [Padrões da UI — Category Icon Badges](#17-padrões-da-ui--category-icon-badges)
18. [Padrões da UI — Circular Ring Progress](#18-padrões-da-ui--circular-ring-progress)
19. [Padrões da UI — Sidebar / Drawer Navigation](#19-padrões-da-ui--sidebar--drawer-navigation)
20. [Padrões da UI — Gamification Widgets](#20-padrões-da-ui--gamification-widgets)
21. [Padrões da UI — Proactive Alert Items](#21-padrões-da-ui--proactive-alert-items)
22. [Gráficos (Charts)](#22-gráficos-charts)
23. [Tabelas](#23-tabelas)
24. [Notas para Adaptação Mobile](#24-notas-para-adaptação-mobile)

---

## 1. Fundação — Tema e Tokens

O app suporta **4 temas**: dois escuros e dois claros. O tema padrão é `original-dark`.

### Identificadores de Tema

| ID               | Nome Visual          | Tipo            |
| ---------------- | -------------------- | --------------- |
| `original-dark`  | Teal/Verde Neon      | Escuro (padrão) |
| `original-light` | Ocean Blue           | Claro           |
| `simple-dark`    | Monocromático Escuro | Escuro          |
| `simple-light`   | Monocromático Claro  | Claro           |

> **Regra crítica**: Para detectar se o tema é escuro, use lógica explícita:  
> `isDark = theme === "original-dark" || theme === "simple-dark"`  
> Prefixos como `dark:` do Tailwind **NÃO funcionam** com `data-theme` attribute.

---

### Tabela de CSS Tokens por Tema

| Token CSS              | `original-dark`             | `original-light`          | `simple-dark`       | `simple-light`      |
| ---------------------- | --------------------------- | ------------------------- | ------------------- | ------------------- |
| `--background`         | `#020809`                   | `oklch(0.985 0 0)`        | `oklch(0.1 0 0)`    | `oklch(1 0 0)`      |
| `--foreground`         | `#ffffff`                   | `oklch(0.145 0 0)`        | `oklch(0.9 0 0)`    | `oklch(0.1 0 0)`    |
| `--card`               | `#06181b`                   | `oklch(1 0 0)`            | `oklch(0.15 0 0)`   | `oklch(0.96 0 0)`   |
| `--card-foreground`    | `#ffffff`                   | `oklch(0.145 0 0)`        | `oklch(0.9 0 0)`    | `oklch(0.1 0 0)`    |
| `--popover`            | `#06181b`                   | `oklch(1 0 0)`            | `oklch(0.15 0 0)`   | `oklch(1 0 0)`      |
| `--primary`            | `#32d6a5`                   | `oklch(0.55 0.15 240)`    | `oklch(0.9 0 0)`    | `oklch(0.1 0 0)`    |
| `--primary-foreground` | `#ffffff`                   | `oklch(0.985 0 0)`        | `oklch(0.1 0 0)`    | `oklch(1 0 0)`      |
| `--secondary`          | `#0c4a55`                   | `oklch(0.97 0 0)`         | `oklch(0.2 0 0)`    | `oklch(0.9 0 0)`    |
| `--muted`              | `#0c4a55`                   | `oklch(0.97 0 0)`         | `oklch(0.2 0 0)`    | `oklch(0.9 0 0)`    |
| `--muted-foreground`   | `#94a3b8`                   | `oklch(0.556 0 0)`        | `oklch(0.6 0 0)`    | `oklch(0.5 0 0)`    |
| `--accent`             | `#2dd4bf`                   | `oklch(0.97 0 0)`         | `oklch(0.2 0 0)`    | `oklch(0.9 0 0)`    |
| `--destructive`        | `oklch(0.704 0.191 22.216)` | `oklch(0.577 0.245 27.3)` | `oklch(0.5 0.2 25)` | `oklch(0.6 0.2 25)` |
| `--border`             | `rgba(255,255,255,0.08)`    | `oklch(0.922 0 0)`        | `oklch(0.3 0 0)`    | `oklch(0.85 0 0)`   |
| `--input`              | `rgba(0,0,0,0.3)`           | `oklch(0.922 0 0)`        | `oklch(0.3 0 0)`    | `oklch(0.85 0 0)`   |
| `--ring`               | `#32d6a5`                   | `oklch(0.55 0.15 240)`    | `oklch(0.8 0 0)`    | `oklch(0.1 0 0)`    |
| `--sidebar`            | `#020809`                   | `oklch(0.985 0 0)`        | `oklch(0.1 0 0)`    | `oklch(1 0 0)`      |
| `--sidebar-foreground` | `#ffffff`                   | `oklch(0.145 0 0)`        | `oklch(0.9 0 0)`    | `oklch(0.1 0 0)`    |
| `--sidebar-primary`    | `#32d6a5`                   | `oklch(0.55 0.15 240)`    | `oklch(0.9 0 0)`    | `oklch(0.1 0 0)`    |
| `--sidebar-accent`     | `#0c4a55`                   | `oklch(0.97 0 0)`         | `oklch(0.2 0 0)`    | `oklch(0.9 0 0)`    |
| `--sidebar-border`     | `rgba(255,255,255,0.08)`    | `oklch(0.922 0 0)`        | `oklch(0.3 0 0)`    | `oklch(0.85 0 0)`   |

---

### Tokens de Gráficos (`--chart-1` a `--chart-5`)

Os tokens de chart variam por tema. Use sempre as variáveis CSS para garantir adaptação automática.

| Token       | `original-dark`              | `original-light`            | `simple-dark`        | `simple-light`       |
| ----------- | ---------------------------- | --------------------------- | -------------------- | -------------------- |
| `--chart-1` | `oklch(0.488 0.243 264.376)` | `oklch(0.646 0.222 41.116)` | `oklch(0.5 0.2 250)` | `oklch(0.5 0.2 250)` |
| `--chart-2` | `oklch(0.696 0.17 162.48)`   | `oklch(0.6 0.118 184.704)`  | `oklch(0.5 0.2 150)` | `oklch(0.5 0.2 150)` |
| `--chart-3` | `oklch(0.769 0.188 70.08)`   | `oklch(0.398 0.07 227.392)` | `oklch(0.5 0.2 50)`  | `oklch(0.5 0.2 50)`  |
| `--chart-4` | `oklch(0.627 0.265 303.9)`   | `oklch(0.828 0.189 84.429)` | `oklch(0.5 0.2 300)` | `oklch(0.5 0.2 300)` |
| `--chart-5` | `oklch(0.645 0.246 16.439)`  | `oklch(0.769 0.188 70.08)`  | `oklch(0.5 0.2 100)` | `oklch(0.5 0.2 100)` |

> Nos temas `simple-*` as cores de gráfico são geradas com luminância fixa `0.5` e croma `0.2`, variando apenas o ângulo de matiz (hue): azul (250°), verde (150°), laranja (50°), roxo (300°), amarelo-verde (100°).

---

## 2. Fundação — Gradientes de Fundo

Apenas os temas `original-dark` e `original-light` possuem gradientes de fundo. Os temas `simple-*` usam fundo sólido.

O gradiente é aplicado como camada `position: fixed; z-index: 0` sobre o `--background`, e o conteúdo fica em `position: relative; z-index: 10`.

### `original-dark`

```css
background:
  radial-gradient(circle at 10% 20%, #0c4a55 0%, transparent 40%),
  radial-gradient(circle at 90% 80%, #1f8566 0%, transparent 40%);
```

- Canto superior esquerdo: `#0c4a55` (teal escuro)
- Canto inferior direito: `#1f8566` (verde esmeralda)

### `original-light`

```css
background:
  radial-gradient(circle at 10% 20%, #bfdbfe 0%, transparent 40%),
  radial-gradient(circle at 90% 80%, #bbf7d0 0%, transparent 40%);
```

- Canto superior esquerdo: `#bfdbfe` (azul claro)
- Canto inferior direito: `#bbf7d0` (verde menta claro)

### Estrutura de camadas

```
┌─────────────────────────────────────┐
│  position: fixed; inset: 0; z: 0   │  ← gradiente de fundo
│  (pointer-events: none)             │
├─────────────────────────────────────┤
│  background: var(--background)      │  ← fundo sólido base
└─────────────────────────────────────┘
         ↓ Conteúdo (z: 10) ↓
```

---

## 3. Fundação — Tipografia

### Famílias de Fonte

| Variável         | Família | Uso                                |
| ---------------- | ------- | ---------------------------------- |
| `--font-poppins` | Poppins | Display, hero, headings principais |
| `--font-inter`   | Inter   | Corpo, UI, labels, formulários     |

Inter é a fonte padrão do sistema. Poppins é aplicada explicitamente via `font-family: var(--font-poppins)`.

---

### Escala de Texto (13 estilos)

| Nome                 | Classes Tailwind                                                      | Uso                                |
| -------------------- | --------------------------------------------------------------------- | ---------------------------------- |
| **Display / Hero**   | `text-5xl font-bold tracking-tight [font-family:var(--font-poppins)]` | Títulos de página, hero sections   |
| **H1**               | `text-4xl font-bold tracking-tight`                                   | Cabeçalho principal de tela        |
| **H2**               | `text-3xl font-semibold`                                              | Seções maiores                     |
| **H3**               | `text-2xl font-semibold`                                              | Subseções                          |
| **H4**               | `text-xl font-semibold`                                               | Cards de destaque                  |
| **H5**               | `text-lg font-medium`                                                 | Títulos de card                    |
| **H6**               | `text-base font-medium`                                               | Títulos menores                    |
| **Body**             | `text-base font-normal leading-relaxed`                               | Texto de conteúdo principal        |
| **Body Small**       | `text-sm font-normal leading-relaxed`                                 | Texto secundário, descrições       |
| **Caption / Helper** | `text-xs text-muted-foreground`                                       | Labels de input, ajuda contextual  |
| **Overline / Tag**   | `text-xs font-semibold uppercase tracking-widest text-primary`        | Rótulos de seção, categorias       |
| **Mono / Code**      | `text-sm font-mono bg-muted px-2 py-0.5 rounded`                      | Valores monetários, specs técnicas |
| **Lead / Destaque**  | `text-lg text-muted-foreground font-light`                            | Subtítulos, descrições de hero     |

---

### Pesos de Fonte (8 níveis)

| Peso | Nome       | Classe Tailwind   |
| ---- | ---------- | ----------------- |
| 100  | Thin       | `font-thin`       |
| 200  | ExtraLight | `font-extralight` |
| 300  | Light      | `font-light`      |
| 400  | Regular    | `font-normal`     |
| 500  | Medium     | `font-medium`     |
| 600  | SemiBold   | `font-semibold`   |
| 700  | Bold       | `font-bold`       |
| 800  | ExtraBold  | `font-extrabold`  |

---

## 4. Sistema Glassmorphism

O efeito glass é usado **exclusivamente em temas escuros** sobre o gradiente de fundo.  
Em temas claros, os cards usam `var(--card)` com borda e sombra sutil.

### Variáveis CSS do Glass

```css
--glass-surface: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-highlight: rgba(255, 255, 255, 0.1);

/* hover border */
--glass-border-hover: rgba(255, 255, 255, 0.15);
```

### Variante 1 — Base Glass

```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(10px);
border-radius: 20px;
transition: border 0.3s;

/* hover */
border-color: rgba(255, 255, 255, 0.15);
box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
```

### Variante 2 — Accent Border

Igual ao Base, mas com destaque lateral colorido:

```css
border-left: 4px solid var(--primary);
border-top: 1px solid rgba(255, 255, 255, 0.08);
border-right: 1px solid rgba(255, 255, 255, 0.08);
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
```

### Variante 3 — Highlight (reflexo + glow)

Adiciona pseudo-elemento de gradiente no topo e glow no canto:

```css
/* reflexo topo */
background:
  linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0%, transparent 100%)
    no-repeat top / 100% 1px,
  rgba(255, 255, 255, 0.03);

/* glow no canto */
background-image: radial-gradient(
  circle at 0% 0%,
  rgba(50, 214, 165, 0.12) 0%,
  transparent 60%
);
```

### Quando usar glass vs card sólido

| Situação                                      | Usar                                           |
| --------------------------------------------- | ---------------------------------------------- |
| Tema escuro (`original-dark`, `simple-dark`)  | Glass (`rgba(255,255,255,0.03)` + blur)        |
| Tema claro (`original-light`, `simple-light`) | `var(--card)` + `var(--border)` + sombra sutil |
| Componente sobre gradiente de fundo           | Sempre glass (escuro)                          |
| Cards em lista / tabela                       | Card sólido em ambos os temas                  |

---

## 5. Componentes — Botões

### 8 Variantes

| Variante      | Uso                                 |
| ------------- | ----------------------------------- |
| `default`     | Ação padrão                         |
| `primary`     | Ação principal                      |
| `secondary`   | Ação secundária                     |
| `outline`     | Ação neutra com borda               |
| `ghost`       | Ação discreta, sem fundo            |
| `link`        | Navegação inline                    |
| `destructive` | Ação destrutiva (excluir, etc.)     |
| `mint`        | Ação especial da marca (verde neon) |

### 6 Tamanhos

| Tamanho   | Uso                           |
| --------- | ----------------------------- |
| `sm`      | Compacto, tabelas, listas     |
| `default` | Tamanho padrão                |
| `lg`      | CTAs em cards de destaque     |
| `icon`    | Botão quadrado com ícone      |
| `icon-sm` | Ícone compacto (ações inline) |
| `icon-lg` | Ícone maior                   |

### Estados

| Estado    | Comportamento visual                       |
| --------- | ------------------------------------------ |
| Normal    | Cor sólida conforme variante               |
| Hover     | Brilho ligeiramente aumentado              |
| Disabled  | `opacity: 50%`, não interativo             |
| Loading   | Ícone `Loader2` com `animate-spin` + texto |
| Com ícone | Ícone à esquerda do label                  |

---

## 6. Componentes — Badges

### 8 Variantes

| Variante      | Background             | Texto                         |
| ------------- | ---------------------- | ----------------------------- |
| `default`     | `var(--primary)`       | `var(--primary-foreground)`   |
| `secondary`   | `var(--secondary)`     | `var(--secondary-foreground)` |
| `destructive` | `var(--destructive)`   | branco                        |
| `outline`     | transparente           | `var(--foreground)`           |
| Sucesso       | `rgba(34,197,94,0.15)` | `#22c55e` (green-500)         |
| Atenção       | `rgba(234,179,8,0.15)` | `#eab308` (yellow-500)        |
| Destaque      | `rgba(primary,0.15)`   | `var(--primary)`              |
| Erro          | `rgba(239,68,68,0.15)` | `#ef4444` (red-500)           |

---

## 7. Componentes — Cards

### Variante 1 — Card Padrão

```css
background: var(--card);
border: 1px solid var(--border);
border-radius: 12px;
```

### Variante 2 — Card de Destaque (primary tint)

```css
background: rgba(var(--primary), 0.05); /* bg-primary/5 */
border: 1px solid rgba(var(--primary), 0.3); /* border-primary/30 */
```

### Variante 3 — Card com Gradiente Interno

```css
background: linear-gradient(
  to bottom right,
  rgba(var(--primary), 0.2),
  transparent,
  rgba(var(--accent), 0.1)
);
border: 1px solid var(--border);
```

> Para cards sobre gradiente de fundo em tema escuro, use as variantes Glass descritas na Seção 4.

---

## 8. Componentes — Formulários

### Input / TextArea / Select

| Estado    | Comportamento                                                   |
| --------- | --------------------------------------------------------------- |
| Normal    | `border: 1px solid var(--border)`, `bg: var(--input)`           |
| Focus     | `ring: 2px solid var(--ring)` (geralmente `var(--primary)`)     |
| Disabled  | `opacity: 50%`, cursor bloqueado                                |
| Erro      | `border-color: var(--destructive)`, label em `text-destructive` |
| Com ícone | Ícone à esquerda com `padding-left` aumentado                   |

### Label

```
font-size: text-sm
font-weight: font-medium
color: var(--foreground)
margin-bottom: 4px
```

---

## 9. Componentes — Feedback Inline (Alertas)

> **Importante**: As cores de texto/ícone mudam entre tema escuro e claro para garantir legibilidade.

### Estrutura

```
┌──────────────────────────────────────────┐
│ [ícone]  Título do alerta                │
│          Mensagem descritiva do alerta   │
└──────────────────────────────────────────┘
```

Background e borda usam `rgba` com opacidade `0.10` / `0.30` — funcionam em ambos os temas.

### Tabela de Cores por Variante

| Variante | Ícone           | Background              | Borda                   |
| -------- | --------------- | ----------------------- | ----------------------- |
| Info     | `InfoIcon`      | `rgba(59,130,246,0.10)` | `rgba(59,130,246,0.30)` |
| Success  | `CheckCircle2`  | `rgba(34,197,94,0.10)`  | `rgba(34,197,94,0.30)`  |
| Warning  | `AlertTriangle` | `rgba(234,179,8,0.10)`  | `rgba(234,179,8,0.30)`  |
| Error    | `XCircle`       | `rgba(239,68,68,0.10)`  | `rgba(239,68,68,0.30)`  |

### Cores de Texto e Ícone — Escuro vs Claro

| Variante | Texto (escuro)    | Texto (claro)    | Ícone (escuro)    | Ícone (claro)    |
| -------- | ----------------- | ---------------- | ----------------- | ---------------- |
| Info     | `text-blue-300`   | `text-blue-800`  | `text-blue-400`   | `text-blue-600`  |
| Success  | `text-green-300`  | `text-green-800` | `text-green-400`  | `text-green-600` |
| Warning  | `text-yellow-300` | `text-amber-800` | `text-yellow-400` | `text-amber-600` |
| Error    | `text-red-300`    | `text-red-800`   | `text-red-400`    | `text-red-700`   |

---

## 10. Componentes — Toasts

Usa a biblioteca **Sonner**. Todas as notificações toast aparecem no canto da tela.

| Tipo     | Função                                     | Ícone   |
| -------- | ------------------------------------------ | ------- |
| Sucesso  | `toast.success()`                          | ✅      |
| Erro     | `toast.error()`                            | ❌      |
| Info     | `toast.info()`                             | ℹ️      |
| Warning  | `toast.warning()`                          | ⚠️      |
| Loading  | `toast.loading()`                          | spinner |
| Com ação | `toast()` com `action: { label, onClick }` | —       |

---

## 11. Componentes — Notificações

Cards de notificação em painéis/drawers. Dois estados:

### Não lida

```css
background: rgba(var(--muted), 0.4); /* bg-muted/40 */
cursor: pointer;
transition: background 0.2s;

/* hover */
background: rgba(var(--muted), 0.6); /* bg-muted/60 */
```

- Ponto indicador: `size: 8px`, `background: var(--primary)`, `border-radius: 50%`

### Lida

```css
background: transparent;
cursor: pointer;

/* hover */
background: rgba(var(--muted), 0.2); /* bg-muted/20 */
```

### Estrutura de um item

```
● [avatar/ícone]  Título da notificação          [hora]
                  Corpo da mensagem
```

---

## 12. Componentes — Loading States

### Spinner de botão / inline

```
<Loader2 className="animate-spin size-4" />
```

### Spinner circular standalone

```css
width: 32px;
height: 32px;
border: 3px solid var(--border);
border-top-color: var(--primary);
border-radius: 50%;
animation: spin 1s linear infinite;
```

### Bouncing dots (carregamento de conteúdo)

3 pontos com `animate-bounce` com delays escalonados (`0ms`, `150ms`, `300ms`).

### Skeleton (placeholder de conteúdo)

```css
background: var(--muted);
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
border-radius: 4px; /* ou rounded-full para avatares */
```

---

## 13. Componentes — Overlays e Modais

### Dialog

- Overlay: `background: rgba(0,0,0,0.8)`, fill-screen
- Container: `background: var(--card)`, `border: 1px solid var(--border)`, `border-radius: 12px`
- Estrutura: Header (título + fechar), Body (conteúdo), Footer (ações)

### AlertDialog (confirmação destrutiva)

- Mesma estrutura do Dialog
- Botão de confirmação usa variante `destructive`
- Botão de cancelar usa variante `outline`

### DropdownMenu

- `background: var(--popover)`, `border: 1px solid var(--border)`
- Item hover: `background: var(--accent)`
- `border-radius: 8px`, `min-width: 160px`

### Tooltip

- `background: var(--popover)`, `color: var(--popover-foreground)`
- `border-radius: 6px`, `font-size: text-xs`, `padding: 4px 8px`

---

## 14. Componentes — Outros

### Switch (Toggle)

| Estado   | Visual                                    |
| -------- | ----------------------------------------- |
| Off      | `var(--input)` background, thumb branco   |
| On       | `var(--primary)` background, thumb branco |
| Disabled | `opacity: 50%`                            |

### Progress Bar

| Variante    | Cor da barra           |
| ----------- | ---------------------- |
| Normal      | `var(--primary)`       |
| Destructive | `var(--destructive)`   |
| Warning     | `#eab308` (yellow-500) |

Altura padrão: `h-2` (8px). Track: `var(--muted)`.

### Tabs

- Tab ativa: `background: var(--background)`, shadow sutil, `color: var(--foreground)`
- Tab inativa: `color: var(--muted-foreground)`, sem fundo
- Indicador: tab list tem `background: var(--muted)`, `border-radius: 8px`

### Avatar

| Tamanho | Classe    | Uso              |
| ------- | --------- | ---------------- |
| Pequeno | `size-7`  | Listas compactas |
| Médio   | `size-9`  | Padrão geral     |
| Grande  | `size-12` | Perfil, header   |

Fallback: `background: rgba(var(--primary),0.20)`, `color: var(--primary)`, iniciais em `font-bold`.

### Skeleton

- Texto: `rounded-sm`, variadas larguras (`w-1/2`, `w-3/4`, etc.)
- Avatar: `rounded-full`
- Card/imagem: `h-24 rounded-xl`

### Pagination

- Link normal: `color: var(--muted-foreground)`, sem fundo
- Link ativo: `background: var(--primary)`, `color: var(--primary-foreground)`
- Anterior / Próximo: variante `outline`

---

## 15. Padrões da UI — Stat Cards

Cards do dashboard que exibem totais financeiros. Sempre exibidos **sobre o gradiente de fundo**.

### 3 tipos de card

| Tipo        | Ícone            | Cor do valor        | Cor do ícone bg                                       |
| ----------- | ---------------- | ------------------- | ----------------------------------------------------- |
| Saldo Total | `Wallet`         | `var(--foreground)` | `color-mix(in srgb, var(--primary) 15%, transparent)` |
| Receitas    | `ArrowUpRight`   | `var(--primary)`    | `color-mix(in srgb, var(--primary) 15%, transparent)` |
| Despesas    | `ArrowDownRight` | `#ef4444`           | `rgba(239,68,68,0.15)`                                |

### Estilos por tema

**Tema escuro:**

```css
background: rgba(255, 255, 255, 0.03);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(10px);
border-radius: 20px;
```

**Tema claro:**

```css
background: var(--card);
border: 1px solid var(--border);
box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
border-radius: 20px;
```

### Anatomia do card

```
┌──────────────────────────────────────┐
│  [ícone 36px]        [•••] ou [tag] │
│                                      │
│  Saldo Total                         │  ← text-sm, muted
│  R$ 12.450,00  +12%                 │  ← text-2xl bold + delta
└──────────────────────────────────────┘
```

- Padding: `p-6`
- Ícone: `size-9`, `border-radius: 8px`
- Valor: `text-2xl font-bold`
- Delta/tag: `text-xs`

---

## 16. Padrões da UI — Transaction Items

Itens de lista de transações. Fundo transparente, hover com `bg-muted/40`.

### Anatomia

```
[ícone 40px]   Descrição da transação     + R$ 5.800,00
               Categoria         Data
```

### Estilos

| Elemento  | Receita                               | Despesa (escuro)          | Despesa (claro)           |
| --------- | ------------------------------------- | ------------------------- | ------------------------- |
| Ícone bg  | `color-mix(primary 15%, transparent)` | `rgba(255,255,255,0.04)`  | `var(--muted)`            |
| Ícone cor | `var(--primary)`                      | `var(--muted-foreground)` | `var(--muted-foreground)` |
| Valor cor | `var(--primary)`                      | `var(--foreground)`       | `var(--foreground)`       |

### Especificações

- Container: `border-radius: 12px`, hover `bg-muted/40`, transição suave
- Ícone: `size-10`, `border-radius: 12px`
- Descrição: `text-sm font-semibold`, truncado se longo
- Categoria e data: `text-xs text-muted-foreground`
- Valor: `text-sm font-bold`, prefixo `+` para receitas, `-` para despesas

---

## 17. Padrões da UI — Category Icon Badges

Badges de categoria com cores semânticas **fixas em todos os temas** (brand colors).

| Categoria   | Cor do ícone           | Background               |
| ----------- | ---------------------- | ------------------------ |
| Alimentação | `#fca5a5` (red-300)    | `rgba(252,165,165,0.15)` |
| Compras     | `#86efac` (green-300)  | `rgba(134,239,172,0.15)` |
| Transporte  | `#93c5fd` (blue-300)   | `rgba(147,197,253,0.15)` |
| Moradia     | `#fdba74` (orange-300) | `rgba(253,186,116,0.15)` |
| Saúde       | `#f9a8d4` (pink-300)   | `rgba(249,168,212,0.15)` |
| Educação    | `#c4b5fd` (violet-300) | `rgba(196,181,253,0.15)` |

### Ícones associados (Lucide)

| Categoria   | Ícone                  |
| ----------- | ---------------------- |
| Alimentação | `Coffee` ou `Utensils` |
| Compras     | `ShoppingBag`          |
| Transporte  | `Car`                  |
| Moradia     | `Home`                 |
| Saúde       | `HeartPulse`           |
| Educação    | `Sparkles`             |

### Especificações do badge

- Container: `size-11` (44×44px), `border-radius: 12px`
- Ícone: `size-5` (20×20px)
- Label: `text-xs font-medium`, alinhado ao centro
- Valor: `text-xs text-muted-foreground`

---

## 18. Padrões da UI — Circular Ring Progress

Componente SVG para indicar percentual de uso (orçamentos, metas, etc.).

### Especificações SVG

```
Raio do anel (r):  38% do tamanho total (ex: 88px → r≈33px)
strokeWidth:       8
strokeLinecap:     round
strokeDasharray:   2 × π × r
strokeDashoffset:  1 - (percent/100) × circumference
Rotação base:      -90° (início no topo)
Transição:         stroke-dashoffset 1.5s ease
```

### Cores

```css
/* trilha (track) */
stroke: color-mix(in srgb, var(--primary) 20%, transparent);

/* progresso */
stroke: var(--primary);

/* glow de fundo */
background: radial-gradient(
  circle,
  color-mix(in srgb, var(--primary) 10%, transparent) 0%,
  transparent 70%
);
```

### Label central

- Linha 1: `text-[10px] uppercase tracking-wide text-muted-foreground` → "Usado"
- Linha 2: `text-lg font-bold text-foreground` → valor percentual

### Tamanhos recomendados

| Uso           | Tamanho   |
| ------------- | --------- |
| Mini / inline | 64–72px   |
| Padrão        | 88–96px   |
| Destaque      | 120–140px |

---

## 19. Padrões da UI — Sidebar / Drawer Navigation

No mobile, a sidebar vira um **drawer deslizante** (bottom sheet ou side drawer).

### Tokens utilizados

```
var(--sidebar)             → fundo
var(--sidebar-foreground)  → texto
var(--sidebar-border)      → divisores e bordas
var(--sidebar-primary)     → item ativo, ícone de logo
var(--sidebar-accent)      → hover bg suave
color-mix(in srgb, var(--sidebar-foreground) 38%, transparent) → muted (labels de seção)
```

### Estrutura

```
┌─────────────────────────────────────┐
│ ✦ Miu Controle                      │  ← header (logo)
├─────────────────────────────────────┤
│ PRINCIPAL                           │  ← rótulo de seção (muted 38%)
│   ■ Visão Geral         ← ativo    │  ← item ativo
│   ○ Transações                      │  ← item inativo
│   ○ Relatórios                      │
│   ○ Metas                           │
│   ○ Projeções                       │
│                                     │
│ PLANEJAMENTO                        │
│   ○ Recomendações                   │
│   ○ Assinaturas                     │
├─────────────────────────────────────┤
│ [R]  Rafael Souza     [logout]      │  ← footer do usuário
│      Pro Member                     │
└─────────────────────────────────────┘
```

### Item de Nav — Estados

**Ativo:**

```css
background: color-mix(in srgb, var(--sidebar-primary) 10%, transparent);
color: var(--sidebar-primary);
border-left: 3px solid var(--sidebar-primary);
```

**Inativo:**

```css
background: transparent;
color: color-mix(in srgb, var(--sidebar-foreground) 65%, transparent);
border-left: 3px solid transparent;
```

### Logotipo

```
"✦" cor: var(--primary) + " Miu Controle" cor: var(--foreground) + font: Inter bold
```

### Footer do usuário

```css
background: color-mix(in srgb, var(--sidebar-foreground) 4%, transparent);
border: 1px solid var(--sidebar-border);
border-radius: 12px;
padding: 12px;
```

- Avatar: `size-8`, fallback `bg: primary/20%, color: primary`
- Botão de logout: `text-red-400`, hover `bg-red-400/10`

---

## 20. Padrões da UI — Gamification Widgets

### StreakWidget

Exibe a sequência de dias consecutivos. Cores **fixas, independentes do tema**.

```css
background: rgba(249, 115, 22, 0.1);
border: 1px solid rgba(249, 115, 22, 0.2);
border-radius: 9999px; /* pill */
padding: 6px 12px;
```

- Ícone: `Flame` — `color: #f97316` (orange-500), preenchimento sólido
- Número: `text-sm font-bold font-mono color: #fb923c` (orange-400)

---

### LevelWidget

Exibe nível atual + barra de XP. Aparece no header/topo do app.

**Tema escuro:**

```css
background: rgba(6, 24, 27, 0.8);
border: 1px solid rgba(255, 255, 255, 0.05);
border-radius: 9999px;
```

**Tema claro:**

```css
background: var(--card);
border: 1px solid var(--border);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
border-radius: 9999px;
```

**Badge de nível (círculo do número):**

```css
width: 32px;
height: 32px;
background: linear-gradient(to bottom right, #32d6a5, #1f8566);
color: #020809;
font-weight: bold;
font-size: text-xs;
border-radius: 50%;
box-shadow: 0 0 16px rgba(50, 214, 165, 0.2);
```

**Barra de XP:**

```css
/* track */
background: var(--muted);
height: 6px;
border-radius: 9999px;
overflow: hidden;

/* progresso */
background: linear-gradient(to right, #32d6a5, #2bc293);
height: 100%;
border-radius: 9999px;
```

**Label de % XP:**

```css
color: #32d6a5;
font-size: text-[10px];
font-weight: bold;
```

---

### Level Badges (grade de conquistas)

```css
width: 36px;
height: 36px;
background: linear-gradient(to bottom right, #32d6a5, #1f8566);
color: #020809;
font-weight: bold;
font-size: text-xs;
border-radius: 50%;
box-shadow: 0 0 12px rgba(50, 214, 165, 0.2);
```

> Estas cores são **brand constants** — não variam por tema.  
> Sempre usar `#32d6a5` como cor primária da gamificação.

---

## 21. Padrões da UI — Proactive Alert Items

Alertas proativos que aparecem na interface (ex.: risco de saldo negativo, conta vencendo).  
Adaptam-se ao tema para garantir legibilidade.

### Variante Warning (atenção)

| Propriedade  | Escuro                  | Claro                   |
| ------------ | ----------------------- | ----------------------- |
| Background   | `rgba(234,179,8, 0.10)` | `rgba(234,179,8, 0.12)` |
| Borda        | `rgba(234,179,8, 0.20)` | `rgba(180,83,9,  0.30)` |
| Ícone bg     | `rgba(234,179,8, 0.15)` | `rgba(234,179,8, 0.20)` |
| Cor do texto | `#facc15` (yellow-400)  | `#92400e` (amber-800)   |
| Cor do ícone | `#facc15`               | `#b45309` (amber-700)   |

Ícone: `AlertTriangle`

### Variante Critical (crítico)

| Propriedade  | Escuro                  | Claro                   |
| ------------ | ----------------------- | ----------------------- |
| Background   | `rgba(239,68,68, 0.10)` | `rgba(239,68,68, 0.10)` |
| Borda        | `rgba(239,68,68, 0.20)` | `rgba(185,28,28, 0.30)` |
| Ícone bg     | `rgba(239,68,68, 0.15)` | `rgba(239,68,68, 0.15)` |
| Cor do texto | `#f87171` (red-400)     | `#991b1b` (red-800)     |
| Cor do ícone | `#f87171`               | `#b91c1c` (red-700)     |

Ícone: `AlertCircle`

### Estrutura do alerta

```
┌──────────────────────────────────────────────┐
│ [ícone]  Título do alerta           [22:52] │
│          Mensagem descritiva...       [✕]   │
└──────────────────────────────────────────────┘
```

```css
backdrop-filter: blur(12px);
border-radius: 12px;
padding: 16px;
```

- Ícone container: `padding: 8px`, `border-radius: 50%`
- Título: `font-bold text-sm`
- Mensagem: `text-sm text-muted-foreground leading-relaxed`
- Hora: `text-xs text-muted-foreground`, posição absoluta topo-direita
- Botão fechar: `X` icon, `size-4`, hover `bg-muted/40`

---

## 22. Gráficos (Charts)

Todos os gráficos usam **Recharts**. Os tokens `--chart-1` a `--chart-5` são aplicados como `stroke` / `fill`.

### Configuração Global de Tooltip

```css
contentStyle: {
  backgroundcolor: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--foreground);
  font-size: 12px;
}
labelStyle: {
  color: var(--muted-foreground);
}
```

### Eixos (XAxis / YAxis)

```css
tick: {
  fill: var(--muted-foreground);
  font-size: 11px;
}
axisline: false;
tickline: false;
```

### Grid

```css
CartesianGrid: {
  strokedasharray: "3 3";
  stroke: var(--border);
}
```

---

### Tipo 1 — Area Chart (Área)

**Uso:** Evolução mensal receitas vs despesas

```jsx
<Area
  type="monotone"
  dataKey="income"
  stroke="var(--chart-2)"
  fill="url(#gradient)"
  strokeWidth={2}
/>
```

**Gradiente de preenchimento:**

```jsx
<linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
</linearGradient>
```

---

### Tipo 2 — Bar Chart (Barras)

**Uso:** Comparativo mensal (receitas / despesas / saldo)

```jsx
<Bar dataKey="income" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
```

- `barCategoryGap="20%"` para espaçamento proporcional
- `radius: [4,4,0,0]` → cantos arredondados apenas no topo

---

### Tipo 3 — Line Chart (Linhas)

**Uso:** Tendência do saldo

```jsx
<Line
  type="monotone"
  dataKey="balance"
  stroke="var(--primary)"
  strokeWidth={2.5}
  dot={{ fill: "var(--primary)", r: 4 }}
  activeDot={{ r: 6 }}
/>
```

---

### Tipo 4 — Pie Chart (Pizza)

**Uso:** Distribuição de gastos por categoria

```jsx
<Pie
  data={categoryData}
  outerRadius={80}
  dataKey="value"
  label={renderCustomLabel} /* % em branco no centro do slice */
>
  {categoryData.map((entry, i) => (
    <Cell key={i} fill={entry.color} stroke="none" />
  ))}
</Pie>
```

Cada `entry.color` é `var(--chart-N)`.

**Label customizado:**

- Texto branco `#fff`
- `font-size: 11px; font-weight: 600`
- Ocultado para fatias menores que 5%

---

### Tipo 5 — Radar Chart

**Uso:** Score de saúde financeira multidimensional

```jsx
<Radar
  dataKey="value"
  stroke="var(--primary)"
  fill="var(--primary)"
  fillOpacity={0.2}
  strokeWidth={2}
/>
<PolarGrid stroke="var(--border)" />
<PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
```

---

### Tipo 6 — Radial Bar Chart

**Uso:** Consumo de orçamento por categoria

```jsx
<RadialBarChart
  innerRadius={30}
  outerRadius={100}
  barSize={14}
  startAngle={90}
  endAngle={-270}
>
  <RadialBar
    dataKey="value"
    cornerRadius={6}
    label={{ position: "insideStart", fill: "var(--foreground)", fontSize: 10 }}
  />
</RadialBarChart>
```

---

## 23. Tabelas

### Tabela de Transações

Componente de tabela completo com ações inline.

**Header:**

```
background: var(--card)
border-bottom: 1px solid var(--border)
padding: 20px
```

**Colunas:**
| Coluna | Responsividade |
|---|---|
| Avatar | sempre visível |
| Descrição | sempre visível |
| Categoria | oculto em mobile (`hidden md:table-cell`) |
| Data | oculto em mobile pequeno (`hidden sm:table-cell`) |
| Valor | sempre visível |
| Ações (⋯) | visível apenas em hover (`opacity-0 group-hover:opacity-100`) |

**Linhas:**

- Hover: `bg-muted/20` (padrão shadcn TableRow)
- Avatar: `size-8`, bg `primary/10`, texto `primary`, iniciais em `text-[10px]`
- Tipo receita: seta `ArrowUpRight text-green-500`, valor `text-green-500`
- Tipo despesa: seta `ArrowDownLeft text-red-400`, valor `text-foreground`
- Categoria: `Badge variant="outline" text-xs`
- Data: `text-sm text-muted-foreground`
- Valor: `font-semibold text-sm tabular-nums`

### Tabela de Orçamentos (Budget)

**Colunas:**
| Coluna | Responsividade |
|---|---|
| Categoria | sempre visível |
| Limite | oculto em mobile |
| Gasto | oculto em mobile |
| Restante | sempre visível |
| Progresso (barra) | oculto em mobile |
| Status (badge) | sempre visível |

**Barra de progresso inline:**

```css
/* track */
background: var(--muted);
height: 6px; /* h-1.5 */
border-radius: 9999px;

/* fill — usa var(--chart-N) por categoria */
background: var(--chart-1); /* Alimentação */
background: var(--chart-2); /* Transporte */
/* ... etc */
```

**Status badge por percentual gasto:**
| Condição | Label | Cores Badge |
|---|---|---|
| `pct >= 95%` | "Crítico" | `bg-red-500/15 text-red-500 border-red-500/30` |
| `pct >= 80%` | "Atenção" | `bg-yellow-500/15 text-yellow-500 border-yellow-500/30` |
| `pct < 80%` | "Normal" | `bg-green-500/15 text-green-500 border-green-500/30` |

---

## 24. Notas para Adaptação Mobile

### Princípios gerais

1. **Gradiente de fundo** — manter o gradiente `radial` nos temas `original-*`. Em mobile aplica-se como camada fixa de fundo na tela.

2. **Glass vs Sólido** — manter a lógica: tema escuro = glass (`rgba(255,255,255,0.03) + blur(10px)`), tema claro = `var(--card)` sólido. O blur pesado deve ser testado em performance mobile.

3. **Sidebar → Bottom Nav / Drawer** — a sidebar lateral web vira um bottom tab bar (5 ícones) + side drawer completo para acesso ao menu completo. Manter os mesmos tokens `--sidebar-*`.

4. **Stat Cards** — em mobile, exibir em scroll horizontal (`ScrollView horizontal`) ou grid 2 colunas. Manter padding `p-4` e `border-radius: 20px`.

5. **Transaction Items** — lista vertical padrão. `height: 64px` por item. Swipe para revelar ações (editar/excluir).

6. **Charts** — preferir `height: 200px` para área/barras. Radar e Radial melhor em telas ≥ 360px. Usar `ResponsiveContainer width="100%"`.

7. **Tabelas** — em mobile não usar tabelas com scroll horizontal. Converter para lista de cards onde cada coluna vira uma linha.

8. **Toasts** — posicionar no topo (`top-center`) em mobile, pois bottom pode conflitar com gestos de navegação.

9. **Proactive Alerts** — manter `backdrop-filter: blur(12px)`. Em React Native, usar `BlurView` da biblioteca `expo-blur`.

10. **Fontes** — Poppins e Inter estão disponíveis via Google Fonts. Em React Native usar `expo-font` ou `@expo-google-fonts`.

### Breakpoints de referência (web)

| Prefixo Tailwind | Largura | Equivalente mobile    |
| ---------------- | ------- | --------------------- |
| (padrão)         | 0px+    | Todos os dispositivos |
| `sm:`            | 640px+  | Tablet pequeno        |
| `md:`            | 768px+  | Tablet                |
| `lg:`            | 1024px+ | Desktop               |

### Tokens em React Native

Usar uma lib de theming (ex.: `styled-components/native`, `NativeWind`, ou `Tamagui`) e mapear os CSS tokens para variáveis JavaScript:

```ts
export const tokens = {
  // original-dark
  background: "#020809",
  foreground: "#ffffff",
  card: "#06181b",
  primary: "#32d6a5",
  muted: "#0c4a55",
  border: "rgba(255,255,255,0.08)",
  // gamification (constantes de marca)
  gamificationPrimary: "#32d6a5",
  gamificationSecondary: "#1f8566",
  streakBackground: "rgba(249,115,22,0.10)",
  streakBorder: "rgba(249,115,22,0.20)",
  streakText: "#fb923c",
};
```

---

_Documento gerado em: `DESIGN_SYSTEM.md`_  
_Fonte: rota `/design-system` do projeto `miu-controle-frontend`_
