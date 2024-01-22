export default function reducer(state, {action, param}) {
    const cartIndex = param && 'id' in param ? 
        state.goodsInCart.findIndex(item => item.id === param.id) : -1;

    switch (action) {

        case 'START_LOADNG':
            state.isLoading = true;
            break;

        case 'SET_GOODS': 
            state.goods = param && 'goods' in param ? param.goods : [];
            state.isLoading = false;
            state.page = 1;
            state.goodsOnPage = state.goods.slice(0, state.perPage);
            break;

        case 'GOTO_PAGE':
            const maxPage = Math.ceil(state.goods.length / state.perPage);
            const newPage = Number(param.page);
            if (newPage > 0 && newPage < maxPage) {
                state.page = newPage;
                state.goodsOnPage = state.goods.slice(
                    (newPage - 1) * state.perPage, newPage * state.perPage);
            }
            break;

        case 'ADD_TO_CART': 
            if (cartIndex < 0) {
                const index = state.goods.findIndex(item => item.mainId === param.id);
                if (index >= 0) {
                    const item = state.goods[index];
                    const imgUrl = (item.granted && Array.isArray(item.granted) && 
                            item.granted.length > 0 && 'images' in item.granted[0] && 
                            'icon' in item.granted[0].images) ?
                        item.granted[0].images.icon : 
                        `https://placehold.co/150x150?text=${item.displayName}`;
                    const newItem = {id: param.id, count: 1, name: item.displayName,
                        price: Number(item.price.finalPrice), img: imgUrl, 
                        about: item.displayType, };
                    state.goodsInCart = [...state.goodsInCart, newItem];
                    state.sumInCart += newItem.price;
                    state.alertText = `${newItem.name} added to cart`;
                }
            } else {
                const newItem = state.goodsInCart[cartIndex];
                newItem.count++;
                state.sumInCart += newItem.price;
                state.alertText = `+1 ${newItem.name} added to cart`;
            }
            break;

        case 'REMOVE_FROM_CART':
            if (cartIndex >= 0) {
                const item = state.goodsInCart[cartIndex];
                state.goodsInCart.splice(cartIndex, 1);
                state.sumInCart -= item.price * item.count;
            }
        break;

        case 'INC_CART_QTY':
            if (cartIndex >= 0) {
                const item = state.goodsInCart[cartIndex];
                item.count++;
                state.sumInCart += item.price;
            }
            break;

        case 'DEC_CART_QTY':
            if (cartIndex >= 0) {
                const item = state.goodsInCart[cartIndex];
                item.count--;
                if (item.count <= 0) {
                    state.goodsInCart.splice(cartIndex, 1);
                }
                state.sumInCart -= item.price;
            }
            break;

        case 'TOGGLE_CART': 
            state.isCartShow = ! state.isCartShow;
            break;
        
        case 'HIDE_ALERT':
            state.alertText = '';
            break;
        
        default:
            return state;
    }
    return {...state}
}
