import { Toast } from "../helpers/Toast";
import { RESPONSE, RESPONSESTORAGE, UserInfo } from "../interfaces/user/UserInfo";
import {   get, post, postRefresh, postSingle,   putPass } from "./apiServiceExt";
import { AuthService } from "./AuthService";
import { getToken, getUser, setUser } from "./localStorage";



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

// export const GetImage = (tipo:string ,nameImagen:string ) => {
//     console.log(tipo + "  "+nameImagen)
//     const user: RESPONSE = JSON.parse(String(getUser()));
//     var  Response :RESPONSESTORAGE ;
//     const formData = new FormData();
//     formData.append("CHUSER", user.id);
//     formData.append("TOKEN", JSON.parse(String(getToken())));
//     formData.append("TIPO", tipo);
//     formData.append("IMG", nameImagen);

//     AuthService.GetImagenProfile(formData).then((res) => {

//         if (res.SUCCESS) {
//             Response=res.RESPONSE;
//             // console.log(res.RESPONSE);
    
   

//         }

//     });
// return{

//     // Response
// }

// };
