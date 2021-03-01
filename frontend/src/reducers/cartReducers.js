import { CART_ADD_ITEM } from "../constants/cartConstants";

export const carReducer = (state ={cartItems:[] }, action) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.playload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return {
                  ...state,
                  error: '',
                  cartItems: state.cartItems.map((x) =>
                    x.product === existItem.product ? item : x
                  ),
                };
              } else {
                return { ...state, error: '', cartItems: [...state.cartItems, item] };
              }
            default:
            return state;
        }

};