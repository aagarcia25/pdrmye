export interface RESPONSEC {
    id: string;
    deleted: string;
    UltimaActualizacion: string;
    FechaCreacion: string;
    ModificadoPor: string;
    CreadoPor: string;
    NombreEvento: string;
    InicioEvento: string;
    FinEvento: string;
    AsignadoA: string;
    Departamento: string;
}

export interface calendario {
    NUMCODE: number;
    STRMESSAGE: string;
    RESPONSE: RESPONSEC[];
}


export interface eventoc {
    id: string,
    title: string,
    allDay: boolean,
    start: Date,
    end: Date,
}
