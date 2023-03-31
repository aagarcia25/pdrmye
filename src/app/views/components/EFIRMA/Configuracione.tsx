import React from 'react'
//import {Configuracion } from '@jbcecapmex/pakfirma';
import { RESPONSE } from '../../../interfaces/user/UserInfo';
import { getToken, getUser } from '../../../services/localStorage';
export const Configuracione = () => {
  const user: RESPONSE = JSON.parse(String(getUser()));



  return (
    <div>
      {/* <Configuracion 
      jwtToken={String(getToken()).replace(/["']/g, "")}
      IdCentral={String(user.idUsuarioCentral)}
      NombreUsuario={user.NombreUsuario}
      IdApp="973ecf89-38ff-11ed-aed0-040300000000"
      />  */}
</div>
  )
}
