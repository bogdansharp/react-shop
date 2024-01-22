import React, { useContext } from 'react';
import { ShopContext } from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
// import { faClose } from '@fortawesome/free-solid-svg-icons';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
// import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function CartItem ({id, name, about, count, img, price}) {
  const {incCartQty, decCartQty, removeFromCart} = useContext(ShopContext);
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
              onClick={() => decCartQty(id)}
            >
              <FontAwesomeIcon icon={faMinus} className="h-4" />
            </span>
            <span className='select-none'>Qty {count}</span>
            
            <span 
              className='cursor-pointer text-indigo-600 px-1' 
              onClick={() => incCartQty(id)}
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
