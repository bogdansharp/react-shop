export default function reducer(state, {action, param}) {
    const cartIndex = param && 'id' in param ? 
        state.goodsInCart.findIndex(item => item.id === param.id) : -1;
    const cartItem = cartIndex >= 0 ? state.goodsInCart[cartIndex] : null;

    switch (action) {

        case 'START_LOADNG':
            return {...state, isLoading: true};

        case 'SET_GOODS': 
            return {...state, 
                isLoading: false, 
                goods: param.goods || [], 
                page: 1, 
                goodsOnPage: param.goods ? param.goods.slice(0, state.perPage) : []
            };

        case 'GOTO_PAGE':
            const maxPage = Math.ceil(state.goods.length / state.perPage);
            const newPage = Number(param.page);
            if (newPage <= 0 || newPage > maxPage) 
                break;
            return {...state, 
                page: newPage, 
                goodsOnPage: state.goods.slice(
                    (newPage - 1) * state.perPage, newPage * state.perPage)
            };

        case 'ADD_TO_CART': 
            if (cartIndex < 0) {
                const index = state.goods.findIndex(item => item.mainId === param.id);
                if (index < 0) 
                    break;
                const item = state.goods[index];
                const imgUrl = (item.granted && Array.isArray(item.granted) && 
                        item.granted.length > 0 && 'images' in item.granted[0] && 
                        'icon' in item.granted[0].images) ?
                    item.granted[0].images.icon : 
                    `https://placehold.co/150x150?text=${item.displayName}`;
                const newItem = {id: param.id, count: 1, name: item.displayName,
                    price: Number(item.price.finalPrice), img: imgUrl, 
                    about: item.displayType, };
                return {...state, 
                    sumInCart: state.sumInCart + newItem.price,
                    alertText: `${newItem.name} added to cart`,
                    goodsInCart: [...state.goodsInCart, newItem]
                };
            } else {
                return {...state, 
                    sumInCart: state.sumInCart + cartItem.price,
                    alertText: `+1 ${cartItem.name} added to cart`,
                    goodsInCart: state.goodsInCart.map((item, idx) => 
                        idx === cartIndex ? {...item, count: item.count + 1} : item )
                };
            }

        case 'REMOVE_FROM_CART':
            if (cartIndex < 0) 
                break;
            return {...state, 
                sumInCart: state.sumInCart - cartItem.price * cartItem.count,
                goodsInCart: state.goodsInCart.filter((item, idx) => idx !== cartIndex)
            };

        case 'INC_CART_QTY':
            if (cartIndex < 0) 
                break;
            return {...state, 
                sumInCart: state.sumInCart + cartItem.price,
                goodsInCart: state.goodsInCart.map((item, idx) => 
                    idx === cartIndex ? {...item, count: item.count + 1} : item )
            };

        case 'DEC_CART_QTY':
            if (cartIndex < 0) 
                break;
            return {...state, 
                sumInCart: state.sumInCart - cartItem.price,
                goodsInCart: cartItem.count <= 1 ?
                    state.goodsInCart.filter((item, idx) => idx !== cartIndex) :
                    state.goodsInCart.map((item, idx) => 
                        idx === cartIndex ? {...item, count: item.count - 1} : item )
            };

        case 'TOGGLE_CART':
            return {...state, isCartShow: ! state.isCartShow};
        
        case 'HIDE_ALERT':
            return {...state, alertText: ''};
        
        default:
            return state;
    }
    return state;
}
