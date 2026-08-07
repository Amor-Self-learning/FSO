export const getStoredUser = () => window.localStorage.getItem('BlogAppUser');
export const saveUser = (user) =>
  window.localStorage.setItem('BlogAppUser', JSON.stringify(user));
export const removeUser = () => window.localStorage.removeItem('BlogAppUser');
