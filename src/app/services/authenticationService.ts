import { getAccessToken } from './localStorage';

import { postEasy } from './apiService';

export const authenticate = async (data: any) => {
 return await postEasy('login',data);
};

export const isAuthenticated = (): boolean => {
  return getAccessToken() ? true : false;
};