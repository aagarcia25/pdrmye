import axios from 'axios';

import { getFormDataHeader, getHeaderInfo, getHeaderInitial } from './tokenCreator';
import { env_var } from '../environments/env';

/**
 * MANEJO AUTOMATICO DE PETICIONES
 * 
 * ADOLFO ANGEL GARCIA 10/08/2022
 */

const handleResponse = (response: any) => {
    let rs;
        rs = {
            RESPONSE: response.RESPONSE,
            SUCCESS: response.SUCCESS,
            NUMCODE: response.NUMCODE,
            STRMESSAGE: response.STRMESSAGE,
        }
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
        return handleResponse(err.response)
    }
};





export const postDocument= async function ( url: string, body: FormData) {

    let header = await getFormDataHeader();
    try {
        let resp = await axios.post(`${env_var.BASE_URL}` + url, body, header);
        return handleResponse(resp.data);
    } catch (err: any) {
        return handleResponse(err.response)
    }

};


export const postImage = async function (api: string, url: string, body: any) {

    let header = await getFormDataHeader();
    var formData = new FormData();
    formData.append('file', body);
    try {
        let resp = await axios.put(api + url, formData, header);
        return handleResponse(resp.data);
    } catch (err: any) {
        throw handleResponse(err.response)
    }
};

   






