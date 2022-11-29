import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Nopage from "./pages/Nopage";
import Cart from "./pages/Cart";
import commerce from "./lib/commerce";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";

//

function App() {
  const [products, setProducts] = React.useState([]);
  const [carts, setCarts]= React.useState([{}]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

    const fetchCart = async () => {
      const item = commerce.cart.retrive();
      setCarts(item);

    }
  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
      const cartItem = await commerce.cart.add(productId, quantity);
      setCarts(cartItem)
    
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout totalItem={carts.line_items} />}>
          <Route index element={<Home products={products} onAddToCart={handleAddToCart
          } />} />

          <Route path="cart" element={<Cart cartItem= {carts} />} />
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
