import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { decodeToken } from '../common/getToken';
import "./styles/Layout.scss";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carts = useAppSelector((state) => state.cartReducer);
  const { currentUser } = useAppSelector((state) => state.authReducer);

  const isLoggedIn = !!currentUser;
  const decodedUser = isLoggedIn
    ? decodeToken(currentUser?.toString() || '')
    : null;

  const logout = () => {
    navigate('/');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <h1 className="navbar__brand" onClick={() => navigate('/')}>
          Express Store
        </h1>

        {isLoggedIn ? (
          <div className="navbar__actions">
            <button 
              className="navbar__button" 
              onClick={() => navigate('/profile')}
            >
              {decodedUser?.email}
            </button>
              <button 
                className="navbar__button" 
                onClick={() => navigate('/')}
              >
                Home
              </button>
            
            <button 
              className="navbar__button navbar__button--logout" 
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar__actions">
            <button 
              className="navbar__button" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="navbar__button" 
              onClick={() => navigate('/signup')}
            >
              SignUp
            </button>
          </div>
        )}

        {location.pathname !== '/cart' && (
          <div className="cart-icon" onClick={() => navigate('/cart')}>
            🛒
            {carts.length > 0 && (
              <span className="cart-icon__badge">
                {carts.length}
              </span>
            )}
          </div>
        )}
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;