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

export const select = product => {
    return {
        type: type.SELECT_PRODUCTS,
        product
    };
};

export const onUpdateStatus = product => {
    return {
        type: type.UPDATE_STATUS,
        product
    };
};

export const onDelete= product => {
    return {
        type: type.DELETE_PRODUCTS,
        product
    };
};

export const onEdit = (product, id) => {
    return {
        type: type.EDIT_PRODUCT,
        product,
        id
    }
}

export default {
    getProductList,
    setProductList,
    setRefresh,
    addProducts,
    select,
    onUpdateStatus,
    onDelete,
    onEdit
}