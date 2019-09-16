import axios from 'axios';

export const privateHTTP = ({ url, method, data = {}, params }) => {
    // get token 
    const token = localStorage.getItem('bigStore.jwt');
    if(token !== null) {
        return axios({
            url,
            method,
            params,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data
        });
    } else {
        return axios({
            url,
            method,
            params,
            data
        });
    } 
}

export const publicHTTP = ({ url, method, data = {}, params = {} }) => {
    return axios({
        baseURL: 'http://127.0.0.1:8000/',
        method,
        url,
        params,
        data
    })
}
