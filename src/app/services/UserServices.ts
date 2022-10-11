import { post, postSingle } from "./apiServiceExt";






export class UserServices {


    public static async verify(data: any,token :string) {
        return await post('verify', data,token);
    }

    public static async userDetail(data: any,token :string) {
        return await post('user-detail', data,token);
    }

    public static async login(data: any) {
        return await postSingle('login', data);
    }
    

    public static async signup(data: any) {
        return await postSingle('sign-up', data);
    }
    




}
