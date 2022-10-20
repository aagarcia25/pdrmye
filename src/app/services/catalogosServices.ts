
import { post, postDocument } from './apiService';

export class CatalogosServices {


    public static async umas(data: any) {
        return await post('umas', data);
    }

    public static async getTasainteres(data: any) {
        return await post('getTasainteres', data);
    };

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
    public static async munpobreza(data : any) {
        return await post('munpobreza', data);
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
    public static async municipios(data : any) {
        return await post('municipios', data);
    };
    

    public static async anios(data : any) {
        return await post('anios', data);
    };

    public static async descargaplantilla(data : any) {
        return await post('descargaplantilla', data);
    };
    
    public static async migraData(data : any) {
        return await postDocument('migraData', data);
    };
    
    public static async meses(data : any) {
        return await post('meses', data);
    };

    public static async Filtromunicipios(data : any) {
        return await post('Filtromunicipios', data);
    };

    public static async tipofondo(data : any) {
        return await post('tipofondo', data);
    };
    

    public static async inflacionMes(data : any) {
        return await post('inflacionMes', data);
    };

    public static async inflacionAnio(data : any) {
        return await post('inflacionAnio', data);
    };

    public static async fondos(data : any) {
        return await post('fondos', data);
    };

    public static async crecimientoAnio(data : any) {
        return await post('crecimientoAnio', data);
    };

    public static async SelectIndex(data : any) {
        return await post('SelectIndex', data);
    };

    public static async workFlowIndex(data : any) {
        return await post('workFlowIndex', data);
    };

    

}
