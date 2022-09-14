import React from 'react'
import AddIcon from "@mui/icons-material/Add";
import { Box, ToggleButtonGroup, Tooltip, ToggleButton } from '@mui/material'


const ButtonsAdd = ({
    handleOpen,
  }: {
    handleOpen: Function;
  }) => {
  return (
    <Box sx={{}}>
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        <Tooltip title="Agregar Registro">
          <ToggleButton value="check" onClick={() => handleOpen(1)}>
            <AddIcon />
          </ToggleButton>
        </Tooltip>

      </ToggleButtonGroup>
    </Box>
  )
}

export default ButtonsAdd
