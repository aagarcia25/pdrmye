import { User } from "../interfaces/user/User";
import { post, postEasy } from "./apiService";

export class AuthService {

    public static async login(obj: User) {
        return await postEasy('login', obj);
    }
    
    public static  getUsuarioPerfil(data: any) {
        return  post('getUsuarioPerfil', data);
    }
    public static  UsuarioPerfil(data: any) {
        return  post('UsuarioPerfil', data);
    }
    
    public static  adminUser(data: any) {
        return  post('Usuariosindex', data);
    }

    public static async permisosindex(data: any) {
        return await post('permisosindex', data);
    }

    public static async rolesindex(data: any) {
        return await post('rolesindex', data);
    }

    
    public static async rolesrel(data: any) {
        return await post('rolesrel', data);
    }

    public static async rolessinrelacionar(data: any) {
        return await post('rolessinrelacionar', data);
    }
    public static async rolespermisorelacionar(data: any) {
        return await post('rolespermisorelacionar', data);
    }

    public static async usuarioRol(data: any) {
        return await post('usuarioRol', data);
    }

    public static async FondosAjustes(data: any) {
        return await post('FondosAjustes', data);
    }
    public static async FondosRelAjuste(data: any) {
        return await post('FondosRelAjuste', data);
    }

    public static async RelacionarUsuarioRol(data: any) {
        return await post('RelacionarUsuarioRol', data);
    }

    

    public static async menusindex(data: any) {
        return await post('menusindex', data);
    }

    public static async menuPermisosRel(data: any) {
       return await post('menuPermisosRel', data);
    }


    public static async menuPermisosSinRel(data: any) {
        return await post('menuPermisosSinRel', data);
    }

    public static async menuPermisosRelacionar(data: any) {
        return await post('menuPermisosRelacionar', data);
    }
    public static async menusinrelacionararol(data: any) {
        return await post('menusinrelacionararol', data);
    }
    public static async menurelacionadosalrol(data: any) {
        return await post('menurelacionadosalrol', data);
    }
    
    

}