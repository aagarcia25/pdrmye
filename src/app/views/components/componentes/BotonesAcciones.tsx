import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { IconButton, Tooltip } from '@mui/material';


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
           {/* EDITAR */}
           {editar ? 
             <Tooltip title={"Editar Registro"}>
            <IconButton color="inherit" onClick={() => handleAccion({tipo:1,data:row})}>
              <ModeEditOutlineIcon />
            </IconButton>
            </Tooltip>
            :""}
            {/* ELIMINAR */}
            {eliminar ?
              <Tooltip title={"Eliminar Registro"}>
            <IconButton  color="inherit" onClick={() => handleAccion({tipo:2,data:row})}>
              <DeleteForeverIcon />
            </IconButton>
            </Tooltip>
            :""
            
            }
                     
    </div>
  )
}

export default BotonesAcciones
