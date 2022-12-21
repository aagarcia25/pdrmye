import { post } from './apiService';

export class DPCPServices {

    
    public static async ConsultaDPCP(data: any) {
        return await post('ConsultaDPCP', data);
    }
   
    public static async GetParticipaciones(data: any) {
        return await post('GetParticipaciones', data);
    }
    
    public static async DistribucionFideicomisos(data: any) {
        return await post('DistribucionFideicomisos', data);
    }

    public static async eliminarSolicitudes(data: any) {
        return await post('eliminarSolicitudes', data);
    }
    

}
