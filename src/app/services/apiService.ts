import axios from 'axios';

import { getFormDataHeader, getHeaderInfo, getHeaderInitial } from '../helpers/tokenCreator';
import { removeTokens } from './localStorage';

/**
 * MANEJO AUTOMATICO DE PETICIONES
 * 
 * ADOLFO ANGEL GARCIA 10/08/2022
 */


const handleResponse = (response: any) => {

    if (response.status === 401) {
       // removeTokens();
    }
    if (response.data.status !== 'OK') {
        return response.data;
    }
    return response;
}

export const postEasy = async function (api: string ,url: string, body: any) {
    let header = await getHeaderInitial();
    try {
        let resp = await axios.post(api + url, body, header);
        return handleResponse(resp);
    
    } catch (err:any) {
        return handleResponse(err.response)
    }
};

export const post = async function (api: string ,url: string, body: any) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.post(api + url, body, header);
       // console.log(resp);
        return handleResponse(resp);
    
    } catch (err:any) {
        return handleResponse(err.response)
    }
};

export const get = async function (api: string ,url: any, params: any = {}) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.get(api + url, { ...header, params });
        return handleResponse(resp);
    } catch (err:any) {
        throw handleResponse(err.response)
    }
};

export const put = async function (api: string ,body: any, url: any) {
    let header = await getHeaderInfo();

    try {
        let resp = await axios.put(api + url, body, header);

        return handleResponse(resp);
    } catch (err:any) {
        throw handleResponse(err.response)
    }
};

export const deleteApi = async function (api: string , url: any) {
    let header = await getHeaderInfo();

    try {
        let resp = await axios.delete(api + url, header);

        return handleResponse(resp);
    } catch (err:any) {
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
    } catch (err:any) {
        throw handleResponse(err.response)
    }

};