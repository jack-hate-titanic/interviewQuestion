import { apiGET, apiPOST, apiPUT, apiDELETE, apiFileUpload } from './api_util';

// js试题部分
export async function getJsQuestion(params) {
  return apiGET(`/js`);
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

// 马克思试题部分

// 英语试题部分
