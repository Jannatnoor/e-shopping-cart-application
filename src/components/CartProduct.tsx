import CartItem from '../types/CartItem';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  removeProductFromCart,
  updateCartItemQuantity,
} from '../services/reducers/cartSlice';
import './styles/CartProduct.scss'

const CartProduct: React.FC<{ cart: CartItem }> = ({ cart }) => {
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = () => {
    cart.quantity > 1
      ? dispatch(
          updateCartItemQuantity({ _id: cart._id, quantity: cart.quantity - 1 })
        )
      : dispatch(removeProductFromCart({ id: cart._id }));
  };

  const handleIncreaseQuantity = () => {
    dispatch(
      updateCartItemQuantity({ _id: cart._id, quantity: cart.quantity + 1 })
    );
  };

  const handleRemoveCartItem = () => {
    dispatch(removeProductFromCart({ id: cart._id }));
  };

  return (
    <div className='cart-product'>
      <div className='product-image'>
        <img src={cart.images[0]} alt={cart.name} height='200' width='200' />
      </div>

      <div className='product-info'>
        <h3>{cart.name}</h3>
        <p className='price'>${cart.price.toFixed(2)}</p>

        <div className='quantity-controls'>
          <button onClick={handleDecreaseQuantity}>−</button>
          <span>{cart.quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>

        <button className='remove-button' onClick={handleRemoveCartItem}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
