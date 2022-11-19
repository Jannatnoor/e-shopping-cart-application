import React from 'react'

const Item = ({name, price, image}) => {
  return (
    <div className='card'>
    <img className='card-image' src={image} alt=''  />
    <h1> {name} </h1> 
    <p>{price}</p>

    </div>
  )
}

export default Item