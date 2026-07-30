import axios from 'axios';

const login = async (action,username, password) => {
  const res = await axios.post(action, { username, password });
  window.localStorage.setItem('BlogAppUser', JSON.stringify(res.data));
  return res.data;
};

const logout = () => {
  window.localStorage.removeItem('BlogAppUser');
};
export default { login, logout };