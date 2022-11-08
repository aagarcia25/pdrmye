import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import SelectValues from '../../../../../interfaces/Select/SelectValues';
import ModalForm from '../../../componentes/ModalForm';
import SelectFrag from '../../../Fragmentos/SelectFrag';

const MunicipiosUsuarioResponsable = (
{
        handleClose,
        dt,
      }: {
        handleClose: Function;
        dt: any;
      }
) => {

    const [usuarios, setUsuarios] = useState<SelectValues[]>([]);
    const [id, setId] = useState<string>("");


    const handleChange = (v: string) => {
        setId(v);
    };
    const handleSend = () => {

    }

  return (
    <ModalForm title={'Usuario Responsable del Municipio'} handleClose={handleClose}>
    <div>
        <SelectFrag
                  value={id}
                  options={usuarios}
                  onInputChange={handleChange}
                  placeholder={"Seleccione Usuario"}
                  label={""}
                  disabled={false}
                />
      
    </div>
    </ModalForm>
  )
}

export default MunicipiosUsuarioResponsable
