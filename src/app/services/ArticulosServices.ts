import { post } from "./apiService";

export class ArticulosServices{

    public static async articulof1(data: any) {
        return await post('articulof1', data);
    }

   
}