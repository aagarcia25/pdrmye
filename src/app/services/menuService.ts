
import  Iuser from '../types/Api_AdSisUs.type';
import ImenuOut from '../types/Menus.type';
import { env_var } from '../configuration/env';
import { post } from './apiService';



export const menusByIdUser = async (data: any) => {
    const response = await post(`${env_var.BASE_URL}`,'menusByIdUser',data);
    return response;
};

export const menusByIdFather = async (data: Iuser) => {
    return await post(`${env_var.BASE_URL}`,'menusByIdFather',data);
};

export const menus= async (data: ImenuOut) => {
    return await post(`${env_var.BASE_URL}`,'menus',data);
};



