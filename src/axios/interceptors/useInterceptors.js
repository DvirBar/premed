import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authError } from '../../redux/actions/auth';

const refreshTokenUrl = 'auth/refreshToken'
const useInterceptors = () => {
    const dispatch = useDispatch()

    axios.interceptors.response.use(response => 
        response,
        async(error) => {
            const originalRequest = error.config

        // If a request to get a refresh token has already been sent
            if(error.response.status === 401 && 
                originalRequest.url === `/api/${refreshTokenUrl}`) {
                    dispatch(authError())
                    return Promise.reject(error)
                }

            else if(error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
            
                const res = await axios.post(`/api/${refreshTokenUrl}`)
                if(res.status === 200)
                    return axios(originalRequest)
            }

            return Promise.reject(error)
        })
}

export default useInterceptors