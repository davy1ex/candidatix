import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  ollamaUrl: string;
  ollamaModel: string;
  isOpen: boolean;
  setOllamaUrl: (url: string) => void;
  setOllamaModel: (model: string) => void;
  toggleSettings: () => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ollamaUrl: 'http://localhost:11434',
      ollamaModel: 'llama2',
      isOpen: false,
      setOllamaUrl: (url) => set({ ollamaUrl: url }),
      setOllamaModel: (model) => set({ ollamaModel: model }),
      toggleSettings: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
