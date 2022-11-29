import React from 'react'

const CartItem = (props) => {
    const {id, name,price,img, quantity} = props;
  return (
    <div>
      <div className="container">
        <div className="cartitems">
          <img
            src= {img}
            alt=""
          />

          <div className="cartdescrip">
            <h1> {name} </h1>
            <p> {price} </p>
          </div>
          <div className="quantity">
            <button> + </button>
            <span> {quantity} </span>
            <button> - </button>
            <div>
              <button> remove </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem