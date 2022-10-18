export interface Subitem {
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
}

export interface Item {
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
    subitems?: Subitem[];
}

export interface menus {
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
    items?: Item[];
}

