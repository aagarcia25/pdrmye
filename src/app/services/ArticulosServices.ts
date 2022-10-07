import { post } from "./apiService";

export class ArticulosServices{

    public static async articulof1(data: any) {
        return await post('articulof1', data);
    }

    public static async articuloprincipal(data: any) {
        return await post('articuloprincipal', data);
    }


    public static async generarVersion(data: any) {
        return await post('generarVersion', data);
    }


    

    

   
}