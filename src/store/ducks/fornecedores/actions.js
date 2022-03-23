import * as types from './types';

export const getForn = data => {
    return {
        type: types.GET_FORN,
        data
    }
};

export const setForn = forn => {
    return {
        type: types.SET_FORN,
        forn
    }
};

export const addForn = forn => {
    return {
        type: types.ADD_FORN,
        forn
    }
}

export const setRefresh = refresh => {
    return {
        type: types.SET_FORN_REFRESH,
        refresh,
    };
};

export const updateStatus = forn => {
    return {
        type: types.SET_STATUS,
        forn
    }
};

export const deleteForn = forn => {
    return {
        type: types.DELETE_FORN,
        forn
    }
};

export const select = forn => {
    return {
        type: types.SELECT_FORN,
        forn
    }
};

export const updateForn = (forn, id) => {
    return {
        type: types.UPDATE_FORN,
        forn,
        id
    }
}

export default {
    getForn,
    setForn,
    setRefresh,
    addForn,
    updateStatus,
    deleteForn,
    select,
    updateForn
}