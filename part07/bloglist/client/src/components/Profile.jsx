import { Card, CardContent, Typography } from '@mui/material';

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <Card sx={{ m: 2, fontWeight: 500, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Profile
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Username: </strong> {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Name: </strong> {user.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;