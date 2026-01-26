"use client";

import { useEffect, useState } from "react";
import { usePendingReleaseNotes, useMarkReleaseNoteAsRead } from "@/hooks/useReleaseNotes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Rocket, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";


export function ReleaseNotesModal() {
  const { data: pendingNotes, isLoading } = usePendingReleaseNotes();
  const { mutate: markAsRead } = useMarkReleaseNoteAsRead();
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (pendingNotes && pendingNotes.length > 0) {
      setOpen(true);
    }
  }, [pendingNotes]);

  const handleMarkAsRead = () => {
    if (!pendingNotes) return;
    
    // Mark current note as read
    const currentNote = pendingNotes[currentIndex];
    markAsRead(currentNote.id);

    // If there are more notes, go to next
    if (currentIndex < pendingNotes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all notes
      setOpen(false);
      toast.success("Tudo atualizado! Aproveite as novidades.");
      // Reset index for next time (though list will be empty likely)
      setTimeout(() => setCurrentIndex(0), 300);
    }
  };

  const handleClose = () => {
      // Optional: Maybe force reading? For now, allow closing but it will pop up again next reload 
      // unless we mark as read. Let's assume 'Close' = 'Remind me later' which is default behavior
      setOpen(false);
  }

  if (isLoading || !pendingNotes || pendingNotes.length === 0) return null;

  const currentNote = pendingNotes[currentIndex];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f172a] text-white border-[#1e293b] p-0 overflow-hidden">
        {/* Header with Version Badge */}
        <div className="bg-linear-to-r from-[#0f172a] to-[#1e293b] p-6 border-b border-white/5 relative">
            <div className="absolute top-4 right-4 bg-[#32d6a5]/20 text-[#32d6a5] px-3 py-1 rounded-full text-xs font-bold border border-[#32d6a5]/30">
                v{currentNote.version}
            </div>
             <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Rocket size={24} />
                </div>
                <DialogTitle className="text-xl font-bold text-white">O que há de novo?</DialogTitle>
             </div>
             <DialogDescription className="text-gray-400 text-base">
                {currentNote.title}
             </DialogDescription>
        </div>

        {/* Content Area */}
        <ScrollArea className="h-[400px] p-6">
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap font-sans">
                 {currentNote.content}
            </div>
        </ScrollArea>
        
        {/* Footer Actions */}
        <DialogFooter className="p-6 bg-[#020617]/50 border-t border-white/5 flex flex-col sm:flex-row gap-3">
             <div className="flex-1 flex items-center text-xs text-gray-500">
                {pendingNotes.length > 1 && (
                    <span>Nota {currentIndex + 1} de {pendingNotes.length}</span>
                )}
             </div>
             <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="ghost" onClick={handleClose} className="text-gray-400 hover:text-white flex-1 sm:flex-none">
                    Lembrar depois
                </Button>
                <Button 
                    onClick={handleMarkAsRead} 
                    className="bg-[#32d6a5] text-[#020809] hover:bg-[#25b58a] font-bold flex-1 sm:flex-none"
                    tabIndex={0}
                    autoFocus
                >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    {currentIndex < pendingNotes.length - 1 ? "Próxima Novidade" : "Entendi, vamos lá!"}
                </Button>
             </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
