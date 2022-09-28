import { Imunicipio } from "../interfaces/municipios/FilterMunicipios";
import { getMunicipios } from "../services/localStorage";



export const municipiosc =  function () {
    let m: Imunicipio[] = JSON.parse(String(getMunicipios()));
    return m;
};