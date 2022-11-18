import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Nopage from "./pages/Nopage";
import Contact 
 from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Nopage />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
