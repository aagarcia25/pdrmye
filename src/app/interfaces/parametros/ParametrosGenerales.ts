export interface ParametrosGenerales {
  id: string;
  Nombre: string;
  Valor: string;
}

export interface MigraData {
  NUMCODE: number;
  STRMESSAGE: string;
  RESPONSE: resultmigracion[];
  SUCCESS: boolean;
}

export interface resultmigracion {
  VIDENTIFICADORCABECERA: string;
}
