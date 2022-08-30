import { post } from "./apiService";

export class CalendarioService {

    public static async calendarios(data: any) {
        return await post('calendarios', data);
    }


}
