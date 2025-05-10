import axios from '../axios';
import * as queryString from 'query-string';

const adminService = {
    login(loginBody) {
        return axios.post(`/admin/login`, loginBody)
    },

};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
 }
 
 const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
 }
 
 const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
       data: {
          id: userId
       }
    });
 }
 
 const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
 }
 const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
 }
 
 //car
 const createNewCarService = (data) => {
    return axios.post('/api/create-new-car', data);
 }
 
 const getAllCars = (inputId) => {
    return axios.get(`/api/get-all-cars?id=${inputId}`);
 }
 
 const editCarService = (inputData) => {
    return axios.put('/api/edit-car', inputData);
 }
 const deleteCarService = (carId) => {
    return axios.delete('/api/delete-car', {
       data: {
          id: carId
       }
    });
 }

// location

const createNewLocationService = (data) => {
    return axios.post('/api/create-new-location', data);
}

const getAllLocations = (inputId) => {
    return axios.get(`/api/get-all-locations?id=${inputId}`);
 }

const editLocationService = (inputData) => {
    return axios.put('/api/edit-location', inputData);
}

const deleteLocationService = (locationId) => {
    return axios.delete('/api/delete-location', {
       data: {
          id: locationId
       }
    });
 }
export {
    adminService,
    getAllUsers, 
    getAllCodeService,
    createNewUserService,
    deleteUserService,
    editUserService,
    createNewCarService,
    getAllCars,
    editCarService,
    deleteCarService, 
    createNewLocationService,
    getAllLocations,
    editLocationService,
    deleteLocationService
};