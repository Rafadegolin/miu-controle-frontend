"use client";

import { useState } from "react";
import {
  ExternalLink,
  Trash2,
  Edit2,
  Plus,
  X,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PurchaseLink, AddPurchaseLinkDto } from "@/types/api";
import styles from "@/components/dashboard/styles/Dashboard.module.css";

interface PurchaseLinksManagerProps {
  links: PurchaseLink[];
  onAdd: (data: AddPurchaseLinkDto) => Promise<void>;
  onUpdate: (
    linkId: string,
    data: Partial<AddPurchaseLinkDto>
  ) => Promise<void>;
  onDelete: (linkId: string) => Promise<void>;
  isLoading?: boolean;
  maxLinks?: number;
}

export function PurchaseLinksManager({
  links = [],
  onAdd,
  onUpdate,
  onDelete,
  isLoading = false,
  maxLinks = 10,
}: PurchaseLinksManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<AddPurchaseLinkDto>({
    title: "",
    url: "",
    price: undefined,
    currency: "BRL",
    note: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      url: "",
      price: undefined,
      currency: "BRL",
      note: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await onUpdate(editingId, formData);
      } else {
        await onAdd(formData);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  const handleEdit = (link: PurchaseLink) => {
    setFormData({
      title: link.title,
      url: link.url,
      price: link.price,
      currency: link.currency || "BRL",
      note: link.note,
    });
    setEditingId(link.id);
    setShowForm(true);
  };

  const handleDelete = async (linkId: string) => {
    if (confirm("Tem certeza que deseja remover este link?")) {
      await onDelete(linkId);
    }
  };

  const totalPrice = links.reduce((sum, link) => sum + (link.price || 0), 0);

  return (
    <div className="space-y-4">
      {/* Header com total */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Links de Compra</h3>
          <p className="text-sm text-gray-400">
            {links.length} {links.length === 1 ? "item" : "itens"} •
            {totalPrice > 0 && ` R$ ${totalPrice.toFixed(2)} total`}
          </p>
        </div>
        {links.length < maxLinks && !showForm && (
          <Button
            onClick={() => setShowForm(true)}
            variant="secondary"
            size="sm"
          >
            <Plus size={16} />
            Adicionar
          </Button>
        )}
      </div>

      {/* Formulário */}
      {showForm && (
        <Card className="p-4 border border-white/10 bg-[#0b1215]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-white">
                {editingId ? "Editar Link" : "Novo Link"}
              </h4>
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-white/10 bg-white/5 outline-none focus:border-[#32d6a5]/50 text-sm text-white placeholder:text-gray-500"
                placeholder="Ex: MacBook Pro M3"
                maxLength={200}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                URL *
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-white/10 bg-white/5 outline-none focus:border-[#32d6a5]/50 text-sm text-white placeholder:text-gray-500"
                placeholder="https://..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
                  Preço
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full p-2 rounded-lg border border-white/10 bg-white/5 outline-none focus:border-[#32d6a5]/50 text-sm text-white placeholder:text-gray-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
                  Moeda
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  className="w-full p-2 rounded-lg border border-white/10 bg-[#0b1215] outline-none focus:border-[#32d6a5]/50 text-sm text-white"
                >
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#00404f]/60 uppercase mb-1">
                Nota
              </label>
              <textarea
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-white/10 bg-white/5 outline-none focus:border-[#32d6a5]/50 text-sm text-white placeholder:text-gray-500 resize-none"
                placeholder="Observações sobre este item..."
                rows={2}
                maxLength={500}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : null}
                {editingId ? "Salvar" : "Adicionar"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetForm}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Lista de links */}
      {links.length > 0 ? (
        <div className="space-y-2">
          {links.map((link) => (
            <div
              key={link.id}
              className={`${styles.listItem} bg-[#0b1215] rounded-xl px-4 py-3 hover:bg-white/5 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#00404f]/5 rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingCart size={20} className="text-[#3c88a0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[#00404f] truncate">
                        {link.title}
                      </h4>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#3c88a0] hover:underline flex items-center gap-1 mt-1"
                      >
                        <span className="truncate">
                          {new URL(link.url).hostname}
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                    {link.price && (
                      <span className="text-lg font-bold text-[#00404f] shrink-0">
                        R$ {link.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {link.note && (
                    <p className="text-sm text-[#00404f]/60 mt-2">
                      {link.note}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEdit(link)}
                      className="text-xs text-[#3c88a0] hover:underline flex items-center gap-1"
                    >
                      <Edit2 size={12} />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      Remover
                    </button>
                  </div>
                </div>
              </div>
              </div>

          ))}
        </div>
      ) : !showForm ? (
        <div className={`text-center py-12 border-2 border-dashed border-white/10 rounded-2xl ${styles.glassCard}`}>
          <ShoppingCart size={48} className="text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">
            Nenhum link de compra adicionado
          </p>
          <Button
            onClick={() => setShowForm(true)}
            variant="secondary"
            size="sm"
          >
            <Plus size={16} />
            Adicionar Primeiro Link
          </Button>
        </div>
      ) : null}
    </div>
  );
}
