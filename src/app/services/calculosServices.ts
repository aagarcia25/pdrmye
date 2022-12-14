import { post} from './apiService';

export class calculosServices {

    public static async calculosInfo(data: any) {
        return await post('calculosInfo', data);
    }

    public static async calculosInfodetalle(data: any) {
        return await post('calculosInfodetalle', data);
    }

    public static async indexCalculo(data: any) {
        return await post('indexCalculo', data);
    }

    public static async infoCalculo(data: any) {
        return await post('infoCalculo', data);
    }
    
    public static async CalculoPrincipalindex(data: any) {
        return await post('CalculoPrincipalindex', data);
    }

    public static async getColumns(data: any) {
        return await post('getColumns', data);
    }

    public static async fondoInfo(data: any) {
        return await post('fondoInfo', data);
    }

    public static async trazabilidad(data: any) {
        return await post('trazabilidad', data);
    }

    public static async trazabilidadSolicitud(data: any) {
        return await post('trazabilidadSolicitud', data);
    }

    public static async calcula(data: any) {
        return await post('calcula', data);
    }

    public static async CalculoGarantia(data: any) {
        return await post('CalculoGarantia', data);
    }

    public static async BorraCalculo(data: any) {
        return await post('BorraCalculo', data);
    }

    public static async getEstatusCalculo(data: any) {
        return await post('getEstatusCalculo', data);
    }
    public static async getPerfilCalculo(data: any) {
        return await post('getPerfilCalculo', data);
    }
    public static async getAreaCalculo(data: any) {
        return await post('getAreaCalculo', data);
    }
    
    public static async CalculoArchivo(data: any) {
        return await post('CalculoArchivo', data);
    }

    public static async spcalculo(data: any) {
        return await post('spcalculo', data);
    }

    public static async getResponsable(data: any) {
        return await post('getResponsable', data);
    }
    
    
    
    

}
