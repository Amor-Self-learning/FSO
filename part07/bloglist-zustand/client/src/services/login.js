import axios from 'axios';
import { removeUser, saveUser } from './persistentUser';

const login = async (action, username, password) => {
  const res = await axios.post(action, { username, password });
  saveUser(res.data);
  return res.data;
};

const logout = () => {
  removeUser();
};
export default { login, logout };
