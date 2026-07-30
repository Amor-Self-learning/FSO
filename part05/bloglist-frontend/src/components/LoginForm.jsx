import {useState} from 'react';
import loginService from '../services/login';

const LoginForm = ({action, setUser, showMessage}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await loginService.login(action, username, password)
      setUser(user);
    } catch (e) {
      showMessage(e.message);
    }
  }
  return (
    <form>
      <div className="input-div">
        <label htmlFor="username">Username: </label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          placeholder="zephyr"
          onChange={(e) => setUsername(e.target.value)}
          required/>
      </div>
      <div className="input-div">
        <label htmlFor="password">Password: </label>
        <input 
          type="password" 
          id="password"
          name="password" 
          onChange={(e) => setPassword(e.target.value)}
          required/>
      </div>
      <button type="reset">Reset</button>
      <button type="button" onClick={handleLogin}>Login</button>
    </form>
  )
}

export default LoginForm;