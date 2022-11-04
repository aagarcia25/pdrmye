import React from 'react'
import { Box, IconButton } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const BotonesAcciones = ({
    handleAccion,
    row,
    editar,
    eliminar,
  }: {
    handleAccion: Function;
    row:any;
    editar:boolean;
    eliminar:boolean;
   
  }) => {
  return (
    <div>
      <Box>
           {/* EDITAR */}
           {editar ? 
            <IconButton color="info" onClick={() => handleAccion({tipo:1,data:row})}>
              <ModeEditOutlineIcon />
            </IconButton>
            :""}
            {/* ELIMINAR */}
            {eliminar ?
            <IconButton  color="error" onClick={() => handleAccion({tipo:2,data:row})}>
              <DeleteForeverIcon />
            </IconButton>
            :""
            
            }
                     
          </Box>
    </div>
  )
}

export default BotonesAcciones
