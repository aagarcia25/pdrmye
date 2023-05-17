import AddIcon from "@mui/icons-material/Add";
import { Box, ToggleButtonGroup, Tooltip, ToggleButton, Grid, Typography } from "@mui/material";
import React from "react";
import { TooltipPersonalizado } from "../../../componentes/CustomizedTooltips";

const ButtonsAdd = ({
  handleOpen,
  agregar,
}: {
  handleOpen: Function;
  agregar: boolean;
}) => {
  return (
    <>
      {agregar ? (
          <Tooltip
            title={"Agregar"}>
            <ToggleButton  className="guardar" value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>

      ) : (
        ""
      )}
    </>
  );
};

export default ButtonsAdd;
