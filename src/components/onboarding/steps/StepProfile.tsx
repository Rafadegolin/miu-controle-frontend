"use client";

import { useState, useRef } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Check, Upload, User, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function StepProfile({ onComplete, onPrev }: { onComplete: () => void; onPrev: () => void }) {
  const { control, setValue, formState: { isSubmitting } } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Use Controller for robust state tracking
  const { field: nameField } = useController({
    name: 'displayName',
    control,
    rules: { required: true, minLength: 2 }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('avatarFile', file, { shouldDirty: true });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeAvatar = () => {
    setValue('avatarFile', null, { shouldDirty: true });
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isValid = nameField.value && nameField.value.length >= 2;

  return (
    <div className="flex flex-col items-center space-y-6 py-2 w-full max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Quase lá!</h2>
        <p className="text-sm text-muted-foreground">Como você quer ser chamado?</p>
      </div>

      <div className="w-full flex flex-col items-center space-y-6 bg-card/50 p-6 rounded-xl border border-border backdrop-blur-md shadow-sm">
        
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
             <Avatar className="w-28 h-28 border-4 border-background shadow-lg transition-transform group-hover:scale-105">
               <AvatarImage src={previewUrl || ""} className="object-cover" />
               <AvatarFallback className="text-3xl bg-muted text-muted-foreground"><User className="w-10 h-10 opacity-50" /></AvatarFallback>
             </Avatar>
             <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="text-white w-8 h-8" />
             </div>
             {previewUrl && (
               <Button 
                size="icon" 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-8 h-8 rounded-full shadow-md cursor-pointer hover:bg-destructive/90"
                onClick={(e) => { e.stopPropagation(); removeAvatar(); }}
                type="button"
               >
                 <X className="w-4 h-4" />
               </Button>
             )}
          </div>
          <span className="text-xs text-muted-foreground">Toque para adicionar uma foto</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Name Input */}
        <div className="w-full space-y-2">
          <Label htmlFor="displayName" className="text-base font-semibold text-foreground">Seu Nome / Apelido</Label>
          <Input 
            id="displayName"
            placeholder="Ex: Rafael Silva"
            className="text-lg h-12 bg-background/50 border-input focus-visible:ring-primary focus-visible:border-primary transition-all"
            value={nameField.value || ''}
            onChange={nameField.onChange}
            onBlur={nameField.onBlur}
          />
        </div>

      </div>

      <div className="flex gap-4 pt-6 w-full justify-between items-center mt-auto">
        <Button variant="ghost" onClick={onPrev} className="cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/20" disabled={isSubmitting}>
          <ArrowLeft className="mr-2 w-4 h-4" /> Voltar
        </Button>
        <Button 
          onClick={onComplete} 
          disabled={!isValid || isSubmitting}
          className="cursor-pointer rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold px-8 h-10 transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-background"></div>
          ) : (
            <>Finalizar <Check className="ml-2 w-4 h-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
