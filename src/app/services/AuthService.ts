import { User } from "../interfaces/user/User";
import { post, postEasy } from "./apiService";

export class AuthService {

    public static async login(obj: User) {
        return await postEasy('login', obj);
    }


    public static async adminUser(data: any) {
        return await post('Usuariosindex', data);
    }



}