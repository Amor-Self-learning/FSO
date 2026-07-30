import { useState } from 'react';
import ToggleButton from './ToggleButton';
import blogService from '../services/blogs';

const Blog = ({ blog, user, setMessage, handleDelete }) => {
  const [show, setShow] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(blog);

  const handleLikeClick = async () => {
    try {
      const res = await blogService.like(currentBlog);
      setCurrentBlog({ ...res, user: currentBlog.user });
      setMessage({ text: `${user.name} liked ${currentBlog.title}`, ok : true });
    } catch (e) {
      setMessage({ text: e.message, ok: false });
    };
  };

  return (
    <ul className='blog'>
      <li><b>Title: </b>{currentBlog.title} <ToggleButton options={['Hide', 'View']} value={show} setValue={setShow}/></li>
      {show && <li><b>Author: </b>{currentBlog.author}</li>}
      {show && <li><b>URL: </b><a href={currentBlog.url}>{currentBlog.url}</a></li>}
      {show && <li><b>Likes: </b>{currentBlog.likes} <button className='small-btn' onClick={handleLikeClick}>Like</button></li>}
      {show && <li><b>Added By: </b>{currentBlog.user.name}</li>}
      {show && <button className='small-btn' onClick={handleDelete}>Delete</button>}
    </ul>
  );
};

export default Blog;