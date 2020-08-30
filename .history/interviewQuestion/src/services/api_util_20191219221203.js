import request from './request';

export function apiPOST(url, data = {}) {
  return request({
    url,
    method: 'post',
    data,
  });
}

export function apiGET(url, params = {}) {
  return request({
    url,
    method: 'get',
    params,
  });
}

export function apiPUT(url, data = {}) {
  return request({
    url,
    method: 'put',
    data,
  });
}

export function apiDELETE(url, params = {}) {
  return request({
    url,
    method: 'delete',
    params,
  });
}

export const apiFileUpload = (url, formData = {}, method='put') => {
  return request({
    url,
    method,
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' }}
  });
}
