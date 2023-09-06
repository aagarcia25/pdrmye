import { Firmado } from '@jbcecapmex/pakfirma';
import { USUARIORESPONSE } from '../../../interfaces/user/UserInfo';
import { getToken, getUser } from '../../../services/localStorage';

export const Firma = () => {
    const user: USUARIORESPONSE= JSON.parse(String(getUser()));


  return (
    <div>
         <Firmado 
        jwtToken={String(getToken()).replace(/["']/g, "")}
        IdCentral={String(user.Id)}
        NombreUsuario={user.NombreUsuario}
        IdApp="973ecf89-38ff-11ed-aed0-040300000000" 
        PathPorEnviar={''}      /> 
    </div>
  )
}
