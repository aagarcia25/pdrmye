import { UserReponse } from "../interfaces/user/UserReponse";

export const setTokens = (authRes: any) => {
  localStorage.setItem('user', JSON.stringify(authRes.user));
  localStorage.setItem('access_token', JSON.stringify(authRes.access_token));
  localStorage.setItem('expires_at', JSON.stringify(authRes.expires_at));
};

export const removeTokens = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_at');
};
export const getAccessToken = () => localStorage.getItem('user');

export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
export const getUser = () => localStorage.getItem('user');

// PERMISOS
export const setPermisos = (permisos: any) => localStorage.setItem('permisos', JSON.stringify(permisos));
export const getPermisos = () => localStorage.getItem('permisos');
// ROLES
export const setRoles = (roles: any) => localStorage.setItem('roles', JSON.stringify(roles));
export const getRoles = () => localStorage.getItem('roles');
// MENUS
export const setMenus = (menus: any) => localStorage.setItem('permisos', JSON.stringify(menus));
export const getMenus = () => localStorage.getItem('menus');








export const getRefreshToken = () => localStorage.getItem('expires_at');

export const isAuthenticated = (): boolean => {
  return getAccessToken() ? true : true;
};

export const validaLocalStorage = (name: string): boolean => {
  return localStorage.getItem(name) ? true : false;
};


export const setMunicipios = (data: any) => {
  localStorage.setItem('FiltroMunicipios', JSON.stringify(data));
};

export const getMunicipios = () => localStorage.getItem('FiltroMunicipios');


export const setPU = (data: any) => {
  localStorage.setItem('PU', JSON.stringify(data));
};

export const getPU = ( ) => {
 return localStorage.getItem('PU');

}


