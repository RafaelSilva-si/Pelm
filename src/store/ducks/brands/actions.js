import * as types from './types';

export const onGetList = query => {
    return {
        type: types.GET_BRANDS,
        query
    };
};

export const onSetList = brands => {
    return {
        type: types.SET_BRANDS,
        brands
    };
};

export const setRefresh = refresh => {
    return {
        type: types.SET_REFRESH,
        refresh,
    };
};

export const onAddBrands = brands => {
    return {
        type: types.ADD_BRAND,
        brands
    }
};

export const select = brand => {
    return {
        type: types.SELECT_BRAND,
        brand
    };
};

export const onUpdateStatus = brand => {
    return {
        type: types.UPDATE_STATUS,
        brand
    };
};

export const onDelete = brand => {
    return {
        type: types.DELETE_BRAND,
        brand
    };
};

export const onEdit = (brand, id )=> {
    return {
        type: types.UPDATE_BRAND,
        brand,
        id
    }
}

export default {
    onGetList,
    onSetList,
    select,
    onDelete,
    onUpdateStatus,
    setRefresh,
    onAddBrands,
    onEdit
}