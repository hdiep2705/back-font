import Axios from "axios";
import {
    PRODUCT_DETAILS_FAIL,
     PRODUCT_DETAILS_REQUEST, 
     PRODUCT_DETAILS_SUCCESS,
      PRODUCT_LIST_FAIL,
       PRODUCT_LIST_REQUEST, 
       PRODUCT_LIST_SUCCESS,
    } 
       from '../constants/productConstants';

export const lisProducts = () => async (dispatch) =>{
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try{
        const{data} = await Axios.get('/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.messge});
    }
};

export const detailsProduct = (productId) => async (dispatch) =>{
dispatch({ type: PRODUCT_DETAILS_REQUEST, playload: productId});
try{
    const {data} = await Axios.get(`api/products/${productId}`);
    dispatch({type: PRODUCT_DETAILS_SUCCESS, playload: data});

}catch(error){
    dispatch({type:PRODUCT_DETAILS_FAIL,
    playload: error.response && error.response.data.message
        ?error.response.data.message
        :error.message,
});
}
};
 