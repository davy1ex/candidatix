import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import type { Resume } from './types';

interface ResumeState {
  resume: Resume | null;
  isLoading: boolean;
  setResume: (resume: Resume) => void;
  updateTitle: (title: string) => void;
  updateWorkExperience: (workExperience: string) => void;
  undoChanges: () => void;
  history: Resume[];
  addHistory: (state: Resume) => void;
}

const useResume = create<ResumeState>()(
  persist(
    (set, get) => ({
      resume: null,
      isLoading: false,
      setResume: (resume) => set({ resume }),
      history: [] as Resume[],
      updateTitle: (title) => {
        const current = get().resume;
        if (!current) {
          set({ resume: { 
            title,
            workExperience: '',
            id: crypto.randomUUID(),
            skillsTag: [],
            experienceYears: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          } });
        } else {
          set({ resume: { ...current, title } });
        }
        set((state) => ({
          history: [...state.history, state.resume!]
        }));
      },
      updateWorkExperience: (workExperience) => {
        const current = get().resume;
        if (!current) {
          set({ resume: { 
            title: '',
            workExperience,
            id: crypto.randomUUID(),
            skillsTag: [],
            experienceYears: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          } });
        } else {
          set({ resume: { ...current, workExperience } });
        }
        set((state) => ({
          history: [...state.history, state.resume!]
        }));
      },
      undoChanges: () => {
        const state = get();
        const history = state.history;
        console.log("history", history);
        
        if (history.length > 1) {
          // Get the previous state (second to last)
          const previousState = history[history.length - 2];
          // Create new history without the current state
          const newHistory = history.slice(0, -1);
          
          set({ 
            resume: previousState,
            history: newHistory
          });
        }
      },
      
      addHistory: (state: Resume) => set((state) => ({
        history: [...state.history, state.resume!]
      }))
    }),
    {
      name: 'resume-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useResume };
