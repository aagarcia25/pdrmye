import axios from 'axios';

import { getFormDataHeader, getHeaderInfo, getHeaderInfoReporte, getHeaderInitial } from './tokenCreator';
import { AlertS } from '../helpers/AlertS';

/**
 * MANEJO AUTOMATICO DE PETICIONES
 * 
 * ADOLFO ANGEL GARCIA 10/08/2022
 */

const handleResponseDoc = (response: any) => {
    let rs;
        rs = {
            RESPONSE: response.data.RESPONSE,
            SUCCESS: response.data.SUCCESS,
            NUMCODE: response.data.NUMCODE,
            STRMESSAGE: response.data.STRMESSAGE,
        }
    return rs;
}
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

        let resp = await axios.post(process.env.REACT_APP_APPLICATION_BASE_URL + url, body, header);
        return handleResponse(resp);
    } catch (err: any) {
        return handleResponse(err.response)
    }
};



export const post = async function (url: string, body: any) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.post(process.env.REACT_APP_APPLICATION_BASE_URL + url, body, header)
    return handleResponse(resp.data);
    } catch (err: any) {
        return handleResponse(err.response)
    }
};

export const postReporte = async function (url: string, body: any , name:string) {
    let header = await getHeaderInfoReporte();
    try {
      axios.post(process.env.REACT_APP_APPLICATION_BASE_URL + url, body, { responseType: 'blob' })
     .then((response) => {
      const blobStore = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blobStore);
      link.download = name; 
      link.click();
    })
    .catch((error) => {
      console.log(error);
      AlertS.fire({
        title: "¡Aviso!",
        text: "esta operación no tiene base de cálculo",
        icon: "info",
      });
    }
    );
    

    } catch (err: any) {
        console.log(err);
    }
    
};


export const postDoc = async function (url: string, body: any) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.post(process.env.REACT_APP_APPLICATION_BASE_URL + url, body, header)
    return handleResponseDoc(resp);
    } catch (err: any) {
        return handleResponseDoc(err.response)
    }
};

export const get = async function (url: any, params: any = {}) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.get(process.env.REACT_APP_APPLICATION_BASE_URL + url, { ...header, params });
        return handleResponseDoc(resp.data);
    } catch (err: any) {
        return handleResponse(err.response)
    }
};





export const postDocument= async function ( url: string, body: FormData) {

    let header = await getFormDataHeader();
    try {
        let resp = await axios.post(process.env.REACT_APP_APPLICATION_BASE_URL + url, body, header);
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

   






