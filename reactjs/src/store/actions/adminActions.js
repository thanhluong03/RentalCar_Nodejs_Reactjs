import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, 
    deleteUserService, editUserService} from '../../services/userService';
import {toast} from "react-toastify"
import { dispatch } from '../../redux';
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


