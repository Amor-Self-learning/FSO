import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import CommentForm from './CommentForm';

const Blog = ({ user, blog, handleLikeClick, handleDelete }) => {
  if (!blog) return null;
  return (
    <Card
      className="blog"
      sx={{ m: 1, maxWidth: '400px', p: 1, borderRadius: 3 }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          By: {blog.author}
        </Typography>
        <Typography variant="body2">
          <a href={blog.url} target="_blank" rel="noopener">
            {blog.url}
          </a>
        </Typography>
        <Typography variant="body2">
          {blog.likes} {blog.likes <= 1 ? 'Like' : 'Likes'}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Added By: {blog.user.name}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        {user && (
          <Button
            color="info"
            variant="contained"
            onClick={() => handleLikeClick(blog)}
          >
            Like
          </Button>
        )}
        {user?.username === blog.user.username && (
          <Button
            color="warning"
            variant="outlined"
            onClick={() => handleDelete(blog)}
          >
            Delete
          </Button>
        )}
      </CardActions>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <CommentForm blogId={blog.id} user={user} />
      <List>
        {blog.comments && blog.comments.length > 0
          ? blog.comments.map((comment) => (
              <ListItem key={comment}>{comment}</ListItem>
            ))
          : 'No Comments Yet.'}
      </List>
    </Card>
  );
};

export default Blog;
