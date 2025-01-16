import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Product from '../types/Product';
import { addProductToCart } from '../services/reducers/cartSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import './styles/Card.scss';

const CardItem: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addProductToCart(product));
  };

  const handleNavigateToDetails = () => {
    navigate(`/${product._id}`);
  };

  const carts = useAppSelector((state) => state.cartReducer);

  return (
    <div className="card">
      <div className="card__image-container">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="card__image"
        />
      </div>
      <div className="card__content">
        <h5 className="card__title">{product.name}</h5>
        <p className="card__category">{product.categoryName}</p>
        <p className="card__category">{product.categoryId?.name}</p>
        <p className="card__price">${product.price}</p>
      </div>
      <div className="card__actions">
        <button 
          className="card__button card__button--details" 
          onClick={handleNavigateToDetails}
        >
          Details
        </button>
        <button 
          className="card__button card__button--cart" 
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CardItem;
