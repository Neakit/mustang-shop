import axios from 'axios';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded'

export const privateHTTP = ({ url, method, data = {}, params = {} }) => {
    const token = localStorage.getItem('bigStore.jwt');
    if(token !== null) {
         return axios({
            baseURL: 'http://auto-mustang.ru',
            // baseURL: 'http://127.0.0.1:8000',
            url,
            method,
            params,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data
        })
    } 
}

export const publicHTTP = ({ url, method, data = {}, params = {} }) => {
    return axios({
        baseURL: 'http://auto-mustang.ru',
        // baseURL: 'http://127.0.0.1:8000',
        method,
        url,
        params,
        data
    })
}
