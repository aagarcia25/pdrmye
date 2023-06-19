import { post } from './apiService';

export class DPCPServices {

    
    public static async IndexPaRetenciones(data: any) {
        return await post('IndexPaRetenciones', data);
    }
    public static async FinParticipaciones(data: any) {
        return await post('FinParticipaciones', data);
    }
       
    public static async FinEgreso(data: any) {
        return await post('FinEgreso', data);
    }

    public static async GenNumOrdenePago(data: any) {
        return await post('GenNumOrdenePago', data);
    }
    
    public static async AutEgreso(data: any) {
        return await post('AutEgreso', data);
    }
    public static async ValidarEgreso(data: any) {
        return await post('ValidarEgreso', data);
    }

    public static async AutParticipaciones(data: any) {
        return await post('AutParticipaciones', data);
    }

    public static async TransferirEgreso(data: any) {
        return await post('TransferirEgreso', data);
    }

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
    public static async setDescuentos(data: any) {
        return await post('setDescuentos', data);
    }
    

    public static async GetDetalleRegistro(data: any) {
        return await post('GetDetalleRegistro', data);
    }

    public static async AuthSolicitudPago(data: any) {
        return await post('AuthSolicitudPago', data);
    }

    public static async AsignaOperacion(data: any) {
        return await post('AsignaOperacion', data);
    }

    public static async MarcaMonex(data: any) {
        return await post('MarcaMonex', data);
    }


    
}
