
export interface ROLE {
    Nombre: string;
    Descripcion: string;
}

export interface MENU {
    Menu: string;
    Descripcion: string;
    ControlInterno: string;
    items: any;
}

export interface PERMISO {
    ControlInterno: string;
    Referencia: string;
    Menu: string;

}

export interface ITEMS {
    id: string;
    deleted: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    Menu: string;
    Descripcion: string;
    MenuPadre: string;
    Icon: string;
    Path: string;
    Nivel: number;
    Orden: number;
    ControlInterno: string;
    subitems: any[];
}

export interface PERFILES {
    Descripcion: string;
    Referencia: string;
}

export interface MUNICIPIO {
    id: string;
    Nombre: string;
}

export interface DEPARTAMENTOS {
    NombreCorto: string;
    Descripcion: string;
}

export interface RESPONSE {
    id: string;
    deleted: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    NombreUsuario: string;
    CorreoElectronico: string;
    RutaFoto?: any;
    Puesto?: any;
    EstaActivo?: number;
    Ubicacion?: any;
    Ext?: any;
    Telefono?: any;
    idDepartamento?: any;
    ROLES: ROLE[];
    MENUS: MENU[];
    PERMISOS: PERMISO[];
    PERFILES: PERFILES[];
    DEPARTAMENTOS: DEPARTAMENTOS[];
    MUNICIPIO: MUNICIPIO[];
    tipo?: any;
    Celular?: any;
    Curp?: string;
    idPerfil?: string;
    idUsuarioCentral?: string;
}

export interface UserInfo {
    NUMCODE: number;
    STRMESSAGE: string;
    RESPONSE: RESPONSE;
    SUCCESS: boolean;
}

export interface MunicipioCambios {
    id: number;
    deleted: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    Anio?: number;
    Personas?: number;
    CarenciaProm?: number;
    IdMun?: string;
    Nombre?: string;
    Porcentaje?: string;
    ClaveBancaria?: string;
    Cuenta?: string;
    Importe?: string;
    Coeficiente?: string;
    Version?: string;
    Facturacion?: number;
    totalPob?: string;
    Total?: string;
    anio?: string;
    Pob?: string;
    Recaudacion?: string;
    Km2?: string;
    Mes?: string;
    Movimientos?: string;
    Mensual?: string;
    Anual?: string;
    Diario?: string;
}

export interface SolUser {
    data: any[];
}

export interface SolUserData {
    Respuesta: string;
    Mensaje: string;
    IdSolicitud: string;
}


