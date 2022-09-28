import { post } from "./apiService";

export class ArticulosServices{

    public static async articulof1(data: any) {
        return await post('articulof1', data);
    }

    public static async articulof2(data: any) {
        return await post('articulof2', data);
    }
}