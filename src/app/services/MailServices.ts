import { post } from "./apiService";

export class MailServices {

    public static async sendMail(data: any) {
        return await post('serviciocorreo', data);
    }


}
