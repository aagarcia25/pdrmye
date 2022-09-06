
import  Iuser from '../interfaces/Api_AdSisUs.type';
import  ImenuOut from '../interfaces/Menus.type';
import { env_var } from '../environments/env';
import { post } from './apiService';



export const menusByIdUser = async (data: any) => {
    
    const response = await post('menusByIdUser',data);
    return response;
};

export const menusByIdFather = async (data: Iuser) => {
    return await post('menusByIdFather',data);
};

export const menus= async (data: ImenuOut) => {
    return await post('menus',data);
};



