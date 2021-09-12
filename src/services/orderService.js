import http from './httpService';
import { apiUrl } from '../config.json';

export const getOrders = () => {
    return http.get(apiUrl + '/deliver-orders')
}