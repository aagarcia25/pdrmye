import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, ToggleButtonGroup, Tooltip, ToggleButton, Grid } from "@mui/material";
import { Height } from "@mui/icons-material";

const ButtonsAdd = ({
  handleOpen,
  agregar,
}: {
  handleOpen: Function;
  agregar: boolean;
}) => {
  return (
    <Box sx={{ alignItems: "center", height:"100%" }} >
        <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
      {agregar ? (
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform"   >
          <Tooltip title="Agregar" >
            <ToggleButton value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
      </Grid>
    </Box>
  );
};

export default ButtonsAdd;
