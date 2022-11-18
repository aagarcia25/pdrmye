
export interface ROLE {
    Nombre: string;
    Descripcion: string;
}

export interface MENU {
    Menu: string;
    Descripcion: string;
}

export interface PERMISO {
    ControlInterno: string;
    Referencia: string;
    Menu: string;
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
    extencion?: any;
    Telefono?: any;
    idDepartamento?: any;
    ROLES: ROLE[];
    MENUS: MENU[];
    PERMISOS: PERMISO[];
    PERFILES: PERFILES[];
    DEPARTAMENTOS: DEPARTAMENTOS[];
    MUNICIPIO: MUNICIPIO[];
    tipo?: any;
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
    Facturacion?: string;
    totalPob?: string;
    Total?: string;
    anio?: string;
    Pob?: string;
    Recaudacion?: string;
    Km2?: string;
    Mes?: string;
    Movimientos?: string;

}


