"use client";

import React from "react";
import { SectionTitle } from "./SectionTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TRANSACTIONS = [
  {
    id: 1,
    description: "iFood — Hambúrguer",
    category: "Alimentação",
    date: "01/03/2026",
    amount: -87.5,
    type: "expense",
    initials: "IF",
  },
  {
    id: 2,
    description: "Salário — Empresa XYZ",
    category: "Renda",
    date: "01/03/2026",
    amount: 5800.0,
    type: "income",
    initials: "EX",
  },
  {
    id: 3,
    description: "Posto Ipiranga",
    category: "Transporte",
    date: "28/02/2026",
    amount: -145.0,
    type: "expense",
    initials: "PI",
  },
  {
    id: 4,
    description: "Netflix",
    category: "Lazer",
    date: "27/02/2026",
    amount: -55.9,
    type: "expense",
    initials: "NF",
  },
  {
    id: 5,
    description: "Freelance — Design",
    category: "Renda extra",
    date: "25/02/2026",
    amount: 1200.0,
    type: "income",
    initials: "FL",
  },
  {
    id: 6,
    description: "Farmácia Drogasil",
    category: "Saúde",
    date: "24/02/2026",
    amount: -62.4,
    type: "expense",
    initials: "DR",
  },
  {
    id: 7,
    description: "Mercado Extra",
    category: "Alimentação",
    date: "22/02/2026",
    amount: -358.7,
    type: "expense",
    initials: "ME",
  },
];

const BUDGETS = [
  {
    category: "Alimentação",
    limit: 1500,
    spent: 1200,
    color: "var(--chart-1)",
  },
  { category: "Transporte", limit: 600, spent: 520, color: "var(--chart-2)" },
  { category: "Saúde", limit: 400, spent: 62, color: "var(--chart-3)" },
  { category: "Lazer", limit: 500, spent: 480, color: "var(--chart-4)" },
  { category: "Educação", limit: 800, spent: 200, color: "var(--chart-5)" },
];

export function TablesSection() {
  return (
    <section>
      <SectionTitle
        icon="Table2"
        title="Tabelas"
        description="Componentes de tabela para exibição de dados financeiros."
      />

      {/* Transactions table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Transações Recentes</p>
            <p className="text-xs text-muted-foreground">
              Últimas movimentações das contas
            </p>
          </div>
          <Button variant="outline" size="sm">
            Ver todas
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">#</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="hidden md:table-cell">Categoria</TableHead>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTIONS.map((t) => (
              <TableRow key={t.id} className="group">
                <TableCell>
                  <Avatar className="size-8">
                    <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex-shrink-0 ${t.type === "income" ? "text-green-500" : "text-red-400"}`}
                    >
                      {t.type === "income" ? (
                        <ArrowUpRight className="size-3.5" />
                      ) : (
                        <ArrowDownLeft className="size-3.5" />
                      )}
                    </span>
                    <span className="font-medium text-sm">{t.description}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="text-xs">
                    {t.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                  {t.date}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`font-semibold text-sm tabular-nums ${
                      t.type === "income" ? "text-green-500" : "text-foreground"
                    }`}
                  >
                    {t.type === "income" ? "+" : ""}
                    R${" "}
                    {Math.abs(t.amount).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>Exibindo 7 de 248 transações</TableCaption>
        </Table>
      </div>

      {/* Budget table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <p className="font-semibold text-sm">Orçamentos por Categoria</p>
          <p className="text-xs text-muted-foreground">
            Consumo do limite mensal definido
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead className="hidden sm:table-cell text-right">
                Limite
              </TableHead>
              <TableHead className="hidden sm:table-cell text-right">
                Gasto
              </TableHead>
              <TableHead className="text-right">Restante</TableHead>
              <TableHead className="hidden md:table-cell">Progresso</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUDGETS.map((b) => {
              const pct = Math.min((b.spent / b.limit) * 100, 100);
              const remaining = b.limit - b.spent;
              const status =
                pct >= 95 ? "Crítico" : pct >= 80 ? "Atenção" : "Normal";
              const statusColor =
                pct >= 95
                  ? "bg-red-500/15 text-red-500 border-red-500/30"
                  : pct >= 80
                    ? "bg-yellow-500/15 text-yellow-500 border-yellow-500/30"
                    : "bg-green-500/15 text-green-500 border-green-500/30";

              return (
                <TableRow key={b.category}>
                  <TableCell className="font-medium text-sm">
                    {b.category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right text-muted-foreground text-sm">
                    R$ {b.limit.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-right text-sm">
                    R$ {b.spent.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    R$ {remaining.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: b.color }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-9 text-right">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={`text-xs ${statusColor}`}>{status}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
