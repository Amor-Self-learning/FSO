import { Card, CardContent, Typography } from '@mui/material';

const User = ({ user }) => {
  if (!user) return null;
  return (
    <Card
      className="blog"
      sx={{ m: 1, maxWidth: '400px', p: 1, borderRadius: 3 }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Added Blogs:
        </Typography>
        {user.blogs &&
          user.blogs.map((blog) => (
            <Typography key={blog.id} variant="body2" color="textSecondary">
              {blog.title}
            </Typography>
          ))}
      </CardContent>
    </Card>
  );
};

export default User;
