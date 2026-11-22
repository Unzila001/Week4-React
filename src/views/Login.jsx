import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useState} from 'react';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <>
      {showRegister ? <RegisterForm /> : <LoginForm />}

      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? 'Go to Login' : 'Go to Register'}
      </button>
    </>
  );
};
export default Login;
