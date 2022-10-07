import SelectValues from "../interfaces/Select/SelectValues";
import { getItem } from "../services/localStorage";



export const fmeses =  function () {
    let m: SelectValues[] = JSON.parse(String(getItem('Meses')));
    return m;
};