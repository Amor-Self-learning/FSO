import { useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Profile from './components/Profile';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import loginService from './services/login';
import { AppBar, Container, Toolbar, Button, Typography } from '@mui/material';
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom';
import useNotificationStore from './stores/notificationStore';
import { useBlogActions, useBlogData } from './stores/blogsStore';
import useUserStore from './stores/loggedUserStore';
import { getStoredUser } from './services/persistentUser';
import { useUsers, useUserActions } from './stores/usersStore';
import Users from './components/Users';
import User from './components/User';

function App() {
  const { blogs, isLoading } = useBlogData();
  const { initialize, addToBlog, deleteBlog, likeBlog } = useBlogActions();
  const { user, setUser } = useUserStore();
  const users = useUsers();
  const { initialize: initializeUsers } = useUserActions();
  const { message, setMessage } = useNotificationStore();
  const navigate = useNavigate();
  const blogMatch = useMatch('/blogs/:id');
  const userMatch = useMatch('/users/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const invdividualUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;
  useEffect(() => {
    initialize();
    initializeUsers();
  }, [initialize, initializeUsers]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = getStoredUser();
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
  }, [setUser, setMessage]);

  const addToBlogs = async (blog) => {
    if (!user || !user.token) return;
    await addToBlog(blog, user.token);
    setMessage({
      text: `Added a new blog ${blog.title} by ${blog.author}`,
      ok: true,
    });
    navigate('/');
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      try {
        await deleteBlog(blog.id, user.token);
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
      await likeBlog(blog, user);
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
          <Button component={Link} color="inherit" to="/users">
            Users
          </Button>
        </Toolbar>
      </AppBar>
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
        <Route path="/users/:id" element={<User user={invdividualUser} />} />
        <Route
          path="/"
          element={
            <Blogs
              blogs={blogs}
              isLoading={isLoading}
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
        <Route path="/users" element={<Users users={users} />} />
      </Routes>
    </Container>
  );
}

export default App;
