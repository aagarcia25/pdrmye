import PanoramaIcon from '@mui/icons-material/Panorama';
import React, { useState } from 'react';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Box, Button, IconButton, ListItemButton } from '@mui/material';
import { OpenInBrowser } from '@mui/icons-material';






 export const Verevento = () => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = (v: any) => {
  
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
  
  return (         
         
    

  
          
           
    <IconButton >
      <PanoramaIcon />
    </IconButton>

   
     
  
  
  
  );

  
};

