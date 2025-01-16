import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/auth.scss';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { logInUserAsync } from '../services/reducers/authReducer';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({ email: '', password: '' });
  const { error } = useAppSelector((state) => state.authReducer);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogInData({ ...logInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(logInUserAsync(logInData));
    if (resultAction.meta.requestStatus === 'fulfilled') {
      toast.success('Logged in successfully');
      navigate('/');
    } else if (resultAction.meta.requestStatus === 'rejected') {
      error.length != 0 ? toast.error(error) : toast.error('Error loggin in');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Welcome Back</h2>
        {error && <div className='error-message'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={logInData.email}
              onChange={onChangeHandler}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={logInData.password}
              onChange={onChangeHandler}
              placeholder='Enter your password'
              required
            />
          </div>

          <button type='submit' className='submit-button'>
            Log in
          </button>

          <div className='auth-link'>
            Don't have an account?
            <Link to='/signup'>Sign up</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
