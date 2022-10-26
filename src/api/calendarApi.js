import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});
calendarApi.interceptors.request.use( config => {
    config.headers = {
        // se queda con los header pre existentes y agrega uno mas
        ...config.headers,
        // agrega un campo a los header con el token del usuario actual.
        'x-token': localStorage.getItem('token')
    }
    return config;
})



export default calendarApi;