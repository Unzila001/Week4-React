import {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Login
  const handleLogin = async (credentials) => {
    try {
      const result = await postLogin(credentials);
      localStorage.setItem('token', result.token);

      const userResult = await getUserByToken(result.token);
      setUser(userResult.user);

      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // Automatic login when the app loads
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');

      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);

        navigate(location.pathname);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
