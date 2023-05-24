import { postReporte } from "./apiService";

export class ReportesServices {

    
    public static async formatoSolicitud(data: any) {
        return await postReporte('formatoSolicitud', data);
    }

   
}