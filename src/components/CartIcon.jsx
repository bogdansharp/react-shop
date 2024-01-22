import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../context';

export default function CartIcon() {
  const {toggleCart, goodsInCart} = useContext(ShopContext);
  return (
      <div className="cart-icon text-center fixed bg-amber-400 hover:bg-amber-300 right-2 sm:top-20 py-2 px-2 cursor-pointer bottom-11 sm:bottom-auto z-40 rounded-md">
        <div onClick={toggleCart} className="relative rounded-md">
          <FontAwesomeIcon 
            icon={faCartShopping} 
            className="text-3xl h-6 sm:h-8 w-auto text-white"
          />
          {goodsInCart.length ? 
            <span className='font-bold text-indigo-600 text-xs absolute -bottom-1 -left-1 z-50'>
              {goodsInCart.length}
            </span> : null
          }
        </div>
      </div>
    );
}
