import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/request";

export function getRequest() {
  return http.get(apiEndPoint);
}

export function updateRequest(payload) {
  return http.put(apiEndPoint + '/' + payload._id, payload);
}