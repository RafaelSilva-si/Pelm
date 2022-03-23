import * as types from './types';

const initialState = {
    list: false,
    select: {}
};

const brandsReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SET_BRANDS:
            return {
                ...state,
                list: action.brands
            };
        case types.SET_REFRESH:
            return {
                ...state,
                refresh: action.refresh
            };
        case types.SELECT_BRAND:
            return {
                ...state,
                select: action.brand
            }
        default :
            return state
    }
};

export default brandsReducer;