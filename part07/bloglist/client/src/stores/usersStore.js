import { useShallow } from 'zustand/shallow';
import usersService from '../services/users';
import { create } from 'zustand';

const usersStore = create((set) => ({
  users: [],
  initialize: async () => {
    const allUsers = await usersService.getAll();
    set(() => ({
      users: allUsers,
    }));
  },
}));

export const useUsers = () => usersStore((state) => state.users);
export const useUserActions = () =>
  usersStore(
    useShallow((state) => ({
      initialize: state.initialize,
    }))
  );
