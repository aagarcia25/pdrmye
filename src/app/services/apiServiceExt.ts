import axios from 'axios';
import { env_var } from '../environments/env';
import { getRfToken, getToken } from './localStorage';
//const token = JSON.parse(String(getToken()));
export const postSingle = async function (url: string, body: any) {
    try {
        let resp = await axios.post(`${env_var.BASE_URL_EXT}` + url, body,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        );
        return resp;
    } catch (err: any) {
        return err.response
    }
};

export const post = async function (url: string, body: any) {

    try {
       
        let resp = await axios.post(`${env_var.BASE_URL_EXT}` + url, body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(String(getToken()))
                   
                }
            }

        );
        
        return resp;
    } catch (err: any) {
        return err.response
    }
};

export const postRefresh = async function (url: string) {

    try {
        
       
        let resp = await axios.post(`${env_var.BASE_URL_EXT}` + url , JSON.parse(String(getRfToken())),
            {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': JSON.parse(String(getToken()))
                   
                }
            }

        );
        
        return resp;
    } catch (err: any) {
        return err.response
    }
};

export const get = async function (url: string) {

    try {
        //console.log(token)
        let resp = await axios.get(`${env_var.BASE_URL_EXT}` + url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(String(getToken()))
                   
                }
            }

        );
        
        return resp;
    } catch (err: any) {
        return err.response
    }
};

export const put = async function (refreshToken: string) {

    try {
        //console.log(refreshToken)
        let resp = await axios.get(`${env_var.BASE_URL_EXT}` ,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': refreshToken
                   
                }
            }

        );
        
        return resp;
    } catch (err: any) {
        return err.response
    }
};
export const putPass = async function (url: string , body: any) {

    try {
        //console.log(refreshToken)
        let resp = await axios.put(`${env_var.BASE_URL_EXT}` + url ,body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': JSON.parse(String(getToken()))
                   
                }
            }

        );
        
        return resp;
    } catch (err: any) {
        return err.response
    }
};


export const getSingle = async function (url: string, body: any) {

    try {
               let resp = await axios.get(`${env_var.BASE_URL_EXT}` + url + body,
            {
                headers: {
                    'Content-Type': 'application/json',                   
                   
                }
            },
         

        );
        
        return resp;
    } catch (err: any) {
        return err.response
    }
};







