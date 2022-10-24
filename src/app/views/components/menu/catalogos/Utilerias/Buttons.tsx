import { Box, ToggleButtonGroup, Tooltip, ToggleButton, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const Buttons = ({
  handleOpen,
  url,
  handleUpload,
}: {
  handleOpen: Function;
  url: string;
  handleUpload:Function;
}) => {

  
  useEffect(() => {
  
    
   
  }, []);



  return (
    <Box sx={{alignItems: "center",}}>
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        <Tooltip title="Descargar Plantilla">
          <ToggleButton value="check" color="primary">
          <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
            <a href={url}>
              <ArrowDownwardIcon />
            </a>
            </IconButton>
          </ToggleButton>
        </Tooltip>

        <Tooltip title="Cargar Plantilla">
          <ToggleButton value="check">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="*" type="file" value="" onChange={(v) =>handleUpload(v)} />
              <DriveFolderUploadIcon />
            </IconButton>
          </ToggleButton>
        </Tooltip>
        
      </ToggleButtonGroup>
    </Box>
  );
};

export default Buttons;
