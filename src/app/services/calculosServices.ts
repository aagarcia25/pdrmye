
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

    public static async getColumns(data: any) {
        return await post('getColumns', data);
    }

    public static async fondoInfo(data: any) {
        return await post('fondoInfo', data);
    }
    
    

}
