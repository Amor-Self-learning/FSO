import axios from 'axios';
const getAll = async () => {
  try {
    const res = await axios.get('/api/blogs');
    return res.data;
  } catch (e) {
    throw new Error (e.message);
  }
}

const like = async (blog) => {
  try {
    const {title, author, url, likes, user} = blog;
    const updatedBlog = {
      title,
      author,
      url,
      likes: likes + 1,
      user : user.id
    }
    const res = await axios.put(`/api/blogs/${blog.id}`, updatedBlog)
    return res.data;
  } catch (e) {
    throw new Error (e.message)
  }
  
}

const del = async (blogId, token) => {
  try {
    const res = await axios.delete(`/api/blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (e) {
    throw new Error (e.message)
  }
}
export default {getAll, like, del}