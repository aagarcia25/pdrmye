import SelectValues from "../interfaces/Select/SelectValues";
import { CatalogosServices } from "../services/catalogosServices";


  
export const loadSelect = async (tipo: number) => {
  try {
    let data = {
      NUMOPERACION: tipo,
    };
    const res = await CatalogosServices.SelectIndex(data);
    return res.RESPONSE ;
  } catch (error) {
    console.error('Error en loadSelect:', error);
    return []; // Otra acción apropiada en caso de error
  }
};