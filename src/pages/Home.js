import { computeHeadingLevel } from "@testing-library/react";
import React from "react";
import Listitem from "../components/Listitem";

const Home = ({products, onAddToCart}) => {

  
  return <div>
      <Listitem items={products} onAddToCart ={onAddToCart} />
      
  </div>
  
  
};

export default Home;
