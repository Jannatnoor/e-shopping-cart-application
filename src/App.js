import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Nopage from "./pages/Nopage";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const products = [
  {
    name: "Samsung S22",
    price: "1200 $",
    image: "https://picsum.photos/500/300?random=2",
  },

  {
    name: "Iphone 13",
    price: "1300 $",
    image: "https://picsum.photos/500/300?random=3",
  },

  {
    name: "Iphone 14",
    price: "1300 $",
    image: "https://picsum.photos/500/300?random=5",
  },

  {
    name: "Iphone 15",
    price: "1300 $",
    image: "https://picsum.photos/500/300?random=99",
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home product={products} />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
