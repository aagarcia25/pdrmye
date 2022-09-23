import Imeses from "../interfaces/filtros/meses";
import { getItem } from "../services/localStorage";



export const fmeses =  function () {
    let m: Imeses[] = JSON.parse(String(getItem('Meses')));
    return m;
};