import reactRouter from 'react-router';
import axios from '../axios';
import { dateFormat } from '../utils';
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post('/api/login', {email: userEmail, password: userPassword});
}


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

export { handleLoginApi, 
         getAllUsers, 
         getAllCodeService,
         createNewUserService,
         deleteUserService,
         editUserService,
         createNewCarService,
         getAllCars,
         editCarService,
         deleteCarService
      }