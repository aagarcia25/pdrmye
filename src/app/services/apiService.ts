import axios from 'axios';

import { getFormDataHeader, getHeaderInfo, getHeaderInitial } from './tokenCreator';
import { ApiResponse } from '../interfaces/response/ApiResponse';
import { env_var } from '../environments/env';





/**
 * MANEJO AUTOMATICO DE PETICIONES
 * 
 * ADOLFO ANGEL GARCIA 10/08/2022
 */




const handleResponse = (response: any) => {
   // console.log('response');
   // console.log(response);
    let rs;
   // if (response.status === 0) {
        // alertaSAL2("Error de Red","error",1)
   // }

  //  if (response.status === 401) {
        // removeTokens();
  //  }
  //  if (response.data.status === 200) {

        rs = {
            RESPONSE: response.RESPONSE,
            SUCCESS: response.SUCCESS,
            NUMCODE: response.NUMCODE,
            STRMESSAGE: response.STRMESSAGE,
        }


   // }
    //console.log(rs);
    return rs;
}


export const postEasy = async function (url: string, body: any) {
    let header = await getHeaderInitial();
    try {

        let resp = await axios.post(`${env_var.BASE_URL}` + url, body, header);
        return handleResponse(resp);
    } catch (err: any) {
        return handleResponse(err.response)
    }
};



export const post = async function (url: string, body: any) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.post(`${env_var.BASE_URL}` + url, body, header);
        return handleResponse(resp.data);
    } catch (err: any) {
        return handleResponse(err.response)
    }
};

export const get = async function (url: any, params: any = {}) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.get(`${env_var.BASE_URL}` + url, { ...header, params });
        return handleResponse(resp.data);
    } catch (err: any) {
        throw handleResponse(err.response)
    }
};





export const postImage = async function (api: string, url: string, body: any) {

    let header = await getFormDataHeader();
    var formData = new FormData();
    formData.append('file', body);
    try {
        let resp = await axios.put(api + url, formData, header);
        return handleResponse(resp);
    } catch (err: any) {
        throw handleResponse(err.response)
    }

};