import {   get, post, postRefresh, postSingle,   putPass } from "./apiServiceExt";
import { getToken, setToken } from "./localStorage";
import { UserLogin } from "../interfaces/user/User";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";


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

export const ValidaSesion = () => {
    console.log("token refresh entra")
  
    const decoded: UserLogin = jwt_decode(String(getToken()));
    if (((decoded.exp - (Date.now() / 1000)) / 60) < 5) {
        console.log("token vencido")
        UserServices.refreshToken().then((resAppLogin) => {
            if (resAppLogin.status === 200) {
                setToken(resAppLogin.data?.token);
                console.log("token refresh ----------------------------------------------------------------")
                // onClickChangePassword();
            }
            else {
                Swal.fire({
                    title: "Sesión Demasiado Antigua",
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Aceptar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.clear();
                        var ventana = window.self;
                        ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));
                    }
                });
  
            }
        });
  
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
