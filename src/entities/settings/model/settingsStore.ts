import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  geminiUrl: string;
  geminiKey: string;
  setGeminiKey: (key: string) => void;
  setGeminiUrl: (url: string) => void;
  
  ollamaUrl: string;
  setOllamaUrl: (url: string) => void;
  ollamaModel: string;
  setOllamaModel: (model: string) => void;
  
  isOpen: boolean;
  toggleSettings: () => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      geminiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=', // TODO: add here also selecting model gemini
      geminiKey: '',
      setGeminiUrl: (url) => set({ geminiUrl: url }),
      setGeminiKey: (key) => set({ geminiKey: key }),
      
      ollamaUrl: 'http://localhost:11434',
      ollamaModel: 'llama2',
      setOllamaUrl: (url) => set({ ollamaUrl: url }),
      setOllamaModel: (model) => set({ ollamaModel: model }),
      
      isOpen: false,
      toggleSettings: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
