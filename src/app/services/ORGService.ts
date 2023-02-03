import { post } from './apiService';

export class ORGService {

  
    public static async indexCabecera(data: any) {
        return await post('indexCabecera', data);
    }

    public static async indexDetalle(data: any) {
        return await post('indexDetalle', data);
    }
    
    public static async ListORG(data: any) {
        return await post('ListORG', data);
    }
    

}
