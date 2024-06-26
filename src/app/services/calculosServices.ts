import { post } from "./apiService";

export class calculosServices {
  public static async calculosInfo(data: any) {
    return await post("calculosInfo", data);
  }

  public static async calculosInfodetalle(data: any) {
    return await post("calculosInfodetalle", data);
  }

  public static async calculosanualdetalle(data: any) {
    return await post("calculosanualdetalle", data);
  }

  public static async calculosdetail(data: any) {
    return await post("calculosdetail", data);
  }

  public static async indexCalculo(data: any) {
    return await post("indexCalculo", data);
  }

  public static async infoCalculo(data: any) {
    return await post("infoCalculo", data);
  }

  public static async CalculoPrincipalindex(data: any) {
    return await post("CalculoPrincipalindex", data);
  }

  public static async getColumns(data: any) {
    return await post("getColumns", data);
  }

  public static async fondoInfo(data: any) {
    return await post("fondoInfo", data);
  }

  public static async trazabilidad(data: any) {
    return await post("trazabilidad", data);
  }

  public static async trazabilidadSolicitud(data: any) {
    return await post("trazabilidadSolicitud", data);
  }

  public static async CalculoGarantia(data: any) {
    return await post("CalculoGarantia", data);
  }

  public static async BorraCalculo(data: any) {
    return await post("BorraCalculo", data);
  }

  public static async getEstatusCalculo(data: any) {
    return await post("getEstatusCalculo", data);
  }

  public static async spcalculo(data: any) {
    return await post("spcalculo", data);
  }

  public static async getResponsable(data: any) {
    return await post("getResponsable", data);
  }

  public static async ReCalculo(data: any) {
    return await post("ReCalculo", data);
  }

  public static async handlepef(data: any) {
    return await post("handlepef", data);
  }

  public static async AjusteSemestralIndex(data: any) {
    return await post("AjusteSemestralIndex", data);
  }

  public static async AjusteAnualIndex(data: any) {
    return await post("AjusteAnualIndex", data);
  }

  public static async aprovarcalculoanual(data: any) {
    return await post("aprovarcalculoanual", data);
  }

  public static async BorraCalculoAnual(data: any) {
    return await post("BorraCalculoAnual", data);
  }

  public static async estatusanual(data: any) {
    return await post("estatusanual", data);
  }

  public static async grabacentavos(data: any) {
    return await post("grabacentavos", data);
  }

  public static async renviarCorreo(data: any) {
    return await post("renviarCorreo", data);
  }
}
