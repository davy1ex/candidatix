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

  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;

  exampleShot: string;
  setExampleShot: (newShot: string) => void;
  
  isOpen: boolean;
  toggleSettings: () => void;

  proxyUrl: string;
  setProxyUrl: (url: string) => void;
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

      systemPrompt: "Ты — AI, помогающий составлять отклики на вакансии. Используй резюме кандидата, чтобы составить персонализированный текст. Не придумывай информацию, которой нет в резюме.", // TOOD: in feature here will be translated text
      setSystemPrompt: (prompt) => {
        set({systemPrompt: prompt})
      },

      exampleShot: "",
      setExampleShot: (newExampleShot) => 
        set({exampleShot: newExampleShot}),
      
      isOpen: false,
      toggleSettings: () => set((state) => ({ isOpen: !state.isOpen })),

      proxyUrl: '',
      setProxyUrl: (url) => set({ proxyUrl: url }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
