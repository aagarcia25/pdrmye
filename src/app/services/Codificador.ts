import { AES, enc } from "crypto-js";
export class Codificador {

    public static coded(data: string) {
        const Key: string = "30adc962-7109-11ed-a880-040300000000";
        return AES.encrypt(data, Key).toString();
    }

    public static decoded(data: string) {
        const Key: string = "30adc962-7109-11ed-a880-040300000000";
        const decrypted = AES.decrypt(data, Key);
        if (decrypted) {
            try {
                const str = decrypted.toString(enc.Utf8);
                if (str.length > 0) {
                    return str;
                } else {
                    return 'error 1';
                }
            } catch (e) {
                return 'error 2';
            }
        }
        return 'error 3';
    }
}