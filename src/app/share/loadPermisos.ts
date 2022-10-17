import SelectValues from "../interfaces/Select/SelectValues";
import { getPermisos } from "../services/localStorage";


export const permisosc =  function () {
    let m: SelectValues[] = JSON.parse(String(getPermisos()));
    return m;
};