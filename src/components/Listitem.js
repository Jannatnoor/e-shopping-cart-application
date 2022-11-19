import React from 'react'
import Item from './Item'

const Listitem = ({items}) => {
      
  return (
    <div className='items'>
    {items.map(element=> (
       <Item name={element.name} price={element.price} image={element.image} /> 
    ))};
    

    </div>
  )
}

export default Listitem