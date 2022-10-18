import { Box, IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AccionesGrid = ({
  handleEditar,
  handleBorrar,
  v,
  update,
  pdelete,
}: {
  handleEditar: Function;
  handleBorrar: Function;
  v: any;
  update: boolean;

  pdelete: boolean;
}) => {
  return (
    <div>
      <Box>
        {update ? (
          <Tooltip title={"Editar Registro"}>
            <IconButton color="info" onClick={() => handleEditar(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}

        {pdelete ? (
          <Tooltip title={"Eliminar Registro"}>
            <IconButton color="error" onClick={() => handleBorrar(v)}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default AccionesGrid;
