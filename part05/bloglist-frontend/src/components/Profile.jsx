import loginService from '../services/login';

const handleLogout = async (setUser) => {
  loginService.logout();
  setUser(null);
}

const Profile = ({user, setUser}) => {
  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><b>Username: </b>{user.username}</p>
      <p><b>Name: </b>{user.name}</p>
      <button onClick={() => handleLogout(setUser)}>Logout</button>
    </div>
  )
}

export default Profile;