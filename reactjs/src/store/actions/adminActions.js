import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, 
    deleteUserService, editUserService, createNewCarService, getAllCars, editCarService, deleteCarService} from '../../services/userService';
import {toast} from "react-toastify"
import { dispatch } from '../../redux';
import reactRouter from 'react-router';
import { isTupleTypeNode } from 'typescript';
export const fetchGenderStart = () => {
    return async (dispatch, getState) =>{
        try {
            dispatch ({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0)
            {
                dispatch(fetchGenderSuccess(res.data))
            } else{
                dispatch(fetchGenderFaided())
            }
        } catch (e) {
            dispatch(fetchGenderFaided())
            console.log('fetchGenderFailed error', e)
        }
    }
    
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0)
            {
                dispatch(fetchPositionSuccess(res.data))
            } else{
                dispatch(fetchPositionFaided())
            }
        } catch (e) {
            dispatch(fetchPositionFaided())
            console.log('fetchPositionFailed error', e)
        }
    }
    
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) =>{
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0)
            {
                dispatch(fetchRoleSuccess(res.data))
            } else{
                dispatch(fetchRoleFaided())
            }
        } catch (e) {
            dispatch(fetchRoleFaided())
            console.log('fetchRoleFailed error', e)
        }
    }
    
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) =>{
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0)
            {
                toast.success("Create new user success")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else{
                dispatch(saevUserFaided())
            }
        } catch (e) {
            dispatch(saevUserFaided())
            console.log('saevUserFaided error', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saevUserFaided = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            
            if (res && res.errCode === 0){;
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("Fetch all users error!!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED,
})



export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0){
                toast.success("User deleted successfully");
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Delete users error!!");
                dispatch(deleteUserFailed());

            }
        } catch (e) {
            toast.error("Delete users error!");
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED,
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0){
                toast.success("User update successfully");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.error("Update users error!!");
                dispatch(editUserFailed());

            }
        } catch (e) {
            toast.error("Update users error!");
            dispatch(editUserFailed());
            console.log('EditUserFailed error', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED,
})


//// CARS
export const fetchTypeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch ({
                type: actionTypes.FETCH_TYPE_START
            })
            let res = await getAllCodeService("TYPE");
            if(res && res.errCode === 0)
            {
                dispatch(fetchTypeSuccess(res.data))
            } else
            {
                dispatch(fetchTypeFaided())
            }
        }
        catch (e) {
            dispatch(fetchTypeFaided())
            console.log('fetchFailed error', e)
        }
    }
}
export const fetchTypeSuccess = (typeData) => ({
    type: actionTypes.FETCH_TYPE_SUCCESS,
    data: typeData
})
export const fetchTypeFaided = () => ({
    type: actionTypes.FETCH_TYPE_FAILDED
})

export const fetchStatusStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch ({
                type: actionTypes.FETCH_STATUS_START
            })
            let res = await getAllCodeService("STATUSCAR");
            if(res && res.errCode === 0)
            {
                dispatch(fetchStatusSuccess(res.data))
            } else
            {
                dispatch(fetchStatusFaided())
            }
        } catch (e) {
            dispatch(fetchStatusFaided())
            console.log('fetchStatusfaided', e)
        }
    }
}

export const fetchStatusSuccess = (statusData) => ({
    type: actionTypes.FETCH_STATUS_SUCCESS,
    data: statusData
})

export const fetchStatusFaided = () => ({
    type: actionTypes.FETCH_STATUS_FAILDED
})


export const createNewCar = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCarService(data);
            if(res && res.errCode === 0)
            {
                toast.success("Create new car success")
                dispatch(saveCarSuccess())
                dispatch(fetchAllCarsStart())
            }
            else {
                toast.error("Create new user error")
                dispatch(saveCarFailed())
            }
        } catch (e) {
            dispatch(saveCarFailed())
            console.log('saveCarFailed error', e)
        }
    }
}


export const saveCarSuccess = () => ({
    type: actionTypes.CREATE_CAR_SUCCESS
})
export const saveCarFailed = () => ({
    type: actionTypes.CREATE_CAR_FAILED
})


export const fetchAllCarsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCars("ALL");
            
            if (res && res.errCode === 0){
                dispatch(fetchAllCarsSuccess(res.cars.reverse()));
            } else {
                toast.error("Fetch all cars error!!");
                dispatch(fetchAllCarsFailed());
            }
        } catch (e) {
            toast.error("Fetch all cars error!");
            dispatch(fetchAllCarsFailed());
            console.log('fetchAllCarsFailed error', e)
        }
    }
}

export const fetchAllCarsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CAR_SUCCESS,
    cars: data
})

export const fetchAllCarsFailed = () => ({
    type: actionTypes.FETCH_ALL_CAR_FAILED,
})


export const editCar = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCarService(data);
            if(res && res.errCode === 0) {
                toast.success('Car update successfully!!');
                dispatch(editCarSuccess())
                dispatch(fetchAllCarsStart())
            } else {
                toast.error("Update the car failed!!");
                dispatch(editCarFailed())
            }

        } catch (e) {
            toast.error("Update the car failed!!");
            dispatch(editCarFailed());
            console.log('editCarFailed', e);
        }
    }
}

export const editCarSuccess = () => ({
    type: actionTypes.EDIT_CAR_SUCCESS
})

export const editCarFailed = () => ({
    type: actionTypes.EDIT_CAR_FAILED
})


export const deleteCar = (carId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCarService(carId);
            if(res && res.errCode === 0){
                toast.success("Car deleted successfully!!");
                dispatch(deleteCarSuccess())
                dispatch(fetchAllCarsStart())
            } else {
                toast.error("Car deleted failed!!");
                dispatch(deleteCarFailed());
            }
        } catch (e) {
            toast.error("Car deleted failed!!");
            dispatch(deleteUserFailed())
            console.log('deleteCarFailed error', e)
        }
    }
}

export const deleteCarSuccess = () => ({
    type: actionTypes.DELETE_CAR_SUCCESS
})

export const deleteCarFailed = () => ({
    type: actionTypes.DELETE_CAR_FAILED
})