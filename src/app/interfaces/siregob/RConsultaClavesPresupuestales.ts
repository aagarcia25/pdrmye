export interface RConsultaClavesPresupuestales {
    RESPONSE: Clave[]
  }
  
 
  export interface Clave {
    Presupuestal: string
    Habilitada: string
    ValidaPresupuesto: string
    Irreductible: string
    Descripcion: string
    Saldos: Saldos
  }
  
  export interface Saldos {
    Estimado: Estimado
    Aprobado: Aprobado
    Ampliacion: Ampliacion
    Reduccion: Reduccion
    Transferencia_Aumento: TransferenciaAumento
    Transferencia_Reduccion: TransferenciaReduccion
    Saldo: Saldo
    PreComprometer: PreComprometer
    Disponible: Disponible
    Comprometido: Comprometido
    PreComprometido_Sin_Comprometer: PreComprometidoSinComprometer
    Para_PreComprometer: ParaPreComprometer
    Devengado: Devengado
    No_Devengado: NoDevengado
    PreComprometido_Sin_Deven: PreComprometidoSinDeven
    Ejercido: Ejercido
    Recaudado: Recaudado
    Devengado_Sin_Ejerc: DevengadoSinEjerc
    Pagado: Pagado
    Ejercido_Sin_Pagar: EjercidoSinPagar
    PorPagar: PorPagar
  }
  
  export interface Estimado {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Aprobado {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Ampliacion {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Reduccion {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface TransferenciaAumento {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface TransferenciaReduccion {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Saldo {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface PreComprometer {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Disponible {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Comprometido {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface PreComprometidoSinComprometer {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface ParaPreComprometer {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Devengado {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface NoDevengado {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface PreComprometidoSinDeven {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Ejercido {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Recaudado {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface DevengadoSinEjerc {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface Pagado {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface EjercidoSinPagar {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  
  export interface PorPagar {
    Total: number
    Enero: number
    Febrero: number
    Marzo: number
    Abril: number
    Mayo: number
    Junio: number
    Julio: number
    Agosto: number
    Septiembre: number
    Octubre: number
    Noviembre: number
    Diciembre: number
  }
  