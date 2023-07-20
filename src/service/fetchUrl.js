import axios from 'axios';
import { toast } from 'react-toastify';
import qs from 'qs';
import { API_URL } from '../Component/const';

const baseUrl = API_URL;
const GET = 'GET';
const DELETE = 'DELETE';
const POST = 'POST';
const PATCH = 'PATCH';
const PUT = 'PUT';

let cache = [];
const cancel = [];
const ACTION_HANDLERS = {
    [GET]: (url, data) => {
        let queryUrl = url;
        if (data) {
            const query = qs.stringify(data);
            queryUrl = `${queryUrl}?${query}`;
        }
        return axios.get(baseUrl + queryUrl, {
            cancelToken: new axios.CancelToken(((c) => {
                cancel.push({ url, c });
            })),
        });
    },
    [DELETE]: (url, data) => axios.delete(baseUrl + url, { data }),
    [POST]: (url, data) => axios.post(baseUrl + url, data),
    [PUT]: (url, data) => axios.put(baseUrl + url, data),
    [PATCH]: (url, data) => axios.patch(baseUrl + url, data),
};

export const showErrorAsToast = (error, { type, url }) => {
    if (error.response && Object.prototype.hasOwnProperty.call(error.response, 'data')) {
        const value = error.response.data;
        if (Object.prototype.hasOwnProperty.call(value, 'errors')) {
            const { errors } = value;
            Object.keys(errors).forEach((x) => {
                Object.keys(errors).forEach((y) => {
                    toast.error(errors[x][y])
                });
            });
        }
        if (value.message !== undefined) {
            if (typeof value.message === 'string') {
                toast.error(value.message)
            } else {
                return Promise.reject(value.message);
            }
        }
    } else if (type.toUpperCase() !== 'GET') {
        toast.error('Something went wrong, Please do try again !')
    }
    cache = [];
    return Promise.reject(error?.response?.data.message);
};

export const fetchUrl = (type, url, data) => {
    if ((data)) {
        if (type.toUpperCase() === 'GET') {
            if (cache.indexOf(url) !== -1) {
                const controller = cancel.filter((i) => i.url === url);
                controller.map((item) => item.c());
            } else {
                cache.push(url);
            }
        }
    }
    
    const handler = ACTION_HANDLERS[type.toUpperCase()];
    
    return (handler(url, data).then((res) => Promise.resolve(res.data))
        .catch((error) => showErrorAsToast(error, { type, url }))
    );
};