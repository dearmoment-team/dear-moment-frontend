import { create } from 'zustand';

interface studioIdStoreTypes {
  studioId: number;
  setStudioId: (studioId: number) => void;
}

export const studioIdStore = create<studioIdStoreTypes>(set => ({
  studioId: 0,
  setStudioId: (newStudioId: number) => set({ studioId: newStudioId }),
}));
