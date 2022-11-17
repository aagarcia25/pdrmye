import { post } from './apiService';

export class DPCPServices {

    
    public static async ConsultaDPCP(data: any) {
        return await post('ConsultaDPCP', data);
    }
   
    public static async GetPartFedv2(data: any) {
        return await post('GetPartFedv2', data);
    }

    public static async GetParticipaciones(data: any) {
        return await post('GetParticipaciones', data);
    }
    

    

}
