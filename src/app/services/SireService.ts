import { post } from './apiServiceSire';

export class SireService {

  
    public static async ConsultaPresupuesto(data: any) {
        return await post('ConsultaPresupuesto', data);
    }


}
