"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageUploadProps {
  currentImage?: string | null;
  onUpload: (file: File) => Promise<void>;
  onDelete?: () => Promise<void>;
  isUploading?: boolean;
  isDeleting?: boolean;
  maxSize?: number; // em MB
  acceptedFormats?: string[];
}

export function ImageUpload({
  currentImage,
  onUpload,
  onDelete,
  isUploading = false,
  isDeleting = false,
  maxSize = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return "Formato de arquivo não suportado. Use JPG, PNG ou WEBP.";
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `Arquivo muito grande. Máximo ${maxSize}MB.`;
    }

    return null;
  };

  const handleFileSelect = async (file: File) => {
    setError("");

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Criar preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    try {
      await onUpload(file);
    } catch (err: any) {
      setError(err.message || "Erro ao fazer upload da imagem");
      setPreview(currentImage || null);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    try {
      await onDelete();
      setPreview(null);
    } catch (err: any) {
      setError(err.message || "Erro ao remover imagem");
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative rounded-2xl border-2 border-dashed overflow-hidden transition-all
          ${
            isDragging
              ? "border-[#7cddb1] bg-[#7cddb1]/5"
              : "border-[#00404f]/20"
          }
          ${
            preview
              ? "aspect-video"
              : "aspect-video flex items-center justify-center"
          }
        `}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {onDelete && (
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                variant="ghost"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                {isDeleting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <X size={20} />
                )}
              </Button>
            )}
          </>
        ) : (
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-[#00404f]/5 rounded-full flex items-center justify-center mx-auto mb-4">
              {isUploading ? (
                <Loader2 size={32} className="text-[#3c88a0] animate-spin" />
              ) : (
                <Upload size={32} className="text-[#3c88a0]" />
              )}
            </div>
            <h3 className="text-lg font-bold text-[#00404f] mb-2">
              {isUploading ? "Enviando..." : "Adicionar Imagem"}
            </h3>
            <p className="text-sm text-[#00404f]/60 mb-4">
              Arraste uma imagem ou clique para selecionar
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              variant="secondary"
              size="sm"
            >
              <Camera size={16} />
              Escolher Arquivo
            </Button>
            <p className="text-xs text-[#00404f]/40 mt-3">
              JPG, PNG ou WEBP • Máximo {maxSize}MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(",")}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
