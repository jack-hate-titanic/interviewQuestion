import { apiGET, apiPOST, apiPUT, apiDELETE, apiFileUpload } from './api_util';

// 登录
export async function Login(params) {
  return apiPOST(`/login`, params);
}

// js试题部分
export async function getQuestion(params) {
  return apiGET(`/question`, params);
}

export async function createQuestion(params) {
  return apiPOST(`question`, params);
}

export async function destroyQuestion(params) {
  return apiDELETE(`question/${params.id}`);
}

export async function showQuestion(params) {
  return apiGET(`question/${params.id}`);
}

export async function updateQuestion(params) {
  return apiPUT(`question`, params);
}

// 上传图片

export async function uploadFile(params) {
  return apiFileUpload(`/file`, params);
}

// 类别

export async function getCategory() {
  return apiGET(`/category`);
}

export async function createCategory(params) {
  return apiPOST(`category`, params);
}

export async function destroyCategory(params) {
  return apiDELETE(`category/${params.id}`);
}

export async function showCategory(params) {
  return apiGET(`category/${params.id}`);
}

export async function updateCategory(params) {
  return apiPUT(`category`, params);
}
