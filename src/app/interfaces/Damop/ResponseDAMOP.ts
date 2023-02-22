export interface indexCabecera {
    id: string;
    Anio: number;
    Mes: string;
    Observaciones: string;
    NumProyecto: string;
    NumEgreso?: any;
    NumOrdenPago?: any;
    NumCheque?: any;
    total: string;
    IdConCheque: string;
    ConCheque: string;
    Organismo: string;
    IdOrg: string;
    UResponsable: string;
    IdUres: string;
    Divisa: string;
    Cuenta:string;
    TipoSolicitud:string;

}

export interface indexDetalle {
    id: string;
    deleted: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    idORG: string;
    Descripcion: string;
    Clasificador01: string;
    Clasificador02: string;
    Clasificador03: string;
    Clasificador04: string;
    Clasificador05: string;
    Clasificador06: string;
    Clasificador07: string;
    Clasificador08: string;
    Clasificador09: string;
    Clasificador10: string;
    Clasificador11: string;
    importe: string;
    ConceptoEgreso: string;
}