import React from 'react'
import Item from './Item'

const Listitem = ({items, onAddToCart}) => {
      
  return (
    <div className='items'>
    {items.map(element=> (
       <Item id={element.id} img={element.image.url} name={element.name} price={element.price.formatted_with_symbol} desc={element.description} onAddToCart={onAddToCart}/> 
    ))};
    

    </div>
  )
}

export default Listitem