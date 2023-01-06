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
    public static async GenSolParticipaciones(data: any) {
        return await post('GenSolParticipaciones', data);
    }
    public static async eliminarSolicitudes(data: any) {
        return await post('eliminarSolicitudes', data);
    }
    
    public static async integraSolicitudes(data: any) {
        return await post('integraSolicitudes', data);
    }
    
    public static async unificarSolicitudes(data: any) {
        return await post('unificarSolicitudes', data);
    }
    
    public static async getDescuentos(data: any) {
        return await post('getDescuentos', data);
    }

    public static async GetDetalleRegistro(data: any) {
        return await post('GetDetalleRegistro', data);
    }

}
