"use client";

import { useEffect, useState } from "react";
import { getBrands, createBrand, deleteBrand } from "@/services/brands.actions";
import { Brand } from "@/types/api";
import { Card } from "@/components/ui/Card";
import { Loader2, Plus, Trash2, Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BrandLogo } from "@/components/brands/BrandLogo";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // Create Form State
  const [newName, setNewName] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");

  async function load() {
    try {
        const data = await getBrands();
        setBrands(data);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!newName) return;
    try {
        await createBrand({ name: newName, website: newWebsite, logoUrl: newLogoUrl });
        toast.success("Marca criada com sucesso!");
        setIsCreateOpen(false);
        setNewName("");
        setNewWebsite("");
        setNewLogoUrl("");
        load();
    } catch (e) {
        toast.error("Erro ao criar marca.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta marca?")) return;
    try {
        await deleteBrand(id);
        toast.success("Marca removida.");
        load();
    } catch (e) {
        toast.error("Erro ao remover marca.");
    }
  };

  const filtered = brands.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-[#32d6a5] w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up p-6">
      <div className="flex items-center justify-between">
         <div>
          <h1 className="text-2xl font-bold text-white mb-2">Marcas & Logos</h1>
          <p className="text-gray-400">Gerencie a identidade visual das transações.</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#32d6a5] text-black hover:bg-[#2ac294]">
                    <Plus className="mr-2" size={18} /> Nova Marca
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a2327] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>Adicionar Marca</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Nome da Marca</Label>
                        <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ex: Netflix" className="bg-[#0b1215] border-white/10" />
                    </div>
                    <div className="space-y-2">
                        <Label>Website (Opcional)</Label>
                        <Input value={newWebsite} onChange={e => setNewWebsite(e.target.value)} placeholder="Ex: netflix.com" className="bg-[#0b1215] border-white/10" />
                    </div>
                    <div className="space-y-2">
                        <Label>Logo URL (Opcional)</Label>
                        <Input value={newLogoUrl} onChange={e => setNewLogoUrl(e.target.value)} placeholder="https://..." className="bg-[#0b1215] border-white/10" />
                        <p className="text-xs text-gray-500">
                            Se vazio, tentaremos buscar automaticamente pelo website.
                        </p>
                    </div>
                    <Button onClick={handleCreate} className="w-full bg-[#32d6a5] text-black mt-4">
                        Criar Marca
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full max-w-sm">
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
         <Input 
            placeholder="Buscar marcas..." 
            className="pl-10 bg-[#0b1215] border-white/10"
            value={search}
            onChange={e => setSearch(e.target.value)}
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(brand => (
            <Card key={brand.id} className="p-4 bg-[#0b1215] border-white/5 flex items-center gap-4 group hover:border-[#32d6a5]/30 transition-colors">
                <BrandLogo brand={brand} fallbackText={brand.name} size="lg" />
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{brand.name}</h3>
                    {brand.website && (
                        <a href={`https://${brand.website}`} target="_blank" className="text-xs text-[#32d6a5] hover:underline flex items-center gap-1">
                            <Globe size={10} /> {brand.website}
                        </a>
                    )}
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={() => handleDelete(brand.id)}
                >
                    <Trash2 size={16} />
                </Button>
            </Card>
        ))}
      </div>
    </div>
  );
}
