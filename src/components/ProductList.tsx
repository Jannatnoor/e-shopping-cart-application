import React from 'react';
import CardItem from './Card';
import Product from '../types/Product';
import "./styles/ProductList.scss";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product: Product) => (
        <div className="product-list__item" key={product._id}>
          <CardItem product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;