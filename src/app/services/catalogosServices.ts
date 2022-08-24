
import  Iumas from '../types/app.type';
import  Iajustes from '../types/app.type';
import  Inotificaciones from '../types/app.type';
import { env_var } from '../configuration/env';
import { post } from './apiService';



export const umas = async (data: Iumas) => {
    return await post(`${env_var.BASE_URL}`,'umas',data);
};

export const AjustesIndex = async (data: Iajustes) => {
    return await post(`${env_var.BASE_URL}`,'AjustesIndex',data);
};

export const Notificaciones = async (data: any) => {
    return await post(`${env_var.BASE_URL}`,'notificaciones',data);
};
