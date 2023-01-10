import { post } from './apiService';

export class DAFServices {

    
    public static async SpeiAdministracion(data: any) {
        return await post('SpeiAdministracion', data);
    }
   
}