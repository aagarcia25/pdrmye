import axios from 'axios';
import {  getRfToken, getToken } from './localStorage';



export const post = async function (url: string, body: any) {

    try {
       
        let resp = await axios.post(process.env.REACT_APP_APPLICATION_URL_SIREAPI + url, body,
           {
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': JSON.parse(String(getToken()))
                   
                // }
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
        let resp = await axios.get(process.env.REACT_APP_APPLICATION_URL_SIREAPI + url,
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










