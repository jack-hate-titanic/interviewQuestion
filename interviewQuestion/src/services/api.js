import { apiGET, apiPOST, apiPUT, apiDELETE, apiFileUpload } from './api_util';

// js试题部分
export async function getJsQuestion(params) {
  return apiGET(`/js`, params);
}

export async function createJsQuestion(params) {
  return apiPOST(`js`, params);
}

export async function destroyJsQuestion(params) {
  return apiDELETE(`js/${params.id}`);
}

export async function showJsQuestion(params) {
  return apiGET(`js/${params.id}`);
}

export async function updateJsQuestion(params) {
  return apiPUT(`js`, params);
}

// 上传图片

export async function uploadFile(params) {
  return apiFileUpload(`/file`, params);
}

// 类别

export async function getClasses() {
  return apiGET(`/class`);
}

export async function createClass(params) {
  return apiPOST(`class`, params);
}

export async function destroyClass(params) {
  return apiDELETE(`class/${params.id}`);
}

export async function showClass(params) {
  return apiGET(`class/${params.id}`);
}

export async function updateClass(params) {
  return apiPUT(`class`, params);
}
