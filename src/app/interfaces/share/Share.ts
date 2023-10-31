export interface ICFDI {
  id: string;
  deleted: string;
  UltimaActualizacion: string;
  FechaCreacion: string;
  ModificadoPor: string;
  CreadoPor: string;
  idPA: string;
  Route: string;
  Nombre: string;
  NombreAuditoria: any;
  Estatus: string;
}

export interface IPagos {
  SP: string;
  TOTAL_PAGO: string;
  FECHA_PAGO: string;
  NO_CUENTA: string;
  NO_CHEQUE: string;
  BENEFICIARIOPAGO: string;
  TIPO_PAGO: string;
  CONCEPTO: string;
  COG: string;
  DESCOG: string;
}
