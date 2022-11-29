import React from 'react'
import CartItem from '../components/CartItem';

const Cart = ({cartItem}) => {
  console.log(cartItem)
  return (
    <>
      {cartItem.line_items.map((item) => {
        return (
          <CartItem
            id={item.id}
            key={item.id}
            img={item.image.url}
            name={item.name}
            price={item.price.formatted_with_symbol}
            quantity={item.quantity}
          />
        );
      })}
        <div className='total-price'>
          subtotal:{cartItem.subtotal}
        </div>
    </>
  );
  }

export default Cart