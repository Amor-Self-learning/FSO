import { useState } from 'react';
import ToggleButton from './ToggleButton';

const Blog = ({ blog, handleLikeClick, handleDelete }) => {
  const [show, setShow] = useState(false);

  return (
    <ul className='blog'>
      <li><b>Title: </b>{blog.title} <ToggleButton options={['Hide', 'View']} value={show} setValue={setShow}/></li>
      <li><b>Author: </b>{blog.author}</li>
      {show && <li><b>URL: </b><a href={blog.url}>{blog.url}</a></li>}
      {show && <li><b>Likes: </b>{blog.likes} <button className='small-btn' onClick={handleLikeClick}>Like</button></li>}
      {show && <li><b>Added By: </b>{blog.user.name}</li>}
      {show && <button className='small-btn' onClick={handleDelete}>Delete</button>}
    </ul>
  );
};

export default Blog;