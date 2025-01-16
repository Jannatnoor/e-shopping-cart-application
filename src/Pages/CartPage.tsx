import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import CartProduct from '../components/CartProduct';
import { emptyCart } from '../services/reducers/cartSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import CartItem from '../types/CartItem';
import './styles/CartPage.scss'

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const carts: CartItem[] = useAppSelector((state) => state.cartReducer);
  const totalPrice =
    carts.length > 0
      ? carts.reduce((total, cart) => total + cart.price * cart.quantity, 0)
      : 0;
  const totalItems =
    carts.length > 0
      ? carts.reduce((total, cart) => total + cart.quantity, 0)
      : 0;

  const handleCleanCartItem = () => {
    dispatch(emptyCart());
  };

  return (
    <div className='cart-container'>
      <div className='cart-content'>
        {carts.length === 0 ? (
          <div className='cart-empty'>
            <h2>Your cart is empty</h2>
            <button className='btn btn-primary' onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className='cart-header'>
              <div className='cart-summary'>
                <h2>Total Items: {totalItems}</h2>
                <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
              </div>
              <div className='cart-buttons'>
                <button
                  className='btn btn-danger'
                  onClick={handleCleanCartItem}
                >
                  Remove All
                </button>
                <button
                  className='btn btn-secondary'
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            <div className='cart-items'>
              {carts.map((cart) => (
                <div key={cart._id} className='cart-item'>
                  <CartProduct cart={cart} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
