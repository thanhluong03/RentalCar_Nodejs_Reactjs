import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    cars: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.FETCH_SEARCH_CAR_SUCCESS:
            return {
                ...state,
                cars: action.payload
            };
        case actionTypes.FETCH_SEARCH_CAR_FAILED:
            return {
                ...state,
                cars: []
            };
        default:
            return state;
    }
}

export default userReducer;