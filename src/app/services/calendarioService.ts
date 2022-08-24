
import  Icalendario from '../types/app.type';
import { env_var } from '../configuration/env';
import { post } from './apiService';



export const calendarios = async (data: Icalendario) => {
    return await post(`${env_var.BASE_URL}`,'calendarios',data);
};





