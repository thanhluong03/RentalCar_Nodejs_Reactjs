import actionTypes from '../actionTypes';
import { createNewRentalCarService } from '../../../services/userService';
import { toast } from "react-toastify";

export const createRentalCarStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await createNewRentalCarService(data);
            if (res && res.errCode === 0) {
                toast.success("Create new rental car success");
                dispatch(saveRentalCarSuccess());
            } else {
                toast.error(res.errMessage || "Create new car error")
                dispatch(saveRentalCarFailed());
            }

            return res;
        } catch (e) {
            console.error('Create new rental car error:', e);
            toast.error("Connect error server");
            dispatch(saveRentalCarFailed());
            return { errCode: -1, errMessage: 'Connect error server' }; 
        }
    };
};

export const saveRentalCarSuccess = () => ({
    type: actionTypes.CREATE_RENTAL_CAR_SUCCESS,
});

export const saveRentalCarFailed = () => ({
    type: actionTypes.CREATE_RENTAL_CAR_FAILED,
});
