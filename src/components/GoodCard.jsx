import React, { useContext } from "react";
import { ShopContext } from "../context";

export default function GoodCard({
    displayName, displayDescription, mainId, price, granted, displayType})
{
  const {addToCart} = useContext(ShopContext);
  const imgUrl = (granted && Array.isArray(granted) && granted.length > 0 &&
    'images' in granted[0] && 'full_background' in granted[0].images) ?
    granted[0].images.full_background : `https://placehold.co/150x150?text=${displayName}`;
  
  return (
    <div className="good-card flex flex-col max-w-md mx-auto mb-6 rounded-md overflow-hidden shadow-lg bg-amber-50 px-2">

      <div className="">
        <div className="inset-0 flex items-center justify-center">
          <img
            src={imgUrl}
            alt={displayName}
            className="inset-0 w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="px-4 py-4 flex-grow flex flex-col">
        <div className="text-gray-900 text-2xl">
          {displayName}
        </div>
        <div className="text-gray-700 text-base mb-4 text-left flex-grow">
          <p>{displayType}</p>
          <p>{displayDescription}</p>
        </div>
        <div className='text-left border-t border-solid border-gray-200 pt-4'>
          <button 
            onClick={() => addToCart(mainId)}
            className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-1 px-4 rounded"
          >
            Buy
          </button>
          <span className="float-right text-xl my-1">
            ${Number(price.finalPrice * 0.01).toFixed(2)}
          </span>
        </div>
      </div>

    </div>
  );
}
