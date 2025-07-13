import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createJSONStorage } from 'zustand/middleware';
import type { Resume } from './types';

interface ResumeState {
  resumes: Resume[] | null;
  isLoading: boolean;
  addResume: (resume: Resume) => void;
  setResumes: (resume: Resume) => void;
  // updateTitle: (title: string) => void; // TODO: refactor this
  // updateWorkExperience: (workExperience: string) => void;
  undoChanges: () => void;
  history: Resume[];
  addHistory: (state: Resume) => void;
}

const useResume = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      isLoading: false,
      addResume: (newResume: Resume) => {
        set({resumes: [...get().resumes, newResume]})
      },
      setResume: (resume) => set({ resume }),
      history: [] as Resume[],
      // updateTitle: (id, title) => {
      //   const current = get().resumes.filter(resume => resume.id == id);
      //
      //   if (!current) {
      //     set({ resume: {
      //       title,
      //       workExperience: '',
      //       id: crypto.randomUUID(),
      //       skillsTag: [],
      //       experienceYears: 0,
      //       createdAt: new Date().toISOString(),
      //       updatedAt: new Date().toISOString()
      //     } });
      //   } else {
      //     set({ resumes: [...get().resumes, { ...current, title }] });
      //   }
      //
      //   set((state) => ({
      //     history: [...state.history, state.resumes!]
      //   }));
      // },
      // updateWorkExperience: (id, workExperience) => {
      //   const current = get().resume;
      //   if (!current) {
      //     set({ resume: {
      //       title: '',
      //       workExperience,
      //       id: crypto.randomUUID(),
      //       skillsTag: [],
      //       experienceYears: 0,
      //       createdAt: new Date().toISOString(),
      //       updatedAt: new Date().toISOString()
      //     } });
      //   } else {
      //     set({ resume: { ...current, workExperience } });
      //   }
      //   set((state) => ({
      //     history: [...state.history, state.resume!]
      //   }));
      // },
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
