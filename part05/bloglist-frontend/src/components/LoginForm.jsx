import { useState } from 'react';
import loginService from '../services/login';

const LoginForm = ({ action, setUser, setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginService.login(action, username, password);
      setUser(user);
      setMessage({ text: `Succesfully logged in as ${user.username}`, ok: true });
    } catch (e) {
      setMessage({ text: 'Invalid username or password', ok: false });
      console.error(e);
    }
  };
  return (
    <form>
      <div className="input-div">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="zephyr"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required/>
      </div>
      <div className="input-div">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>
      </div>
      <button type="reset">Reset</button>
      <button type="button" onClick={handleLogin}>Login</button>
    </form>
  );
};

export default LoginForm;