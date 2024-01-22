import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context';
import Loading from './Loading';
import GoodsList from './GoodsList';
import CartIcon from './CartIcon';
import CartList from './CartList';
import CartAlert from './CartAlert';

const API_KEY = process.env.REACT_APP_FORTNITE_API_KEY;
const API_URL = 'https://fortniteapi.io/v2/shop?lang=en';

export default function Main() {
    const { isLoading, goodsOnPage, isCartShow, alertText, setGoods, startLoading
    } = useContext(ShopContext);

    useEffect(function getGoods() {
        //startLoading();
        fetch(API_URL, { method: 'GET',
            headers: { Accept: 'application/json', Authorization: API_KEY } 
        })
            .then(response => response.json())
            .then(data => {
                if ('result' in data && data.result === true && 'shop' in data) {
                    setGoods(data.shop);
                } else {
                    setGoods([]);
                }
            })
            .catch(err => { 
                console.error(err); 
                setGoods([]);
            });
    }, [setGoods, startLoading]);
    
    return (
        <>
            <main className="flex-grow">
                <div className='my-8'>
                    { isLoading ? <Loading /> : goodsOnPage.length ? 
                        <GoodsList /> :
                        <span className='text-lg'>No goods found</span> }
                </div>
            </main>
            <CartIcon />
            { isCartShow ? <CartList /> : null }
            { alertText ? <CartAlert /> : null }
        </>
    );
}