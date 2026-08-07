import useField from '../hooks/useField';
import { TextField, Button } from '@mui/material';
import { useBlogActions } from '../stores/blogsStore';

const CommentForm = ({ blogId, user }) => {
  const comment = useField('text', 'Text', 'comment');
  const { commentBlog } = useBlogActions();
  const addComment = () => {
    commentBlog(comment.data.value, blogId, user);
    comment.reset();
  };
  return (
    <div>
      <TextField {...comment.data} required></TextField>
      <Button onClick={addComment} variant="contained">
        Comment
      </Button>
    </div>
  );
};

export default CommentForm;
