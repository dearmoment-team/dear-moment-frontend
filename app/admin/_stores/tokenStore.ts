import { create } from 'zustand';

interface adminStoreTypes {
  token: string;
  setToken: (freshToken: string) => void;
}

export const adminTokenStore = create<adminStoreTypes>(set => ({
  token: '',
  setToken: (freshToken: string) => set({ token: freshToken }),
}));
