import { Box, ToggleButtonGroup, Tooltip, ToggleButton, IconButton } from '@mui/material';
import React from 'react'
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";


const ButtonsCalculo = ({
    handleOpen,
    url,
    handleUpload,
  }: {
    handleOpen: Function;
    url: string;
    handleUpload:Function;
  }) => {
  return (
    <Box sx={{}}>
    <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
      <Tooltip title="Agregar Registro">
        <ToggleButton value="check" onClick={() => handleOpen(1)}>
          <AddIcon />
        </ToggleButton>
      </Tooltip>

      <Tooltip title="Descargar Plantilla">
        <ToggleButton value="check">
          <a href={url}>
            <ArrowDownwardIcon />
          </a>
        </ToggleButton>
      </Tooltip>

      <Tooltip title="Cargar Plantilla">
        <ToggleButton value="check">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="*" type="file" onChange={(v) =>handleUpload(v)} />
            <DriveFolderUploadIcon />
          </IconButton>
        </ToggleButton>
      </Tooltip>


      
    </ToggleButtonGroup>
  </Box>
  )
}

export default ButtonsCalculo
