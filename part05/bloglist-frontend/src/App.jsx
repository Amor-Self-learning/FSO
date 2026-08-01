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
  const [message, setMessage] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect( () => { const fetchBlogs = async () => {
    try {
      const data = await blogService.getAll();
      setBlogs(data);
    } catch (e) {
      setMessage({ text: e.message, ok: false });
    }
  };
  fetchBlogs();
  }, []);

  useEffect( () =>
  {
    const getUser = async () => {
      try {
        const user = window.localStorage.getItem('BlogAppUser');
        const parsedUser = JSON.parse(user);
        setUser(parsedUser);
        setMessage({ text: `Logged in as ${parsedUser.username}`, ok: true });
      } catch (e) {
        setMessage({ text: 'Login to Continue', ok: false });
        console.log(e);
      };
    };
    getUser();
  }, []);

  const addToBlogs = async (blog) => {
    if (!user || !user.token) return;
    const data = await blogService.add(blog, user.token);
    setBlogs(blogs.concat({ ...data, user : { id: data.user, username : user.username, name : user.name } }));
    setMessage({ text: `Added a new blog ${blog.title} by ${blog.author}`, ok: true });
    setBlogFormVisible(false);
  };

  const handleDelete = async (blog) => {
    if ((window.confirm(`Delete blog ${blog.title} by ${blog.author}`))) {
      try {
        await blogService.del(blog.id, user.token);
        setBlogs(blogs.filter(b => b.id !== blog.id));
        setMessage({ text: `Successfully deleted blog ${blog.title}` });
      } catch (e) {
        setMessage({ text: 'Failed to delete blog', ok: false });
        console.error(e);
      };
    }
  };

  const handleLikeClick = async (blog) => {
    try {
      await blogService.like(blog);
      const newBlog = { ...blog, likes: blog.likes + 1 };
      const filteredBlogs = blogs.filter(b => b.id !== blog.id);
      setBlogs(filteredBlogs.concat(newBlog));
      setMessage({ text: `${user.name} liked ${blog.title}`, ok : true });
    } catch (e) {
      setMessage({ text: e.message, ok: false });
    };
  };
  return (
    <>
      <h1>BlogList Application</h1>
      {message && <Notification message={message} onClose={() => setMessage(null)}/>}
      {user
        ? <Profile user={user} setUser={setUser} setMessage={setMessage}/>
        : <LoginForm action='/api/login' setUser={setUser}
          setMessage={setMessage} />
      }
      {user && blogFormVisible
        &&<BlogForm action='/api/blogs'
          setMessage={setMessage} user={user}
          addToBlogs={addToBlogs}
          setBlogFormVisible={setBlogFormVisible}
        />
      }
      {user
        &&<Blogs blogs={blogs}
          handleLikeClick={handleLikeClick}
          blogFormVisible={blogFormVisible}
          user={user} setBlogFormVisible={setBlogFormVisible}
          setMessage={setMessage} handleDelete={handleDelete}
        />
      }
    </>
  );
}

export default App;