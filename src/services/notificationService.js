import http from './httpService';
import { apiUrl } from '../config.json';

export const getNotification = () => {
    return http.get(apiUrl + '/notifications')
}

export const sendNotification = (payload) => {
    return http.post(apiUrl + '/notifications', payload)
}