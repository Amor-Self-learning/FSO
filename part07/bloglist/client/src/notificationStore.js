import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  message: { text: '', ok: false },
  setMessage: (message) =>
    set(() => ({
      message,
    })),
}));

export default useNotificationStore;
