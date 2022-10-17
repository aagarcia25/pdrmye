
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
        Permiso: string;
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
        Ubicacion?: any;
        extencion?: any;
        Telefono?: any;
        idDepartamento?: any;
        ROLES: ROLE[];
        MENUS: MENU[];
        PERMISOS: PERMISO[];
        tipo?: any;
    }

    export interface UserInfo {
        NUMCODE: number;
        STRMESSAGE: string;
        RESPONSE: RESPONSE;
        SUCCESS: boolean;
    }