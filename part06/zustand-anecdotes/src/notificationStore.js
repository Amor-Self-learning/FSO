import { create } from 'zustand';

const useNotificationStore = create( set => ({
  message: '',
  ok: '',
  setMessage: (message, ok = false) => {
    set( () => ({ message, ok }));
    setTimeout(
      () =>set( () => ({message: ''})),
      5000
    )
  }
}));

export default useNotificationStore;