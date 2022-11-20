import React from 'react'

const Item = ({id, name, price, img, desc, onAddToCart}) => {
  const removeTags = (str) => {
      if (str === null || str === '') return false;
      else str = str.toString();
      return str.replace(/(<([^>]+)>)/gi, '');
  
  };
  return (
    <div className='card'>
    <img className='card-image' src={img} alt=''  />
    <h1> {name} </h1> 
    <p>{price}</p>
    <p>{removeTags(desc)}</p>

    <button onClick={() => {onAddToCart(id, 1)}}> Add to Cart </button>

    </div>
  )
}

export default Item