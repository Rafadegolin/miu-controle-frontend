"use client";

import { useState } from "react";
import { Loader2, Upload, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { useUploadGoalImage, useDeleteGoalImage } from "@/hooks/useGoals";

interface ImageUploadProps {
  goalId: string;
  currentImageUrl?: string;
  onUploadSuccess?: () => void;
}

export function ImageUpload({ goalId, currentImageUrl, onUploadSuccess }: ImageUploadProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { mutate: uploadImage, isPending: isUploading } = useUploadGoalImage();
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteGoalImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    uploadImage(
      { id: goalId, file },
      {
        onSuccess: () => {
          toast.success("Imagem atualizada!");
          onUploadSuccess?.();
        },
        onError: () => toast.error("Erro ao enviar imagem"),
      }
    );
  };

  const handleDelete = () => {
    deleteImage(goalId, {
      onSuccess: () => {
        toast.success("Imagem removida!");
        onUploadSuccess?.();
      },
      onError: () => toast.error("Erro ao remover imagem"),
    });
  };

  if (currentImageUrl) {
    return (
      <div className="relative w-full h-full min-h-[200px] group rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImageUrl}
          alt="Meta"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <label className="cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
          </label>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500/80 hover:bg-red-500 p-3 rounded-full text-white transition-colors"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center transition-colors cursor-pointer min-h-[200px] ${
        isHovering ? "border-[#32d6a5] bg-[#32d6a5]/5" : "border-gray-700 hover:border-gray-600"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsHovering(true);
      }}
      onDragLeave={() => setIsHovering(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsHovering(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
           uploadImage(
            { id: goalId, file },
            { onSuccess: () => onUploadSuccess?.() }
           );
        }
      }}
    >
      <div className="w-16 h-16 rounded-full bg-[#131b20] flex items-center justify-center group-hover:scale-110 transition-transform">
         {isUploading ? (
            <Loader2 className="animate-spin text-[#32d6a5]" size={32} />
         ) : (
            <Upload className="text-gray-400 group-hover:text-[#32d6a5] transition-colors" size={32} />
         )}
      </div>
      <div>
         <h4 className="font-bold text-gray-300">Adicionar Imagem</h4>
         <p className="text-xs text-gray-500 mt-1 px-4">Arraste uma imagem ou clique para selecionar</p>
      </div>
      
      <label className="mt-2 block">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <span className="text-xs font-bold text-[#32d6a5] border border-[#32d6a5]/20 px-4 py-2 rounded-lg hover:bg-[#32d6a5]/10 transition-colors inline-block cursor-pointer">
           <Camera size={14} className="inline mr-2" /> Escolher Arquivo
        </span>
      </label>
    </div>
  );
}
