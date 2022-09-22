
import { post, postDocument } from './apiService';

export class calculosServices {


    public static async calculosInfo(data: any) {
        return await post('calculosInfo', data);
    }

    public static async calculosInfodetalle(data: any) {
        return await post('calculosInfodetalle', data);
    }

    public static async CalculoPrincipalindex(data: any) {
        return await post('CalculoPrincipalindex', data);
    }

    
   

}
