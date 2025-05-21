import reactRouter from 'react-router';
import axios from '../axios';
import { dateFormat } from '../utils';
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post('/api/login', {email: userEmail, password: userPassword});
}

const searchCars = (inputKeyword) => {
   return axios.get(`/api/get-search-car?keyword=${encodeURIComponent(inputKeyword)}`);
};

const getDetailCar = (inputId) => {
   return axios.get(`/api/get-car-by-id?id=${inputId}`);
}

const getAllCarByLocations = (locationId) => {
   return axios.get(`/cars-by-location?locationId=${locationId}`);
};

export { handleLoginApi,
         searchCars,
         getDetailCar,
         getAllCarByLocations
      }