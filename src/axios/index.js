import axios from 'axios';
import useInterceptors from './interceptors/useInterceptors';


axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const useAxios = () => {
    useInterceptors()
}

export default useAxios