import { User } from "../interfaces/user/User";
import { postEasy } from "./apiService";

export class AuthService{

    public static async login(obj:User){
     return await postEasy('login', obj);
    }
    



 }