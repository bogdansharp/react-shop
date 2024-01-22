import React, { useEffect, useContext } from 'react';
import { ShopContext } from '../context';
import GoodCard from './GoodCard';
import Pagination from './Pagination';

export default function GoodsList() {
    const {goodsOnPage, page, perPage, goods, gotoPage} 
        = useContext(ShopContext);

    useEffect(() => { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page] );


    return (
        <div className='goods-list-outer text-lg sm:text-xl container mx-auto'>
            <div className='goods-list grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {goodsOnPage.map(item => <GoodCard key={item.mainId} {...item}/>)}
            </div>
            { goods.length > perPage ?
                <Pagination 
                    page={page} 
                    perPage={perPage} 
                    totalResults={goods.length} 
                    goToPage={gotoPage}
                /> : null
            }
        </div>
    );
}