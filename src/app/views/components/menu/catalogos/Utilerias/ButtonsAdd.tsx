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
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform"   >
          <TooltipPersonalizado
            title={<React.Fragment><Typography variant='h6' className='tooltipLogos'>Agregar</Typography></React.Fragment>}>
            <ToggleButton value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </TooltipPersonalizado>

        </ToggleButtonGroup>
      ) : (
        ""
      )}
    </>
  );
};

export default ButtonsAdd;
