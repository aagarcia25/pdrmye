export  interface IRow {
    id?: number,
    col1?: string,
    col2?:string
  }


  export  interface IColum {
    field?:string,
    headerName?:string,
    width?:number
  }


 export  interface Iauntenticacion{
  user:string,
  password:string

 }

export  interface Icalendario{
    CHID?:string,
    NUMOPERACION?:number,
    STRNOMBREEVENTO?:string,
    DATEINICIOEVENTO?:string,
    DATEFINEVENTO?:string,
    CHUSER?:string
}

export  interface Iumas{
    CHID?:string,
    NUMOPERACION?:number,
    NUMANIO?:string,
    DECDIARIO?:string,
    DECMENSUAL?:string,
    DECANUAL?:string,
    CHUSER?:string
}

export  interface Iajustes{
    CHID?:string,
    NUMOPERACION?:number,
    DESCRIPCION?:string,
    MODIFICADOPOR?:string,
    CREADOPOR?:string,
    DELETED?:string
}

export  interface Inotificaciones{
    CHID?:string,
    NUMOPERACION?:number,
    DESCRIPCION?:string,
    DESTINATARIO?:string,
    MODIFICADOPOR?:string,
    CREADOPOR?:string,
    DELETED?:string
}


