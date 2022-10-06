import Ianios from "../interfaces/filtros/anios";
import SelectValues from "../interfaces/Select/SelectValues";
import { getItem } from "../services/localStorage";



export const fanios =  function () {
    let m: SelectValues[] = JSON.parse(String(getItem('Anios')));
    return m;
};