import { post } from './apiService';

export class DAMOPServices {

    
  
    public static async PA(data: any) {
        return await post('PA', data);
    }

    public static async saveReqAnt(data: any) {
        return await post('saveReqAnt', data);
    }

    public static async indexCabecera(data: any) {
        return await post('indexCabecera', data);
    }

    public static async indexDetalle(data: any) {
        return await post('indexDetalle', data);
    }
    
    
    

    
    



    

}
