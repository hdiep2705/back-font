import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import{
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers';
import thunk from 'redux-thunk';


const initialState ={};
const reducer = combineReducers({
    productList: productListReducer,
    productDerails: productDetailsReducer,
});
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(
    reducer, 
    initialState,
     composeEnhancer(applyMiddleware(thunk))
);

export default store;
