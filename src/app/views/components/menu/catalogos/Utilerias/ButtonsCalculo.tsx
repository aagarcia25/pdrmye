import { Box, ToggleButtonGroup, Tooltip, ToggleButton, IconButton } from '@mui/material';
import React from 'react'
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";


const ButtonsCalculo = ({
    handleOpen,
  }: {
    handleOpen: Function;
  }) => {
  return (
    <Box sx={{}}>
    <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
      <Tooltip title="Agregar Calcúlo">
        <ToggleButton value="check" onClick={() => handleOpen(1)}>
          <AddIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  </Box>
  )
}

export default ButtonsCalculo
