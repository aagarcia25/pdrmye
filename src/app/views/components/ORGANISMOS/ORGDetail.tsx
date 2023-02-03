import React from 'react'
import { RESPONSE, PERMISO } from '../../../interfaces/user/UserInfo';
import { getUser, getPermisos } from '../../../services/localStorage';

export const ORGDetail = ({
    idrow
  }: {
    idrow: string;
  }) => {

  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));




  return (
    <div>ORGDetail</div>
  )
}
