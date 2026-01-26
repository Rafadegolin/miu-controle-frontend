import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { releaseNotesActions } from "@/services/release-notes.actions";
import type { CreateReleaseNoteDto } from "@/types/api";

// === USER HOOKS ===

export function usePendingReleaseNotes() {
  return useQuery({
    queryKey: ["release-notes", "pending"],
    queryFn: () => releaseNotesActions.getPendingNotes(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMarkReleaseNoteAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => releaseNotesActions.markAsRead(id),
    onSuccess: () => {
      // Invalidate pending to refresh the list (if multiple were pending)
      queryClient.invalidateQueries({ queryKey: ["release-notes", "pending"] });
    },
  });
}

// === ADMIN HOOKS ===

export function useAllReleaseNotes() {
  return useQuery({
    queryKey: ["release-notes", "all"],
    queryFn: () => releaseNotesActions.getAllNotes(),
  });
}

export function useCreateReleaseNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReleaseNoteDto) => releaseNotesActions.createReleaseNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["release-notes"] });
    },
  });
}
