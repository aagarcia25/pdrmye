import { post } from './apiService';

export class DAMOPServices {

    
  
    public static async PA(data: any) {
        return await post('PA', data);
    }

    public static async saveReqAnt(data: any) {
        return await post('saveReqAnt', data);
    }
    
    
    



    

}
