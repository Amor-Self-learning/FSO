import { TextField, Button, Box } from '@mui/material';
import useField from '../hooks/useField';

const BlogForm = ({ action, addToBlogs, navigate }) => {
  const title = useField('text', 'Title', 'title');
  const author = useField('text', 'Author', 'author');
  const url = useField('text', 'URL', 'url');

  const addBlog = async () => {
    await addToBlogs({
      title: title.data.value,
      author: author.data.value,
      url: url.data.value,
    });
    title.reset();
    author.reset();
    url.reset();
    navigate('/');
  };
  return (
    <Box
      component="form"
      action={action}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '4rem auto',
        gap: '1rem',
      }}
    >
      <TextField required {...title.data} />
      <TextField required {...author.data} />
      <TextField required {...url.data} />
      <Button onClick={addBlog} variant="contained" color="success">
        Create
      </Button>
      <Button onClick={() => navigate('/')} variant="outlined" color="warning">
        Cancel
      </Button>
    </Box>
  );
};

export default BlogForm;
