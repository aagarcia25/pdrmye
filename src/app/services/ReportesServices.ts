import {  post, postReporte } from "./apiService";

export class ReportesServices {

    
    public static async formatoSolicitud(data: any,name: string) {
        return await postReporte('formatoSolicitud', data,name);
    }

    public static async handleReport(data: any,name: string) {
        return await postReporte('handleReport', data,name);
    }

    public static async handleTipoExportacion(data: any) {
        return await post('handleTipoExportacion', data);
    }

    public static async relacionaTipoExportacion(data: any) {
        return await post('relacionaTipoExportacion', data);
    }
    
    
    
    
}