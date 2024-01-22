import React, { useEffect } from 'react';
import GoodCard from './GoodCard';
import Pagination from './Pagination';

export default function GoodsList( {goods = [], page=1, perPage, totalGoods,
        addToCart = Function.prototype, gotoPage = Function.prototype, } )
{
    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page] );
    return (
        <div className='goods-list-outer text-lg sm:text-xl container mx-auto'>
            <div className='goods-list grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {goods.map(item => <GoodCard key={item.mainId} {...item} addToCart={addToCart}/>)}
            </div>
            { totalGoods > perPage ?
                <Pagination 
                    page={page} 
                    perPage={perPage} 
                    totalResults={totalGoods} 
                    goToPage={gotoPage}
                /> : null
            }
        </div>
    );
}