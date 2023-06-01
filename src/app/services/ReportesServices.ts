import { postReporte } from "./apiService";

export class ReportesServices {

    
    public static async formatoSolicitud(data: any,name: string) {
        return await postReporte('formatoSolicitud', data,name);
    }

    public static async handleReport(data: any,name: string) {
        return await postReporte('handleReport', data,name);
    }

    
}