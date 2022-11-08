import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import SelectValues from '../../../../../interfaces/Select/SelectValues';
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
    <div>
       <Dialog open={true}>
       <DialogTitle>Usuario Responsable del Municipio</DialogTitle>
      <DialogContent>
        <Box>
        
         

        <SelectFrag
                  value={id}
                  options={usuarios}
                  onInputChange={handleChange}
                  placeholder={"Seleccione Usuario"}
                  label={""}
                  disabled={false}
                />
        </Box>
      </DialogContent>

      <DialogActions>
        <button className="guardar" onClick={() => handleSend()}>
          Guardar
        </button>
        <button className="cerrar" onClick={() => handleClose()}>
          Cancelar
        </button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

export default MunicipiosUsuarioResponsable
