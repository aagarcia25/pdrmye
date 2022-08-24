export default interface Imenu {
   ID?: string,
   Nombre?: string,
   Descripcion?: string,
   MenuPadre?: string,
   Orden?: number,
   Path?: string,
   Icon?: string,
   deleted?: number,
   UltimaActualizacion?: string,
   FechaCreacion?: string,
   ModificadoPor?: string,
   CHILDREN ?: Imenu
}

export default interface ImenuOut {
   CHID?: string,
   NUMOPERACION?: number
   STRNOMBRE?: string,
   STRDESCRIPCION?: string,
   NUMMENUPADRE?: string,
   NUMORDEN?: number,
   STRPATH?: string,
   STRICON?: string,
   CHUSER?: string
}
