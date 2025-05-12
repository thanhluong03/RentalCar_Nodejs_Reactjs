import reactRouter from 'react-router';
import axios from '../axios';
import { dateFormat } from '../utils';
const handleLoginApi = (userEmail, userPassword) => {
   return axios.post('/api/login', {email: userEmail, password: userPassword});
}

export { handleLoginApi, 

      }