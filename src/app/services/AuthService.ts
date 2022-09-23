import { User } from "../interfaces/user/User";
import { post, postEasy } from "./apiService";

export class AuthService {

    public static async login(obj: User) {
        return await postEasy('login', obj);
    }


    public static async adminUser(data: any) {
        return await post('Usuariosindex', data);
    }

    public static async permisosindex(data: any) {
        return await post('permisosindex', data);
    }

    public static async rolesindex(data: any) {
        return await post('rolesindex', data);
    }


    


}