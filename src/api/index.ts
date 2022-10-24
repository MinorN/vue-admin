import axios from 'axios';


const api = axios.create({
    baseURL: '/',
    timeout: 10000,
    responseType: 'json'
});


export default api
