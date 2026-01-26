"use client";

import { useState } from "react";
import { useCreateReleaseNote } from "@/hooks/useReleaseNotes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CreateReleaseNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateReleaseNoteModal({ open, onOpenChange }: CreateReleaseNoteModalProps) {
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate: createNote, isPending } = useCreateReleaseNote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!version || !title || !content) {
      toast.error("Preencha todos os campos.");
      return;
    }

    createNote(
      { version, title, content, isActive: true },
      {
        onSuccess: () => {
          toast.success("Release Note publicada!");
          onOpenChange(false);
          setVersion("");
          setTitle("");
          setContent("");
        },
        onError: () => toast.error("Erro ao publicar."),
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f172a] text-white border-[#1e293b]">
        <DialogHeader>
          <DialogTitle>Publicar Nova Atualização</DialogTitle>
          <DialogDescription className="text-gray-400">
            Informe os detalhes da nova versão para os usuários.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-4 gap-4">
             <div className="col-span-1 space-y-2">
                <Label>Versão</Label>
                <Input 
                    value={version} 
                    onChange={e => setVersion(e.target.value)} 
                    placeholder="1.0.0" 
                     className="bg-[#1e293b] border-[#334155] text-white"
                />
             </div>
             <div className="col-span-3 space-y-2">
                <Label>Título</Label>
                <Input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Resumo da novidade" 
                     className="bg-[#1e293b] border-[#334155] text-white"
                />
             </div>
          </div>

          <div className="space-y-2">
            <Label>Conteúdo (Markdown)</Label>
            <textarea
              className="flex min-h-[200px] w-full rounded-md border border-[#334155] bg-[#1e293b] px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descreva as mudanças... Use markdown para formatar."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-white">
                Cancelar
            </Button>
            <Button type="submit" disabled={isPending} className="bg-[#32d6a5] text-black hover:bg-[#25b58a]">
                {isPending ? <Loader2 className="animate-spin" /> : "Publicar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
