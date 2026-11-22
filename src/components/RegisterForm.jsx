import useForm from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';

const RegisterForm = () => {
  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  const {postUser} = useUser();
  const doRegister = async () => {
    try {
      const result = await postUser(inputs);
      console.log('Registration successful:', result.message);
    } catch (error) {
      console.log('Registration failed:', error.message);
    }
  };

  const {inputs, handleSubmit, handleInputChange} = useForm(
    doRegister,
    initValues,
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
