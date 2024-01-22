import React from 'react';
import GoodCard from './GoodCard';

export default function GoodsList( {goods = [], addToCart = Function.prototype} ) {
    return (
        <div className='goods-list-outer text-lg sm:text-xl container mx-auto'>
            <div className='goods-list grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {goods.map(item => <GoodCard key={item.mainId} {...item} addToCart={addToCart}/>)}
            </div>
        </div>
    );
}