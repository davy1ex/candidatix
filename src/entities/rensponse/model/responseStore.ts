import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AIResponse } from './types';

interface ResponseState {
  responses: AIResponse[];
  isLoading: boolean;
  addResponse: (response: AIResponse) => void;
  updateResponse: (response: AIResponse) => void;
  deleteResponse: (id: string) => void;
  getResponseById: (id: string) => AIResponse | undefined;
  setResponses: (responses: AIResponse[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useResponseStore = create<ResponseState>()(
  persist(
    (set, get) => ({
      responses: [],
      isLoading: false,
      addResponse: (response) => set((state) => ({
        responses: [...state.responses, { ...response, id: crypto.randomUUID() }],
      })),
      updateResponse: (response) => set((state) => ({
        responses: state.responses.map((r) => 
          r.id === response.id ? { ...r, ...response, updatedAt: new Date().toISOString() } : r
        ),
      })),
      deleteResponse: (id) => set((state) => ({
        responses: state.responses.filter((r) => r.id !== id),
      })),
      getResponseById: (id) => get().responses.find((r) => r.id === id),
      setResponses: (responses) => set({ responses }),
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'responses-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
