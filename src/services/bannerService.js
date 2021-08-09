import http from './httpService';
import { apiUrl } from '../config.json';

export const getBanner = () => {
    return http.get(apiUrl + '/banner')
}

export const updateBanner = (id, payload) => {
    return http.put(apiUrl + '/banner/' + id, payload);
}

export const sendBanner = (payload) => {
    const fd = new FormData();

    fd.append('name', payload.name);
    fd.append('user', payload.user);
    fd.append('file', payload.image, payload.image.name);

    return http.post(apiUrl + '/banner', fd);
}