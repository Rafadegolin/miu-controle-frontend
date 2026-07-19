
import { apiClient as api } from '@/services/api-client';

export interface OnboardingStatus {
  hasCompletedOnboarding: boolean;
  currentStep: 'WELCOME' | 'THEME' | 'CURRENCY' | 'PROFILE' | 'COMPLETED';
}

export interface CompleteOnboardingData {
  theme: string;
  currency: string;
  monthlyIncome?: number;
  displayName: string;
  avatarFile?: File;
}

export const onboardingService = {
  getStatus: async (): Promise<OnboardingStatus> => {
    const response = await api.get<{
      hasCompletedOnboarding: boolean;
      onboardingStep: number;
    }>('/onboarding/status');
    return {
      hasCompletedOnboarding: response.data.hasCompletedOnboarding,
      currentStep: response.data.hasCompletedOnboarding ? 'COMPLETED' : 'WELCOME',
    };
  },

  updateStep: async (step: number) => {
    // UpdateOnboardingStepDto: { step: int 0–6 }
    await api.post('/onboarding/step', { step });
  },

  completeOnboarding: async (data: CompleteOnboardingData) => {
    // 1. Upload avatar if exists
    let avatarUrl = '';
    if (data.avatarFile) {
      const formData = new FormData();
      formData.append('avatar', data.avatarFile);
      const avatarRes = await api.post<{ avatarUrl: string }>('/users/me/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      avatarUrl = avatarRes.data.avatarUrl;
    }

    // 2. Complete Onboarding with UNIFIED payload
    // The user will adjust the backend to accept this comprehensive DTO.
    const payload = {
      // Profile Data
      displayName: data.displayName,
      monthlyIncome: data.monthlyIncome !== undefined && data.monthlyIncome !== null && !isNaN(Number(data.monthlyIncome)) ? Number(data.monthlyIncome) : null,
      avatarUrl: avatarUrl || null,
      
      // Preferences (multi-moeda removido; backend usa BRL por default)
      theme: data.theme,
      language: 'pt-BR',
      isAiEnabled: true,
      aiPersonality: 'investor'
    };

    console.log('Completing onboarding with UNIFIED payload:', JSON.stringify(payload, null, 2));

    const response = await api.post<any>('/onboarding/complete', payload);
    return response.data;
  }
};
