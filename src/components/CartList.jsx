import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const GoodInCartRow = function({id, name, about, count, img, price, 
  incCartQuantity=Function.prototype, decCartQantity=Function.prototype, 
  removeFromCart=Function.prototype}) 
{
  return (
    <li key={id} className="flex py-2 pr-1">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={img}
          alt={name}
          className="h-full w-full object-cover object-center bg-indigo-100 select-none"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p className="ml-4">
              <span className='text-gray-500 text-sm'>
                ${Number(price * count * 0.01).toFixed(2)} x {count} = &nbsp;
              </span>
              <span>
                ${Number(price * count * 0.01).toFixed(2)}
              </span>
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{about}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">
            <span 
              className='cursor-pointer text-indigo-600 px-1' 
              onClick={() => decCartQantity(id)}
            >
              <FontAwesomeIcon icon={faMinus} className="h-4" />
            </span>
            <span className='select-none'>Qty {count}</span>
            
            <span 
              className='cursor-pointer text-indigo-600 px-1' 
              onClick={() => incCartQuantity(id)}
            >
              <FontAwesomeIcon icon={faPlus} className="h-4" />
            </span>
          </p>

          <div className="flex">
            <button
              onClick={() => removeFromCart(id)}
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500 select-none"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function CartList({ goodsInCart=[], sumInCart=0,
    toggleCart=Function.prototype, incCartQuantity=Function.prototype, 
    decCartQantity=Function.prototype, removeFromCart=Function.prototype}) 
{
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
                    {goodsInCart.map((item) => (
                      <GoodInCartRow 
                        key={item.id}
                        {...item}
                        removeFromCart={removeFromCart}
                        incCartQuantity={incCartQuantity}
                        decCartQantity={decCartQantity}
                      />))}
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
                or{' '}
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
