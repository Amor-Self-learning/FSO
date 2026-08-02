import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

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
    <Box component="form" action={action}
      sx={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '4rem auto', gap: '1rem' }}>
      <TextField
        label='Title'
        type='text'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <TextField
        label='Author'
        type='text'
        id='author'
        name='author'
        value={author}
        onChange={e => setAuthor(e.target.value)}
        required
      />
      <TextField
        label='URL'
        type='text'
        id='url'
        name='url'
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <Button onClick={addBlog} variant='contained' color='success'>Create</Button>
      <Button onClick={() => navigate('/')} variant='outlined' color='warning'>Cancel</Button>
    </Box>
  );
};

export default BlogForm;