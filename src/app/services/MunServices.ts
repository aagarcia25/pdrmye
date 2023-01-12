import { post } from './apiService';

export class MunServices {

  

    public static async CfdiAdministracion(data: any) {
        return await post('CfdiAdministracion', data);
    }
   


    
}