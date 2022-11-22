import { Box, ToggleButtonGroup, Tooltip, ToggleButton} from "@mui/material";
import { useEffect, useState } from "react";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { PERMISO } from "../../../../../interfaces/user/UserInfo";
import { getPermisos } from "../../../../../services/localStorage";

const AccionesGrid = ({
  controlInterno,
  handleDelete,
  handleEditar,
}: {
  controlInterno: string;
  handleDelete: Function;
  handleEditar:Function;
}) => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);


  useEffect(() => {


    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === controlInterno) {
        //console.log(item)
        if (String(item.Referencia) === "ELIM") {
            setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
            setEditar(true);
        }
      }
    });

  }, []);



  return (

    <Box sx={{ alignItems: "center", }}>

      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        {editar ?
          <Tooltip title="Editar">
            <ToggleButton value="check" onClick={(v) => handleEditar(v)} >
                <ModeEditOutlineIcon />
            </ToggleButton>
          </Tooltip>
          : ""}
        {eliminar ?
          <Tooltip title="Eliminar">
            <ToggleButton value="check" onClick={(v) => handleDelete(v)}>
              <DeleteForeverIcon />
            </ToggleButton>
          </Tooltip>
          : ""}

      </ToggleButtonGroup>
    </Box>
  );
};

export default AccionesGrid;
