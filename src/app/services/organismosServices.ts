
import { post, postDocument } from './apiService';

export class CatalogosServices {


    public static async Class_FFIndex(data: any) {
        return await post('Class_FFIndex', data);
    }

   


}
