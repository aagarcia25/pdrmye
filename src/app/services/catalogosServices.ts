
import { post } from './apiService';

export class CatalogosServices {


    public static async umas(data: any) {
        return await post('umas', data);
    }


    public static async AjustesIndex(data: any) {
        return await post('AjustesIndex', data);
    };

    public static async Notificaciones(data : any) {
        return await post('notificaciones', data);
    };

    public static async munpoblacion(data : any) {
        return await post('munpoblacion', data);
    };

    public static async munfacturacion(data : any) {
        return await post('munfacturacion', data);
    };

}
