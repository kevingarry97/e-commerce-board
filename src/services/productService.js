import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/product";

export function getProduct() {
  return http.get(apiEndPoint);
}

export function updateProduct(product) {
  console.log(product)
}

export function sendProduct(payload) {
  const fd = new FormData();

  fd.append('name', payload.name);
  fd.append('initialPrice', payload.initialPrice);
  fd.append('price', payload.price);
  fd.append('description', payload.description);
  fd.append('category', payload.category);
  fd.append('type', payload.type);
  fd.append('color', payload.color);
  fd.append('location', payload.location);
  payload.image.forEach((image, index) => fd.append('files', image));
  payload.size.forEach((s, index) => fd.append('size', s));

  return http.post(apiEndPoint, fd);
}