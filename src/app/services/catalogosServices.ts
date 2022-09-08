
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
    public static async munpobrezamod(data : any) {
        return await post('munpobrezamod', data);
    };
    public static async munproyec(data : any) {
        return await post('munproyec', data);
    };
    public static async munterritorio(data : any) {
        return await post('munterritorio', data);
    };
    public static async munpobrezaext(data : any) {
        return await post('munpobrezaext', data);
    };
    public static async munrecaudacion(data : any) {
        return await post('munrecaudacion', data);
    };
    public static async coeficientes(data : any) {
        return await post('coeficientes', data);
    };
    public static async eventos(data : any) {
        return await post('eventos', data);
    };
    public static async avisos(data : any) {
        return await post('avisos', data);
    };
    public static async departamentos(data : any) {
        return await post('departamentos', data);
    };
    
    

    

    

}
