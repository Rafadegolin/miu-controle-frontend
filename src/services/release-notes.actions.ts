import { apiClient } from "./api-client";
import type { ReleaseNote, CreateReleaseNoteDto } from "@/types/api";

export const releaseNotesActions = {
  // User: Get only pending notes (not read yet)
  async getPendingNotes(): Promise<ReleaseNote[]> {
    const response = await apiClient.get<ReleaseNote[]>("/release-notes/pending");
    return response.data;
  },

  // User: Mark a note as read
  async markAsRead(id: string): Promise<void> {
    await apiClient.post(`/release-notes/${id}/read`);
  },

  // Admin: Get all notes (including inactive)
  async getAllNotes(): Promise<ReleaseNote[]> {
    const response = await apiClient.get<ReleaseNote[]>("/release-notes/all");
    return response.data;
  },

  // Admin: Create a new release note
  async createReleaseNote(data: CreateReleaseNoteDto): Promise<ReleaseNote> {
    const response = await apiClient.post<ReleaseNote>("/release-notes", data);
    return response.data;
  },
};
