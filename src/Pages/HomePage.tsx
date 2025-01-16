import React, { useEffect, useState } from 'react';
import {fetchAllProducts, sortByPrice,
} from '../services/reducers/productSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getFilteredItem } from '../components/FilterItem';
import ProductFilter from '../components/ProductFilter';
import SortByPriceOrder from '../components/SortByPriceOrder';
import { fetchAllCategories } from '../services/reducers/categoryReducer';
import Pagination from '../components/Pagination';
import ProductList from '../components/ProductList';

import './styles/HomePage.scss';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string | undefined>();
  const [category, setCategory] = useState<number>(100);
  const [priceSort, setPriceSort] = useState<'Low' | 'High'>('Low');
  const [currentpage, setCurrentpage] = useState(1);
  const [ProductPerPage, setProductPerPage] = useState(4);
  
  const lastPostIndex = currentpage * ProductPerPage;
  const firstPostIndex = lastPostIndex - ProductPerPage;

  useEffect(() => {
    if (category === 100) {
      dispatch(fetchAllProducts());
      dispatch(fetchAllCategories());
      setPriceSort('Low');
    } else {
      setPriceSort('High');
    }
  }, [category, dispatch]);

  const filteredProducts = useAppSelector((state) =>
    getFilteredItem(state, typeof search === 'string' ? search : '')
  );

  const mainResultProduct = filteredProducts.slice(
    firstPostIndex,
    lastPostIndex
  );

  const handleSort = () => {
    dispatch(sortByPrice(priceSort));
    setPriceSort(priceSort === 'Low' ? 'High' : 'Low');
  };

  const handleCategoryChange = (newCategory: unknown) => {
  if (typeof newCategory === 'number') {
    setCategory(newCategory);
  }
};


  return (
    <div className="home-page">
      <div className="home-page__controls">
        <div className="home-page__filters">
          <ProductFilter 
            search={search} 
            setSearch={setSearch} 
            
          />
          <SortByPriceOrder 
            priceSort={priceSort} 
            handleSort={handleSort}
            
          />
        </div>
      </div>

      <div className="home-page__content">
        <ProductList
          products={mainResultProduct} 
         
        />
      </div>

      <div className="home-page__pagination">
        <Pagination
          totalProducts={filteredProducts.length}
          ProductsPerPage={ProductPerPage}
          setCurrentPage={setCurrentpage}
          currentPage={currentpage}
          setProductsPerPage={setProductPerPage}
        />
      </div>
    </div>
  );
};

export default HomePage;