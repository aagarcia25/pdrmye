import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, ToggleButtonGroup, Tooltip, ToggleButton } from "@mui/material";

const ButtonsMunBase = ({
  handleOpen,
  agregar,
  eliminar,
}: {
  handleOpen: Function;
  agregar: boolean;
  eliminar:boolean;
}) => {
  return (
    <Box  >
      {agregar ? (
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform" >
          <Tooltip title="Agregar">
            <ToggleButton  className="guardar" value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
       {eliminar ? (
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform" >
          <Tooltip title="Borrado Masivo">
            <ToggleButton  className="guardar" value="check" onClick={() => handleOpen(2)}>
              <DeleteForeverIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ButtonsMunBase;
