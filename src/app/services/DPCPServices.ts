import { post } from './apiService';

export class DPCPServices {

    
    public static async ConsultaDPCP(data: any) {
        return await post('ConsultaDPCP', data);
    }
   

    

}
