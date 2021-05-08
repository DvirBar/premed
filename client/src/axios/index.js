import axios from 'axios';
import useInterceptors from './interceptors/useInterceptors';

axios.defaults.baseURL = process.env.NODE_ENV !== 'production'
    ? "http://localhost:3000" : "https://refuah.org.il";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const useAxios = () => {
    useInterceptors()
}

export default useAxios