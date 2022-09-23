import { Box, IconButton } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AccionesGrid = ({
  handleEditar,
  handleBorrar,
  v,
  update,
  pdelete
}: {
  handleEditar: Function;
  handleBorrar: Function;
  v: any;
  update :boolean;
  pdelete:boolean;
 
}) => {
  

  return (
    <div>
      <Box>
        {update ? (
          <IconButton color="info" onClick={() => handleEditar(v)}>
            <ModeEditOutlineIcon />
          </IconButton>
        ) : (
          ""
        )}

        {pdelete ? (
          <IconButton color="error" onClick={() => handleBorrar(v)}>
            <DeleteForeverIcon />
          </IconButton>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default AccionesGrid;
