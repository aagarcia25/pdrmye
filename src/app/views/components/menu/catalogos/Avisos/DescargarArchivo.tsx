
import React from 'react';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Button, ListItemButton } from '@mui/material';
import { OpenInBrowser } from '@mui/icons-material';






export default (props:any) => {
 // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  
  const navigate = useNavigate();

  return (
    
<ListItemButton  >

<BrowserUpdatedIcon />
</ListItemButton>
  
  );
};