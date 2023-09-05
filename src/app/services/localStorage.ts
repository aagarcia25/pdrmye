

//BLOQUEO DE PANTALLA

//CONTROLINTERNO
export const setcontrolInternoEntidad = (CCI: any) => localStorage.setItem('CCI', JSON.stringify(CCI));
export const getcontrolInternoEntidad = () => localStorage.getItem('CCI');
//TOKEN
export const setToken = (user: any) => localStorage.setItem('token', JSON.stringify(user));
export const getToken = () => localStorage.getItem('token');
//IDAPP
export const setIdApp = (data: any) => localStorage.setItem('idapp', JSON.stringify(data));
export const getIdApp = () => localStorage.getItem('idapp');
//RFTOKEN
export const setRfToken = (user: any) => localStorage.setItem('Rftoken', JSON.stringify(user));
export const getRfToken = () => localStorage.getItem('Rftoken');
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
//// foto perfil
export const setPerfilFoto = (perfiles: any) => localStorage.setItem('perfilFoto', JSON.stringify(perfiles));
export const getPerfilFoto = () => localStorage.getItem('perfilFoto');
// DEPARTAMENTO
export const setDepartamento = (departamento: any) => localStorage.setItem('departamento', JSON.stringify(departamento));
export const getDepartamento = () => localStorage.getItem('departamento');
// MUNICIPIO
export const setMunicipio = (municipio: any) => localStorage.setItem('municipio', JSON.stringify(municipio));
export const getMunicipio = () => localStorage.getItem('municipio');

//// ORGANISMO
export const setOrganismo = (organismo: any) => localStorage.setItem('organismo', JSON.stringify(organismo));
export const getOrganismo = () => localStorage.getItem('organismo');

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

export const getItem = (item:string ) :string => {
  return String(localStorage.getItem(item));
 }


 export const setDatosAdicionales = (DatosAdicionales: any) => localStorage.setItem('DatosAdicionales', JSON.stringify(DatosAdicionales));
 export const getDatosAdicionales = () => localStorage.getItem('DatosAdicionales');
  
 
