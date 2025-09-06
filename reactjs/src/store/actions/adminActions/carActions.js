import actionTypes from '../actionTypes';
import { getAllCodeService, createNewCarService, getAllCars, editCarService, deleteCarService,
    getAllCarByPrices, getAllPrices} from '../../../services/adminService';
import {toast} from "react-toastify"
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
                toast.error(res.errMessage || "Create new car error")
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
                toast.error(res.errMessage || "Update the car failed!!");
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
            dispatch(deleteCarFailed())
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

export const fetchAllPriceStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllPrices();
            if(res && res.errCode === 0) {
                dispatch(fetchAllPriceSucess(res.prices.reverse()))
            } else {
                toast.error("Fetch price failed")
                dispatch(fetchAllPriceFailed())
            }
        } catch (e) {
            toast.error("Fetch price failed");
            dispatch(fetchAllPriceFailed())
            console.log('fetchAllPriceFailed error', e)
        }
    }
}

export const fetchAllPriceSucess = (data) => ({
    type: actionTypes.FETCH_ALL_PRICE_SUCCESS,
    prices: data
})



export const fetchAllPriceFailed = () => ({
    type: actionTypes.FETCH_ALL_PRICE_FAILED
})


export const fetchAllCarByPriceStart = (price) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCarByPrices(price);
            if (res && res.errCode === 0) {
                toast.success("Fetch car by price successfully");
                dispatch(fetchCarByPriceSuccess(res.carbyprices.reverse()));
            } else {
                toast.error("Fetch car by price failed");
                dispatch(fetchCarByPriceFailed());
            }
        } catch (e) {
            toast.error("Fetch cars by price failed");
            dispatch(fetchCarByPriceFailed());
            console.error('fetchCarsByPrice error', e);
        }
    };
};

export const fetchCarByPriceSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CAR_BY_PRICE_SUCCESS,
    carbyprices: data,
});

export const fetchCarByPriceFailed = () => ({
    type: actionTypes.FETCH_ALL_CAR_BY_PRICE_FAILED,
});