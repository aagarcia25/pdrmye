import React, { useEffect, useState } from 'react'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import ReactPlayer from 'react-player'


const ButtonsTutorial = ({
    url,
    route
}:{
    url: ReactNode;
    route: string;
}
) => {
    const [open, setOpen] = React.useState(false);
    const [videoFilePath, setVideoFilePath] = useState("");


    const handleClickOpen = () => {
      /*  let data = {
            TOKEN: JSON.parse(String(getToken())),
            RUTA: route,
            NOMBRE: url,
          };
        setVideoFilePath(getfilevideourl(data));*/
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  
     

    
  return (
    <div>
    <Tooltip title="Video Tutorial">
    <IconButton 
    onClick={handleClickOpen}
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

     <Dialog
     open={open}
     onClose={handleClose}
     maxWidth={"lg"}
     aria-labelledby="alert-dialog-title"
     aria-describedby="alert-dialog-description"
    >
     <DialogContent>
       <ReactPlayer 
       url={url}
       className='react-player'
       playing={true}
       width='100%'
       height='100%'
       controls = {true}
       />
     </DialogContent>
     </Dialog>
    </div>
  )
}

export default ButtonsTutorial
