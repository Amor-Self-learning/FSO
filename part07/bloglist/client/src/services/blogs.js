import axios from 'axios';
const getAll = async () => {
  const res = await axios.get('/api/blogs');
  return res.data;
};

const like = async (blog, loggedInUser) => {
  if (!loggedInUser) throw new Error('Login to like this blog');
  const { title, author, url, likes, user } = blog;
  const updatedBlog = {
    title,
    author,
    url,
    likes: likes + 1,
    user: user.id,
  };
  const res = await axios.put(`/api/blogs/${blog.id}`, updatedBlog);
  return res.data;
};

const del = async (blogId, token) => {
  const res = await axios.delete(`/api/blogs/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const add = async (blog, token) => {
  const res = await axios.post('/api/blogs', blog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default { getAll, like, del, add };
