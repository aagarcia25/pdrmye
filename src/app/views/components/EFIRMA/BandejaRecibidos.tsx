import React from 'react'
import {TablaDocs } from '@jbcecapmex/pakfirma';
import { RESPONSE } from '../../../interfaces/user/UserInfo';
import { getToken, getUser } from '../../../services/localStorage';
export const BandejaRecibidos = () => {
  const user: RESPONSE = JSON.parse(String(getUser()));


  return (
    <div>
       <TablaDocs
       TipoBandeja={'Recibidos'} 
       IdTipoBandeja={'ac49701a-bdc8-11ed-afa1-0242ac120002'} 
       PathEnvia={'../enviar/'}
       jwtToken={String(getToken()).replace(/["']/g, "")}
       IdCentral={String(user.idUsuarioCentral)}
       IdApp="973ecf89-38ff-11ed-aed0-040300000000" 
    />  
</div>
  )
}