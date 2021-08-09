import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/user";

export function getUsers() {
  return http.get(apiEndPoint);
}

export function register(user) {
  return http.post(apiEndPoint, user);
}