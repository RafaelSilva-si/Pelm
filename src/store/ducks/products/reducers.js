import * as types from './type';

const initialState = {
    listProd: false,
    select: {}
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PRODUCTS_LIST:
            return {
                ...state,
                listProd: action.list
            }
        case types.SET_PRODUCTS_REFRESH:
            return {
                ...state,
                refresh: action.refresh,
            };
        case types.SELECT_PRODUCTS:
            return {
                ...state,
                select: action.product
            }
        default:
            return state;
    }
}

export default productsReducer;