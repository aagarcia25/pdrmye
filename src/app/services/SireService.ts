import { post } from "./apiService";

export class SireService {
  public static async ConsultaPresupuesto(data: any) {
    return await post("ConsultaPresupuesto", data);
  }

  public static async getPagosbySP(data: any) {
    return await post("getPagosbySP", data);
  }
}
