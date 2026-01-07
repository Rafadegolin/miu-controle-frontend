import { useRef, useState, useCallback } from "react";
import { Camera, Loader2, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { User } from "@/types/api";
import { Button } from "@/components/ui/Button";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/canvasUtils";
import { toast } from "sonner";
import { getFullImageUrl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface AvatarUploadProps {
  user: User | null;
}

export function AvatarUpload({ user }: AvatarUploadProps) {
  const { uploadAvatar, deleteAvatar, isUploadingAvatar, isDeletingAvatar } =
    useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  // Crop state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB.");
      return;
    }

    // Validate type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Formato inválido. Use JPG, PNG ou WebP.");
      return;
    }

    // Read file for preview/crop
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result?.toString() || null);
      setIsCropperOpen(true);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    });
    reader.readAsDataURL(file);
  };

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedImageBlob) {
        const file = new File([croppedImageBlob], "avatar.jpg", {
          type: "image/jpeg",
        });
        setIsCropperOpen(false);
        const promise = uploadAvatar(file);
        toast.promise(promise, {
            loading: 'Enviando avatar...',
            success: 'Avatar atualizado com sucesso!',
            error: 'Erro ao atualizar avatar.'
        });
        await promise;
        
        // Reset zoom and crop
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      }
    } catch (e) {
      console.error(e);
      toast.error("Erro ao processar imagem.");
    }
  };

  const handleCancelCrop = () => {
    setIsCropperOpen(false);
    setImageSrc(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const handleDelete = async () => {
    try {
      await deleteAvatar();
      toast.success("Avatar removido com sucesso!");
    } catch (err) {
      toast.error("Erro ao remover avatar.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* CROP MODAL */}
      <Dialog open={isCropperOpen} onOpenChange={(open) => {
          if(!open) handleCancelCrop();
      }}>
        <DialogContent className="sm:max-w-md bg-[#06181b] border border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Ajustar Foto</DialogTitle>
          </DialogHeader>

          <div className="relative w-full h-64 bg-[#020809] rounded-lg overflow-hidden my-4 ring-1 ring-white/10">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
              />
            )}
          </div>

          <div className="flex items-center gap-2 mb-4 text-[#32d6a5]">
            <ZoomOut size={16} />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#32d6a5]"
            />
            <ZoomIn size={16} />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={handleCancelCrop} className="text-gray-400 hover:text-white hover:bg-white/5">
              Cancelar
            </Button>
            <Button onClick={handleSaveCrop} className="bg-[#32d6a5] text-[#020809] hover:bg-[#20bca3]">
              {isUploadingAvatar ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Salvando...
                  </>
              ) : "Salvar Foto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="relative group">
        <Avatar className="w-32 h-32 border-4 border-[#06181b] shadow-2xl shadow-[#32d6a5]/10">
          <AvatarImage
            src={getFullImageUrl(user?.avatarUrl)}
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback className="text-4xl font-bold text-[#32d6a5] bg-[#32d6a5]/10">
            {(user?.fullName || "U").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-white/10 text-white rounded-full hover:bg-[#32d6a5] hover:text-[#020809] transition-all"
            title="Alterar foto"
            disabled={isUploadingAvatar}
          >
            {isUploadingAvatar ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Camera size={20} />
            )}
          </button>
          {user?.avatarUrl && (
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500/20 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
              title="Remover foto"
              disabled={isDeletingAvatar}
            >
              {isDeletingAvatar ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Trash2 size={20} />
              )}
            </button>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
        />
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white">{user?.fullName}</h3>
        <p className="text-gray-400">{user?.email}</p>
      </div>
    </div>
  );
}
