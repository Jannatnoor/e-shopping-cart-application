import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import {
  fetchSingleProduct,
  deleteProduct,
} from '../services/reducers/productSlice';
import { addProductToCart } from '../services/reducers/cartSlice';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const singleProduct = useAppSelector((state) => state.productReducer.product);
  const error = useAppSelector((state) => state.productReducer.error);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  const handleNextImage = () => {
    if (singleProduct && singleProduct.images.length > 0) {
      setCurrentImageIndex(
        (currentImageIndex + 1) % singleProduct.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (singleProduct && singleProduct.images.length > 0) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + singleProduct.images.length) %
          singleProduct.images.length
      );
    }
  };

  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(addProductToCart(singleProduct));
    }
  };

  const handleDeleteProduct = async () => {
    if (singleProduct?._id) {
      await dispatch(deleteProduct(singleProduct._id));
      navigate('/');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!singleProduct) {
    return <div>Loading product details...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <div style={{ textAlign: 'center' }}>
        {singleProduct.images.length > 0 && (
          <div>
            <img
              src={singleProduct.images[currentImageIndex]}
              alt={singleProduct.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div>
              <button onClick={handlePrevImage}>Previous</button>
              <button onClick={handleNextImage}>Next</button>
            </div>
          </div>
        )}
      </div>

      <h1>{singleProduct.name}</h1>
      <p>Category: {singleProduct.categoryId?.name || 'Unknown'}</p>
      <p>Price: ${singleProduct.price}</p>
      <p>Description: {singleProduct.description}</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleDeleteProduct} style={{ marginLeft: '10px' }}>
          Delete Product
        </button>
        <button onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
