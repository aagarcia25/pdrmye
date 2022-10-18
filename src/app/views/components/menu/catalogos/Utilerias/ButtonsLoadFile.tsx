import React from 'react'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const ButtonsLoadFile = ({
    handleOpen,
  }: {
    handleOpen: Function;
  }) => {
  return (
    <Box sx={{}}>
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        <Tooltip title="Subir Archivo">
          <ToggleButton value="check" onClick={() => handleOpen(1)}>
            <CloudUploadIcon />
          </ToggleButton>
        </Tooltip>

      </ToggleButtonGroup>
    </Box>
  )
}




export default ButtonsLoadFile
