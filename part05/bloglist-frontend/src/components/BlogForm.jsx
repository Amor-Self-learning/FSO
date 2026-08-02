import { useState } from 'react';

const BlogForm = ({ action, addToBlogs, navigate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async () => {
    await addToBlogs({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
    navigate('/');
  };
  return (
    <form action={action}>
      <div className='input-div'>
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required/>
      </div>
      <div className='input-div'>
        <label htmlFor='author'>Author: </label>
        <input
          type='text'
          id='author'
          name='author'
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required/>
      </div>
      <div className='input-div'>
        <label htmlFor='url'>URL: </label>
        <input
          type='text'
          id='url'
          name='url'
          value={url}
          onChange={e => setUrl(e.target.value)}
          required/>
      </div>
      <button onClick={addBlog} type='button'>Create</button>
      <button onClick={() => navigate('/')}>Cancel</button>
    </form>
  );
};

export default BlogForm;