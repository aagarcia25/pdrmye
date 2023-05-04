import React from 'react'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { IconButton, Tooltip } from '@mui/material';

const ButtonsTutorial = ({
    url,
    route
}:{
    url: string;
    route: string;
}
) => {
  return (
    <div>
    <Tooltip title="Video Tutorial">
    <IconButton 
     sx={[
     {
       "&:hover": {
         color: "#c4a57b",
       },
     },
      ]}>
     <OndemandVideoIcon />
     </IconButton>
     </Tooltip>
    </div>
  )
}

export default ButtonsTutorial
