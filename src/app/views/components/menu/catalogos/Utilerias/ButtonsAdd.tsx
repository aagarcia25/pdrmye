import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, ToggleButtonGroup, Tooltip, ToggleButton } from "@mui/material";

const ButtonsAdd = ({
  handleOpen,
  agregar,
}: {
  handleOpen: Function;
  agregar: boolean;
}) => {
  return (
    <Box sx={{marginLeft:"1%"}} >
      {agregar ? (
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform" >
          <Tooltip title="Agregar">
            <ToggleButton value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ButtonsAdd;
