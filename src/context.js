import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const ShopContext = createContext();

const GOODS_PER_PAGE = 24;
const defaults = {
    isLoading: false,
    goods: [],
    page: 1,
    perPage: GOODS_PER_PAGE,
    goodsOnPage: [],
    goodsInCart: [],
    sumInCart: 0,
    isCartShow: false,
    alertText: '',
};

export const ContextProvider = function({children}) {
    const [state, dispatch] = useReducer(reducer, defaults);
    state.gotoPage = (page) => dispatch({action: 'GOTO_PAGE', param: {page}});
    state.addToCart = (id) => dispatch({action: 'ADD_TO_CART', param: {id}});
    state.removeFromCart = (id) => dispatch({action: 'REMOVE_FROM_CART', param: {id}});
    state.incCartQty = (id) => dispatch({action: 'INC_CART_QTY', param: {id}});
    state.decCartQty = (id) => dispatch({action: 'DEC_CART_QTY', param: {id}});
    state.toggleCart = () => dispatch({action: 'TOGGLE_CART'});
    state.hideAlert = () => dispatch({action: 'HIDE_ALERT'});
    state.setGoods = (goods) => dispatch({action: 'SET_GOODS', param: {goods}});
    state.startLoading = () => dispatch({action: 'START_LOADING'});

    return (
        <ShopContext.Provider value={state}>
            {children}
        </ShopContext.Provider>
    );
}