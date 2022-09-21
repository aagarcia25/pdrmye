import axios from 'axios';


import { env_var } from '../environments/env';






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
        return resp.data;
    } catch (err: any) {
        return err.response
    }
};









