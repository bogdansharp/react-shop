import React, { useContext } from 'react';
import { ShopContext } from '../context';
import CartItem from './CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function CartList() {
  const {goodsInCart, sumInCart, toggleCart} = useContext(ShopContext);
  
  return (
      <div className="cart-list fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl ease-in-out duration-300 max-w-xl sm:w-4/5 w-full">
        <div className="flex flex-col bg-white shadow-xl">

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-medium text-gray-900 text-left">Shopping cart</h3>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={toggleCart}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close panel</span>
                  <FontAwesomeIcon icon={faClose} className="h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 overflow-y-auto min-h-32" style={{ maxHeight: '60vh' }}>
              <div className="flow-root">
                {goodsInCart.length ? 
                  <ul className="divide-y divide-gray-200">
                    {goodsInCart.map((item) => (<CartItem key={item.id} {...item} />))}
                  </ul> : 
                  <span className='text-lg text-gray-400 font-semibold'>
                    Cart is Empty
                  </span> 
                }
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p className='select-none'>Subtotal</p>
              <p>${Number(sumInCart * 0.01).toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            {goodsInCart.length ?
              <div className="mt-4 text-center">
                <a
                  href="#!"
                  className="max-w-40 rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </a>
              </div> : null 
            }
            <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
              <p>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={toggleCart}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>
    );
}
