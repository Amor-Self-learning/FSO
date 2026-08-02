const Profile = ({ user }) => {
  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><b>Username: </b>{user.username}</p>
      <p><b>Name: </b>{user.name}</p>
    </div>
  );
};

export default Profile;