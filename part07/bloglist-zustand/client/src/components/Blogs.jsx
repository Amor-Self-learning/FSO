import { Button, ListItem, List, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Blogs = ({ isLoading, blogs }) => {
  if (isLoading) {
    return <div>Loading Blogs...</div>;
  }

  return (
    <Box className="blogs" sx={{ m: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        Blogs
      </Typography>
      <List className="blog-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListItem key={blog.id}>
              <Button
                variant="text"
                component={Link}
                to={`/blogs/${blog.id}`}
              >{`${blog.title} by ${blog.author}`}</Button>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Blogs;
