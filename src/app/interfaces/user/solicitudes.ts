
export interface Datum {
    Respuesta: string;
    Mensaje: string;
    Id: string  ;
    NombreUsuario: string;
    DatosAdicionales: string;
    Estatus: number;
    TipoSolicitud: string;
    tipoSoli: string;
    CreadoPor: string;
    NombreSolicitante: string;
    FechaDeCreacion: Date;
    UltimaModificacion: Date;
    ModificadoPor: string;
    IdApp: string;
    AppNombre: string;
}

export interface DatDAMOPSol {
    FechaDeCreacion: Date;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Estatus: string;
    DatosAdicionales: string;
    
}


export interface SolicitudUsrTiDetalle {
    Respuesta: string;
    Mensaje: string;
    Id: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    NombreUsuario: string;
    CorreoElectronico: string;
    Curp: string;
    Rfc: string;
    Telefono: string;
    Ext: string;
    Celular: string;
    FechaDeCreacion: Date;
    CreadoPor: string;
    Estatus: number;
    DatosAdicionales: string;
    NombreApp: string;
    NombreSolicitante: string;
}