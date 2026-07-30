import loginService from '../services/login';

const handleLogout = async (user,setUser) => {
  loginService.logout();
  setMessage({text: `${user.username} Logged out`, ok: true})
  setUser(null);
}

const Profile = ({user, setUser, setMessage}) => {
  return (
    <div className="profile">
      <h2>Profile</h2>
      <p><b>Username: </b>{user.username}</p>
      <p><b>Name: </b>{user.name}</p>
      <button onClick={() => handleLogout(user, setUser)}>Logout</button>
    </div>
  )
}

export default Profile;