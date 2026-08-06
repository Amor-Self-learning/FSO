import { useState } from 'react';
import loginService from '../services/login';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

const LoginForm = ({ action, setUser, setMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await loginService.login(action, username, password);
      setUser(user);
      setMessage({ text: `Succesfully logged in as ${user.username}`, ok: true });
      navigate('/');
    } catch (e) {
      setMessage({ text: 'Invalid username or password', ok: false });
      console.error(e);
    }
  };
  return (
    <Box component="form"
      sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '4rem auto', gap: '1rem' }}>
      <TextField
        type="text"
        label='username'
        id="username"
        name="username"
        placeholder="zephyr"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        variant='standard'
      />
      <TextField
        label='Password'
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        variant='standard'
      />
      <Button type="reset" color='warning' variant='outlined'>Reset</Button>
      <Button type="button" onClick={handleLogin} color='success' variant='contained'>Login</Button>
    </Box>
  );
};

export default LoginForm;