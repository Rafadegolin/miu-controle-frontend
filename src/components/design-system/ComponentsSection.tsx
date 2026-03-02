"use client";

import React, { useState } from "react";
import { SectionTitle } from "./SectionTitle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Home,
  Settings,
  User,
  Bell,
  Search,
  Plus,
  Trash2,
  Edit3,
  ChevronDown,
  TrendingUp,
  Wallet,
  CreditCard,
  DollarSign,
  MoreVertical,
  Mail,
  Phone,
} from "lucide-react";

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold mb-4 mt-8 flex items-center gap-2 after:flex-1 after:h-px after:bg-border after:ml-2">
      {children}
    </h3>
  );
}

export function ComponentsSection() {
  const [switchOn, setSwitchOn] = useState(false);
  const [progress] = useState(68);

  return (
    <section>
      <SectionTitle
        icon="LayoutGrid"
        title="Componentes"
        description="Todos os componentes UI disponíveis, com suas variantes e estados."
      />

      {/* BUTTONS */}
      <SubTitle>Botões — Variantes</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="mint">Mint</Button>
        </div>
      </div>

      <SubTitle>Botões — Tamanhos</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Home />
          </Button>
          <Button size="icon-sm">
            <Plus />
          </Button>
          <Button size="icon-lg">
            <Settings />
          </Button>
        </div>
      </div>

      <SubTitle>Botões — Estados</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-3 items-center">
          <Button>Normal</Button>
          <Button disabled>Desabilitado</Button>
          <Button variant="outline">
            <TrendingUp /> Com ícone
          </Button>
          <Button variant="primary" className="animate-pulse">
            Loading...
          </Button>
        </div>
      </div>

      {/* BADGES */}
      <SubTitle>Badges</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge className="bg-green-500/15 text-green-500 border-green-500/30">
            Sucesso
          </Badge>
          <Badge className="bg-yellow-500/15 text-yellow-500 border-yellow-500/30">
            Atenção
          </Badge>
          <Badge className="bg-primary/15 text-primary border-primary/30">
            Receita
          </Badge>
          <Badge className="bg-red-500/15 text-red-500 border-red-500/30">
            Despesa
          </Badge>
        </div>
      </div>

      {/* CARDS */}
      <SubTitle>Cards</SubTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Saldo Total</CardTitle>
            <CardDescription>Todas as contas combinadas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">R$ 12.450,00</p>
            <p className="text-xs text-muted-foreground mt-1">+8,2% este mês</p>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="size-4 text-primary" /> Com ícone
            </CardTitle>
            <CardDescription>Card com destaque de cor</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {progress}% da meta atingida
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-accent/10 pointer-events-none" />
          <CardHeader>
            <CardTitle>Card Gradiente</CardTitle>
            <CardDescription>Com overlay decorativo</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Exemplo de card com gradiente de fundo para uso em destaque.
          </CardContent>
        </Card>
      </div>

      {/* GLASS CARDS */}
      <SubTitle>Cards — Glass (Glassmorphism)</SubTitle>
      <div
        className="rounded-xl p-5 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, #0c4a55 0%, transparent 40%), radial-gradient(circle at 90% 80%, #1f8566 0%, transparent 40%), #020809",
        }}
      >
        {/* Label overlay */}
        <p className="text-xs text-white/40 font-mono mb-4">
          ↳ preview sobre o gradiente de fundo do dashboard
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card glass base */}
          <div
            className="rounded-[20px] p-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
            }
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="size-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(50,214,165,0.15)" }}
              >
                <Wallet className="size-4 text-primary" />
              </div>
              <span className="text-xs text-white/40">Este mês</span>
            </div>
            <p className="text-sm text-white/60 mb-1">Saldo Total</p>
            <p className="text-2xl font-bold text-white">R$ 12.450,00</p>
            <p className="text-xs text-primary mt-1">+8,2%</p>
          </div>

          {/* Card glass com borda accent */}
          <div
            className="rounded-[20px] p-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] border-l-4 border-l-primary"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderTopColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.borderRightColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.borderBottomColor =
                "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderTopColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderRightColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderBottomColor =
                "rgba(255,255,255,0.08)";
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="size-4 text-primary" />
              <p className="text-sm font-semibold text-white">
                Com borda accent
              </p>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Usado em alertas proativos e widgets de destaque com borda lateral
              colorida.
            </p>
            <div className="mt-4 flex gap-2">
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: "rgba(50,214,165,0.15)",
                  color: "#32d6a5",
                }}
              >
                Alerta
              </span>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Insight
              </span>
            </div>
          </div>

          {/* Card glass com highlight interno */}
          <div
            className="rounded-[20px] p-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
            }
          >
            {/* Reflexo internal highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />
            <div
              className="absolute -top-8 -right-8 size-24 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(50,214,165,0.12) 0%, transparent 70%)",
              }}
            />
            <p className="text-sm font-semibold text-white mb-1">
              Com highlight
            </p>
            <p className="text-xs text-white/50 leading-relaxed mb-3">
              Reflexo superior + radial de brilho no canto — usado em cards
              premium.
            </p>
            <div
              className="w-full rounded-full h-1.5 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="h-full rounded-full w-2/3"
                style={{ background: "#32d6a5" }}
              />
            </div>
            <p className="text-xs text-white/40 mt-1.5">68% da meta</p>
          </div>
        </div>

        {/* Spec doc */}
        <div
          className="mt-5 rounded-xl p-4"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
            CSS Variables — Glass
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "--glass-surface",
                value: "rgba(255,255,255,0.03)",
                desc: "background",
              },
              {
                label: "--glass-border",
                value: "rgba(255,255,255,0.08)",
                desc: "border (normal)",
              },
              {
                label: "--glass-highlight",
                value: "rgba(255,255,255,0.10)",
                desc: "border (hover)",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="size-7 rounded-md shrink-0"
                  style={{
                    background: item.value,
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
                <div>
                  <p className="font-mono text-xs text-white/70">
                    {item.label}
                  </p>
                  <p className="text-xs text-white/35">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-3 font-mono">
            backdrop-filter: blur(10px) · border-radius: 20px
          </p>
        </div>
      </div>

      {/* FORM ELEMENTS */}
      <SubTitle>Inputs & Formulário</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <Label>Nome</Label>
            <Input placeholder="Ex: Rafael Souza" />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="rafaelsouza@email.com" />
          </div>
          <div className="space-y-1.5">
            <Label>Valor</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="0,00" type="number" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">🍔 Alimentação</SelectItem>
                <SelectItem value="transport">🚗 Transporte</SelectItem>
                <SelectItem value="health">💊 Saúde</SelectItem>
                <SelectItem value="leisure">🎮 Lazer</SelectItem>
                <SelectItem value="education">📚 Educação</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Observações</Label>
            <Textarea
              placeholder="Adicione uma descrição ou nota sobre esta transação..."
              rows={3}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">
              Input desabilitado
            </Label>
            <Input disabled placeholder="Campo bloqueado" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">
              Input com erro
            </Label>
            <Input
              aria-invalid="true"
              placeholder="Valor inválido"
              defaultValue="abc"
            />
          </div>
        </div>
      </div>

      {/* SWITCH & PROGRESS */}
      <SubTitle>Switch & Progress</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
              <Label>Notificações: {switchOn ? "Ativas" : "Inativas"}</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={true} />
              <Label>Sincronização automática</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={false} disabled />
              <Label className="text-muted-foreground">
                Recurso desabilitado
              </Label>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-4">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Meta de economia</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Orçamento usado</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2 [&>div]:bg-destructive" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Metas concluídas</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2 [&>div]:bg-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <SubTitle>Tabs</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="budgets">Orçamentos</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
          </TabsList>
          <TabsContent
            value="overview"
            className="pt-4 text-sm text-muted-foreground"
          >
            Exibe o resumo financeiro do período: receitas, despesas e saldo.
          </TabsContent>
          <TabsContent
            value="transactions"
            className="pt-4 text-sm text-muted-foreground"
          >
            Lista detalhada de todas as movimentações do período.
          </TabsContent>
          <TabsContent
            value="budgets"
            className="pt-4 text-sm text-muted-foreground"
          >
            Controle de limites por categoria e alertas de gastos.
          </TabsContent>
          <TabsContent
            value="goals"
            className="pt-4 text-sm text-muted-foreground"
          >
            Acompanhamento de metas financeiras de curto e longo prazo.
          </TabsContent>
        </Tabs>
      </div>

      {/* AVATAR & SKELETON */}
      <SubTitle>Avatar & Skeleton</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-8 items-end">
          {/* Avatares */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Avatares
            </p>
            <div className="flex items-center gap-2">
              {["RS", "AM", "JP", "LF", "MK"].map((initials, i) => (
                <Avatar
                  key={i}
                  className={
                    i === 0 ? "size-12" : i === 4 ? "size-7" : "size-9"
                  }
                >
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>

          {/* Skeletons */}
          <div className="flex-1 min-w-[200px] space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Skeleton (loading)
            </p>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>
      </div>

      {/* OVERLAYS */}
      <SubTitle>Overlays — Dialog, AlertDialog, Dropdown, Tooltip</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap gap-3">
          {/* Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit3 className="size-4" /> Abrir Dialog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Transação</DialogTitle>
                <DialogDescription>
                  Faça as alterações desejadas e clique em salvar.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>Descrição</Label>
                  <Input defaultValue="Mercado Extra" />
                </div>
                <div className="space-y-1.5">
                  <Label>Valor</Label>
                  <Input defaultValue="185,40" type="number" />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* AlertDialog */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="size-4" /> Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. A transação será removida
                  permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90 text-white">
                  Sim, excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="size-4" /> Mais ações
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit3 className="size-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="size-4" /> Enviar por email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="size-4" /> Criar alerta
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="size-4" /> Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Você tem 3 notificações</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* PAGINATION */}
      <SubTitle>Paginação</SubTitle>
      <div className="rounded-xl border border-border bg-card p-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {[1, 2, 3, 4, 5].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink href="#" isActive={page === 2}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
