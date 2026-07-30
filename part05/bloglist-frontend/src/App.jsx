import { useEffect, useState } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Profile from './components/Profile';
import blogService from './services/blogs';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  useEffect( () => { const fetchBlogs = async () => {
      try {
        const data = await blogService.getAll();
        setBlogs(data);
      } catch (e) {
        showMessage(e.message);
      }
    }
    fetchBlogs()
  }, []);

  useEffect( () => {const getUser = async () => {
      try {
        const user = window.localStorage.getItem('BlogAppUser');
        setUser(JSON.parse(user));
      } catch (e) {
        showMessage(e.message);
      }
    }
    getUser();
  }, [])
  
  return (
    <>
      <h1>BlogList Application</h1>
      {message && <Notification message={message} />}
      {user ? <Profile user={user} setUser={setUser} /> : <LoginForm action='/api/login' setUser={setUser} showMessage={showMessage} />}
      {user && <Blogs blogs={blogs} />}
    </>
  )
}

export default App;