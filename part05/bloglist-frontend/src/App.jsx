import { useEffect, useState } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Profile from './components/Profile';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [message, setMessage] = useState({});

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
        showMessage({text: e.message, ok: false});
      }
    }
    fetchBlogs()
  }, []);

  useEffect( () => {const getUser = async () => {
      try {
        const user = window.localStorage.getItem('BlogAppUser');
        setUser(JSON.parse(user));
      } catch (e) {
        showMessage({text: e.message, ok: false});
      }
    }
    getUser();
  }, [])
  
  const addToBlogs = (blog) => {
    console.log("Blogs before adding one", blogs)
    setBlogs(blogs.concat(blog));
    console.log("Blogs after adding one: ", blogs.concat(blog))
  }

  return (
    <>
      <h1>BlogList Application</h1>
      {message.text && <Notification message={message}/>}
      {user ? <Profile user={user} setUser={setUser} /> : <LoginForm action='/api/login' setUser={setUser} showMessage={showMessage} />}
      {user && <BlogForm action='/api/blogs' showMessage={showMessage} user={user} addToBlogs={addToBlogs}/>}      
      {user && <Blogs blogs={blogs} />}
    </>
  )
}

export default App;