

//BLOQUEO DE PANTALLA
export const setBloqueo = (is: Boolean) => localStorage.setItem('BLOQUEADO',JSON.stringify(is) );
export const getBloqueo = (): boolean => {
  return localStorage.getItem('BLOQUEADO') ===  'true' ? true : false;
};
//TOKEN
export const setToken = (user: any) => localStorage.setItem('token', JSON.stringify(user));
export const getToken = () => localStorage.getItem('token');
// USUARIOS
export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
export const getUser = () => localStorage.getItem('user');
// PERMISOS
export const setPermisos = (permisos: any) => localStorage.setItem('permisos', JSON.stringify(permisos));
export const getPermisos = () => ((localStorage.getItem('permisos')==null)?  "[{}]": localStorage.getItem('permisos'));
// ROLES
export const setRoles = (roles: any) => localStorage.setItem('roles', JSON.stringify(roles));
export const getRoles = () => localStorage.getItem('roles');
// MENUS
export const setMenus = (menus: any) => localStorage.setItem('menus', JSON.stringify(menus));
export const getMenus = () => localStorage.getItem('menus');
// PERFIL
export const setPerfiles = (perfiles: any) => localStorage.setItem('perfiles', JSON.stringify(perfiles));
export const getPerfiles = () => localStorage.getItem('perfiles');
// DEPARTAMENTO
export const setDepartamento = (departamento: any) => localStorage.setItem('departamento', JSON.stringify(departamento));
export const getDepartamento = () => localStorage.getItem('departamento');
// MUNICIPIO
export const setMunicipio = (municipio: any) => localStorage.setItem('municipio', JSON.stringify(municipio));
export const getMunicipio = () => localStorage.getItem('municipio');

//IDENTIFICAR QUE EL USUARIO YA ESTA LOGEADO
export const setlogin = (data: any) => {
  localStorage.setItem('login', JSON.stringify(data));
};
export const getlogin = () => localStorage.getItem('login');
export const islogin = (): boolean => {
  return getlogin() ===  'true' ? true : false;
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
export const getItem = (item:string ) :string => {
  return String(localStorage.getItem(item));
 }
