import { post, postSingle } from "./apiServiceExt";


export class UserServices {


    public static  verify(data: any,token :string) {
        return  post('verify', data,token);
    }

    public static async userDetail(data: any,token :string) {
        return await post('user-detail', data,token);
    }

    public static async login(data: any) {
        return await postSingle('login', data);
    }
    

    public static async signup(data: any,token :string) {
        return await post('sign-up', data,token);
    }


    public static async linkuserapp(data: any,token :string) {
        return await post('link-userapp', data,token);
    }
    
    public static async apps(data: any,token :string) {
        return await post('apps', data,token);
    }

    


}
