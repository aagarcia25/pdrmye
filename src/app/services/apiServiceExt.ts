import axios from 'axios';


import { env_var } from '../environments/env';




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

export const post = async function (url: string, body: any, token: string) {

    try {
        let resp = await axios.post(`${env_var.BASE_URL_EXT}` + url, body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                   
                }
            }

        );
        return resp;
    } catch (err: any) {
        return err.response
    }
};









