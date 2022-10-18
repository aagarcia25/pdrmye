import { post} from './apiService';

export class ParametroServices {

    public static async ParametroGeneralesIndex(data: any) {
        return await post('ParametroGeneralesIndex', data);
    }

}
