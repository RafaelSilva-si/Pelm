import * as type from './type';

export const getProductList = query => {
    return {
        type: type.GET_PRODUCTS,
        query
    }
}

export const setProductList = list => {
    return {
        type: type.SET_PRODUCTS_LIST,
        list
    }
}

export const setRefresh = refresh => {
	return {
		type: type.SET_PRODUCTS_REFRESH,
		refresh,
	};
};

export const addProducts = product => {
    return {
        type: type.ADD_PRODUCTS,
        product
    };
};

export default {
    getProductList,
    setProductList,
    setRefresh,
    addProducts
}