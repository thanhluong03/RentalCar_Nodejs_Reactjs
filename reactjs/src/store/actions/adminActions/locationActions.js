import actionTypes from '../actionTypes';
import {createNewLocationService, getAllLocations, editLocationService, deleteLocationService} from '../../../services/adminService';
import {toast} from "react-toastify"
export const createNewLocation = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewLocationService(data);
            if(res && res.errCode === 0)
            {
                toast.success("Create new location success")
                dispatch(saveLocationSuccess())
                dispatch(fetchAllLocationsStart())
            }
            else {
                toast.error(res.errMessage || "Create new location error")
                dispatch(saveLocationFailed())
            }
        } catch (e) {
            dispatch(saveLocationFailed())
            console.log('saveLocationFailed error', e)
        }
    }
}


export const saveLocationSuccess = () => ({
    type: actionTypes.CREATE_LOCATION_SUCCESS
})
export const saveLocationFailed = () => ({
    type: actionTypes.CREATE_LOCATION_FAILED
})


export const fetchAllLocationsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllLocations("ALL");
            
            if (res && res.errCode === 0){
                dispatch(fetchAllLocationsSuccess(res.locations.reverse()));
            } else {
                toast.error("Fetch all locations error!!");
                dispatch(fetchAllLocationsFailed());
            }
        } catch (e) {
            toast.error("Fetch all locations error!");
            dispatch(fetchAllLocationsFailed());
            console.log('fetchAllLocationsFailed error', e)
        }
    }
}

export const fetchAllLocationsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_LOCATION_SUCCESS,
    locations: data
})

export const fetchAllLocationsFailed = () => ({
    type: actionTypes.FETCH_ALL_LOCATION_FAILED,
})


export const editLocation = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editLocationService(data);
            if(res && res.errCode === 0) {
                toast.success('Location update successfully!!');
                dispatch(editLocationSuccess())
                dispatch(fetchAllLocationsStart())
            } else {
                toast.error(res.errMessage || "Update the location failed!!");
                dispatch(editLocationFailed())
            }

        } catch (e) {
            toast.error("Update the Location failed!!");
            dispatch(editLocationFailed());
            console.log('editLocationFailed', e);
        }
    }
}

export const editLocationSuccess = () => ({
    type: actionTypes.EDIT_LOCATION_SUCCESS
})

export const editLocationFailed = () => ({
    type: actionTypes.EDIT_LOCATION_FAILED
})


export const deleteLocation = (locationId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteLocationService(locationId);
            if(res && res.errCode === 0){
                toast.success("Location deleted successfully!!");
                dispatch(deleteLocationSuccess())
                dispatch(fetchAllLocationsStart())
            } else {
                toast.error("Location deleted failed!!");
                dispatch(deleteLocationFailed());
            }
        } catch (e) {
            toast.error("Location deleted failed!!");
            dispatch(deleteLocationFailed())
            console.log('deleteLocationFailed error', e)
        }
    }
}

export const deleteLocationSuccess = () => ({
    type: actionTypes.DELETE_LOCATION_SUCCESS
})

export const deleteLocationFailed = () => ({
    type: actionTypes.DELETE_LOCATION_FAILED
})