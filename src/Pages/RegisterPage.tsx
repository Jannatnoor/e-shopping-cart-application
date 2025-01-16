import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/auth.scss'

import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createUserAsync } from '../services/reducers/userReducer';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.userReducer);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await dispatch(createUserAsync(formData));

    if (response.meta.requestStatus === 'fulfilled') {
      toast.success('Account successfully created');
      navigate('/login');
    } else if (response.meta.requestStatus === 'rejected') {
      toast.error(error);
    }
  };

    return (
      <div className='auth-container'>
        <div className='auth-card'>
          <h2>Create Account</h2>
          {error && <div className='error-message'>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your name'
                required
              />
            </div>

            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                required
              />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Choose a password'
                required
              />
            </div>

            <button
              type='submit'
              className='submit-button'
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className='auth-link'>
              Already have an account?
              <Link to='/login'>Sign in</Link>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    );
};

export default RegisterPage;
