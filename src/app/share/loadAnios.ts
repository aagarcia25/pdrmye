import Ianios from "../interfaces/filtros/anios";
import { getItem } from "../services/localStorage";



export const fanios =  function () {
    let m: Ianios[] = JSON.parse(String(getItem('Anios')));
    return m;
};