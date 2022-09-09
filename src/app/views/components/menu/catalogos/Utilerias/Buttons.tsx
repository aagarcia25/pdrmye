import { Box, ToggleButtonGroup, Tooltip, ToggleButton } from '@mui/material'
import React from 'react'
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const Buttons = (
    {
        handleOpen
    }:{
        handleOpen: Function
    }

) => {


  return (
    <Box>
    <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
      <Tooltip title="Agregar Registro">
        <ToggleButton
          value="check"
          onClick={() => handleOpen(1)}
        >
          <AddIcon />
        </ToggleButton>
      </Tooltip>

      <Tooltip title="Descargar Plantilla">
        <ToggleButton
          value="check"
          onClick={() => handleOpen(1)}
        >
          <ArrowDownwardIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Cargar Plantilla">
        <ToggleButton
          value="check"
          onClick={() => handleOpen(1)}
        >
          <DriveFolderUploadIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  </Box>
  )
}

export default Buttons
