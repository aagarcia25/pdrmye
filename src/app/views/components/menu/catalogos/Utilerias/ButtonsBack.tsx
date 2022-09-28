import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, ToggleButtonGroup, Tooltip, ToggleButton } from '@mui/material'


const ButtonsBack = ({
    handleOpen,
  }: {
    handleOpen: Function;
  }) => {
  return (
    <Box sx={{}}>
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        <Tooltip title="Regresar">
          <ToggleButton value="check" onClick={() => handleOpen(1)}>
            <ArrowBackIcon />
          </ToggleButton>
        </Tooltip>

      </ToggleButtonGroup>
    </Box>
  )
}

export default ButtonsBack