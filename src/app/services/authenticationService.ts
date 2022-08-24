import { getAccessToken } from './localStorage';
import { env_var } from '../configuration/env';
import Iauntenticacion from '../types/app.type';
import { postEasy } from './apiService';

export const authenticate = async (data: Iauntenticacion) => {
 return await postEasy(`${env_var.BASE_URL}`,'login',data);
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() ? true : false;
};