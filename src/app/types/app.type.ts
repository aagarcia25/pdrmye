export default interface IRow {
    id?: number,
    col1?: string,
    col2?:string
  }


  export default interface IColum {
    field?:string,
    headerName?:string,
    width?:number
  }


 export default interface Iauntenticacion{
  user:string,
  password:string

 }

export default interface Icalendario{
    CHID?:string,
    NUMOPERACION?:number,
    STRNOMBREEVENTO?:string,
    DATEINICIOEVENTO?:string,
    DATEFINEVENTO?:string,
    CHUSER?:string
}

export default interface Iumas{
    CHID?:string,
    NUMOPERACION?:number,
    NUMANIO?:string,
    DECDIARIO?:string,
    DECMENSUAL?:string,
    DECANUAL?:string,
    CHUSER?:string
}

export default interface Iajustes{
    CHID?:string,
    NUMOPERACION?:number,
    DESCRIPCION?:string,
    MODIFICADOPOR?:string,
    CREADOPOR?:string,
    DELETED?:string
}

export default interface Inotificaciones{
    CHID?:string,
    NUMOPERACION?:number,
    DESCRIPCION?:string,
    DESTINATARIO?:string,
    MODIFICADOPOR?:string,
    CREADOPOR?:string,
    DELETED?:string
}