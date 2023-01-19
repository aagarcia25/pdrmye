import {   get, post, postRefresh, postSingle,   putPass } from "./apiServiceExt";



export class UserServices {


    public static  verify(data: any) {
        return  post('verify', data);
    }


    public static async userDetail(data: any) {
        return await post('user-detail', data);
    }

    public static async login(data: any) {
        return await postSingle('login', data);
    }
    
   /* public static async signup(data: any) {
        return await post('sign-up', data);
    }*/
    public static async refreshToken() {
        return await postRefresh('refresh-token');
    }
    
    public static async createsolicitud(data: any) {
        return await post('create-solicitud', data);
    }

    public static async detalleSol(data: string) {
        return await get('detalleSol?'+ data);
    }

    public static async solicitudesapp(data: string) {
        return await get('solicitudes-app?'+ data);
    }

    public static async changepassword(data: any) {
        return await putPass('change-password', data);
    }



}
