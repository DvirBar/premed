import axios from 'axios';
import useInterceptors from './interceptors/useInterceptors';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' 
    ? "https://refuah.org.il" : "http://10.0.0.21:3000";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const useAxios = () => {
    useInterceptors()
}

export default useAxios