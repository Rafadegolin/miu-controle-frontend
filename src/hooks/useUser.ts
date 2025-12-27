import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@/types/api";

export function useUser() {
  const queryClient = useQueryClient();
  const { refreshUser, logout } = useAuth();

  const updateProfileMutation = useMutation({
    mutationFn: api.updateCurrentUser.bind(api),
    onSuccess: async () => {
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: api.uploadAvatar.bind(api),
    onSuccess: async () => {
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const deleteAvatarMutation = useMutation({
    mutationFn: api.deleteAvatar.bind(api),
    onSuccess: async () => {
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: api.changePassword.bind(api),
  });

  const deleteAccountMutation = useMutation({
    mutationFn: api.deleteMyAccount.bind(api),
    onSuccess: () => {
      logout();
    },
  });

  return {
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    uploadAvatar: uploadAvatarMutation.mutateAsync,
    isUploadingAvatar: uploadAvatarMutation.isPending,
    
    deleteAvatar: deleteAvatarMutation.mutateAsync,
    isDeletingAvatar: deleteAvatarMutation.isPending,
    
    changePassword: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,
    
    deleteAccount: deleteAccountMutation.mutateAsync,
    isDeletingAccount: deleteAccountMutation.isPending,
  };
}
