import { post } from "./apiServiceExt";






export class UserServices {


    public static async verify(data: any,token :string) {
        return await post('verify', data,token);
    }

    

   




}
