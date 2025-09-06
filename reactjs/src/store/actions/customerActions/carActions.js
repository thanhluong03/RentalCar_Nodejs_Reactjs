import actionTypes from '../actionTypes';
import { searchCars} from '../../../services/userService';
import {toast} from "react-toastify"

export const fetchSearchCar = (keyword) => {
    return async (dispatch) => {
        try {
            let res = await searchCars(keyword);
            if (res && res.errCode === 0) {
                dispatch(fetchSearchCarSuccess(res.cars.reverse()));
            } else {
                toast.error("Fetch search car failed");
                dispatch(fetchSearchCarFailed());
            }
        } catch (e) {
            toast.error("Fetch search car failed");
            dispatch(fetchSearchCarFailed());
            console.error('fetchSearchCar error', e);
        }
    };
};


export const fetchSearchCarSuccess = (cars) => ({
    type: actionTypes.FETCH_SEARCH_CAR_SUCCESS,
    payload: cars,
});

export const fetchSearchCarFailed = () => ({
    type: actionTypes.FETCH_SEARCH_CAR_FAILED,
});