import { post } from './apiService';

export class DAFServices {

    
    public static async SpeiAdministracion(data: any) {
        return await post('SpeiAdministracion', data);
    }

    public static async MarcarPagado(data: any) {
        return await post('MarcarPagado', data);
    }
   
}