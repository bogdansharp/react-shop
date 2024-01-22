import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import GoodsList from './GoodsList';
import CartIcon from './CartIcon';
import CartList from './CartList';
import CartAlert from './CartAlert';

const API_KEY = process.env.REACT_APP_FORTNITE_API_KEY;

export default function Main() {
    const [isLoading, setLoading] = useState(false);
    const [goods, setGoods] = useState([]);
    const [goodsInCart, setGoodsInCart] = useState([]);
    const [sumInCart, setSumInCart] = useState(0);
    const [isCartShow, setCartShow] = useState(false);
    const [alertText, setAlertText] = useState('');

    useEffect(() => {
        setLoading(true);
        fetch(`https://fortniteapi.io/v2/shop?lang=en`, { method: 'GET',
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
            })
            .finally(() => setLoading(false));    
    }, []);

    const addToCart = function(id) {
        const cartIndex = goodsInCart.findIndex(item => item.id === id);
        if (cartIndex < 0) {
            const index = goods.findIndex(item => item.mainId === id);
            if (index < 0) return;
            const imgUrl = (goods[index].granted && Array.isArray(goods[index].granted) && 
                    goods[index].granted.length > 0 && 'images' in goods[index].granted[0] && 
                    'icon' in goods[index].granted[0].images) ?
                goods[index].granted[0].images.icon : 
                `https://placehold.co/150x150?text=${goods[index].displayName}`;
            const newItem = {id: id, count: 1, name: goods[index].displayName,
                price: Number(goods[index].price.finalPrice), img: imgUrl, 
                about: goods[index].displayType, };
            setGoodsInCart([...goodsInCart, newItem]);
            setSumInCart(sumInCart + newItem.price);
            setAlertText(`${newItem.name} added to cart`);
        } else {
            const newItem = goodsInCart[cartIndex];
            newItem.count++;
            setGoodsInCart([...goodsInCart.filter(item => item.id !== id), newItem]);
            setSumInCart(sumInCart + newItem.price);
            setAlertText(`+1 ${newItem.name} added to cart`);
        }
    }

    const removeFromCart = function(id) {
        const cartIndex = goodsInCart.findIndex(item => item.id === id);
        if (cartIndex < 0) return;
        const item = goodsInCart[cartIndex];
        setGoodsInCart([...goodsInCart.filter(item => item.id !== id)]);
        setSumInCart(sumInCart - item.price * item.count);
    }

    const incCartQuantity = function(id) {
        const cartIndex = goodsInCart.findIndex(item => item.id === id);
        if (cartIndex < 0) return;
        const item = goodsInCart[cartIndex];
        item.count++;
        setGoodsInCart(goodsInCart);
        setSumInCart(sumInCart + item.price);
    }

    const decCartQantity = function(id) {
        const cartIndex = goodsInCart.findIndex(item => item.id === id);
        if (cartIndex < 0) return;
        const item = goodsInCart[cartIndex];
        item.count--;
        if (item.count > 0) {
            setGoodsInCart(goodsInCart);
        } else {
            setGoodsInCart([...goodsInCart.filter(item => item.id !== id)]);
        }
        setSumInCart(sumInCart - item.price);
    }

    const toggleCart = function() { 
        setCartShow(! isCartShow);
    }

    return (
        <>
            <main className="flex-grow">
                <div className='my-8'>
                    { isLoading ? <Loading/> : goods.length ? 
                        <GoodsList goods={goods} addToCart={addToCart} /> :
                        <span className='text-lg'>No goods found</span> }
                </div>
            </main>
            <CartIcon quantity={goodsInCart.length} toggleCart={toggleCart} />
            { isCartShow ? <CartList 
                goodsInCart={goodsInCart} 
                toggleCart={toggleCart} 
                incCartQuantity={incCartQuantity}
                decCartQantity={decCartQantity}
                removeFromCart={removeFromCart}
                sumInCart={sumInCart}
            /> : null }
            { alertText && <CartAlert text={alertText} closeAlert={() => {setAlertText('')}} /> }
        </>
    );
}