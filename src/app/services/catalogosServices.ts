
import { post, postDocument } from './apiService';

export class CatalogosServices {

    public static async TiposDePagoSP(data: any) {
        return await post('TiposDePagoSP', data);
    }

    public static async IndexCatRetenciones(data: any) {
        return await post('IndexCatRetenciones', data);
    }
    public static async divisas(data: any) {
        return await post('divisas', data);
    }
    public static async SolicitudesInfo(data: any) {
        return await post('SolicitudesInfo', data);
    }
    public static async BitacoraAjustes(data: any) {
        return await post('BitacoraAjustes', data);
    }
    public static async municipioInformacion(data: any) {
        return await post('municipioInformacion', data);
    }
    public static async subirArchivo(data: any) {
        return await post('subirArchivo', data);
    }
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
    
    public static async TipoFondosCalculo(data : any) {
        return await post('TipoFondosCalculo', data);
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
    public static async indexAPC(data : any) {
        return await post('indexAPC', data);
    };
    public static async clonarInformacionAP(data : any) {
        return await post('clonarInformacionAP', data);
    };
    
    public static async getdetalle(data : any) {
        return await post('getdetalle', data);
    };

    public static async workFlowIndex(data : any) {
        return await post('workFlowIndex', data);
    };

    public static async Bancos(data : any) {
        return await post('Bancos', data);
    };
    
    public static async MunFideicomiso(data : any) {
        return await post('MunFideicomiso', data);
    };

    public static async CuentaBancaria(data : any) {
        return await post('CuentaBancaria', data);
    };

    public static async MUNISAI(data: any) {
        return await post('MUNISAI', data);
    }

    public static async indexISN(data : any) {
        return await post('indexISN', data);
    };

    public static async getliga(data : any) {
        return await post('getliga', data);
    };
    
    public static async Organismos(data : any) {
        return await post('OrganismosIndex', data);
    };
}
