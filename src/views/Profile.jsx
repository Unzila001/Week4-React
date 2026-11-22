import {useUser} from '../hooks/apiHooks';
import {useState, useEffect} from 'react';

const Profile = () => {
  const {getUserByToken} = useUser();
  const token = localStorage.getItem('token');
  console.log('Token exists:', !!token);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) return;

      try {
        const userData = await getUserByToken(token);
        console.log('Profile API response:', userData);
        setUser(userData.user);
      } catch (error) {
        console.error('Failed to load user:', error.message);
      }
    };
    loadUser();
  }, [token]);

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </>
  );
};

export default Profile;
