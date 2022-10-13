import SelectValues from "../interfaces/Select/SelectValues";
import { getMunicipios } from "../services/localStorage";



export const municipiosc =  function () {
    let m: SelectValues[] = JSON.parse(String(getMunicipios()));
    return m;
};