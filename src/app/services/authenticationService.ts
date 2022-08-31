import { getAccessToken } from './localStorage';
import { env_var } from '../configuration/env';
import Iauntenticacion from '../types/app.type';

import { postEasy } from './apiService';
import { appBarClasses } from '@mui/material';

export const authenticate = async (data: any) => {
 return await postEasy('login',data);
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() ? true : false;
};