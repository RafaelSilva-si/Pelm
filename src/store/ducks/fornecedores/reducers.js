import * as types from './types';

const initialState = {
    list: false,
    select: {}
};

const fornReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_FORN:
            return {
                ...state,
                list: action.forn
            }
        case types.SET_FORN_REFRESH:
            return {
                ...state,
                refresh: action.refresh,
            };
        case types.SELECT_FORN:
            return {
                ...state,
                select: action.forn
            }
        default:
            return state;
    }
}

export default fornReducer;