import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
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
             <Tooltip title={"Editar Registro"}>
            <IconButton color="info" onClick={() => handleAccion({tipo:1,data:row})}>
              <ModeEditOutlineIcon />
            </IconButton>
            </Tooltip>
            :""}
            {/* ELIMINAR */}
            {eliminar ?
              <Tooltip title={"Eliminar Registro"}>
            <IconButton  color="error" onClick={() => handleAccion({tipo:2,data:row})}>
              <DeleteForeverIcon />
            </IconButton>
            </Tooltip>
            :""
            
            }
                     
          </Box>
    </div>
  )
}

export default BotonesAcciones
