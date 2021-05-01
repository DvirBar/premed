import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getError } from '../../redux/actions/messages';
import { GET_USER_FAILURE } from '../../redux/auth/types';

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
                    dispatch({ type: GET_USER_FAILURE })
                    return Promise.reject(error)
                }

            else if(error.response.status === 401 
                && !originalRequest._retry 
                && (originalRequest.url !== '/api/auth/login'
                && originalRequest.url !== '/api/auth/register')) {
                originalRequest._retry = true;
                try {
                    await axios.post(`/api/${refreshTokenUrl}`)
                    return axios(originalRequest)
                }
                
                catch(err) {
                    // dispatch(getError(err))
                }
            }

            return Promise.reject(error)
        })
}

export default useInterceptors