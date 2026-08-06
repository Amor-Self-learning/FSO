import { useEffect, useState } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Profile from './components/Profile';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import loginService from './services/login';
import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAll();
        setBlogs(data);
      } catch (e) {
        setMessage({ text: e.message, ok: false });
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = window.localStorage.getItem('BlogAppUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUser(parsedUser);
          setMessage({ text: `Logged in as ${parsedUser.username}`, ok: true });
        }
      } catch (e) {
        setMessage({ text: 'Login to Continue', ok: false });
        console.log(e);
      }
    };
    getUser();
  }, []);

  const addToBlogs = async (blog) => {
    if (!user || !user.token) return;
    const data = await blogService.add(blog, user.token);
    setBlogs(
      blogs.concat({
        ...data,
        user: { id: data.user, username: user.username, name: user.name },
      })
    );
    setMessage({
      text: `Added a new blog ${blog.title} by ${blog.author}`,
      ok: true,
    });
    navigate('/');
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.del(blog.id, user.token);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        setMessage({ text: `Successfully deleted blog ${blog.title}` });
        navigate('/');
      } catch (e) {
        setMessage({ text: 'Failed to delete blog', ok: false });
        console.error(e);
      }
    }
  };

  const handleLikeClick = async (blog) => {
    try {
      await blogService.like(blog, user);
      const newBlog = { ...blog, likes: blog.likes + 1 };
      const filteredBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(filteredBlogs.concat(newBlog));
      setMessage({ text: `${user.name} liked ${blog.title}`, ok: true });
    } catch (e) {
      setMessage({ text: e.message, ok: false });
    }
  };

  const handleLogout = async (user, setUser, setMessage) => {
    loginService.logout();
    setMessage({ text: `${user.username} Logged out`, ok: true });
    setUser(null);
    navigate('/');
  };
  return (
    <Container>
      <AppBar position="static" color="info" sx={{ borderRadius: 3 }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          {!user ? (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          ) : (
            <Button
              className="small-btn"
              color="inherit"
              onClick={() => handleLogout(user, setUser, setMessage)}
            >
              Logout
            </Button>
          )}
          <Button component={Link} color="inherit" to="/create">
            New Blog
          </Button>
        </Toolbar>
      </AppBar>
      <ErrorBoundary>
        {message && (
          <Notification message={message} onClose={() => setMessage(null)} />
        )}
        {user && (
          <Profile user={user} setUser={setUser} setMessage={setMessage} />
        )}
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                user={user}
                blog={blog}
                handleLikeClick={handleLikeClick}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="/"
            element={
              <Blogs
                blogs={blogs}
                handleLikeClick={handleLikeClick}
                user={user}
                setMessage={setMessage}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                action="/api/login"
                setUser={setUser}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path="/create"
            element={
              <BlogForm
                action="/api/blogs"
                setMessage={setMessage}
                user={user}
                addToBlogs={addToBlogs}
                navigate={navigate}
              />
            }
          />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </ErrorBoundary>
    </Container>
  );
}

export default App;
