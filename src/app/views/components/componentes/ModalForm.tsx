import React, { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

interface Props {
  children?: ReactNode;
  title: string;
  handleClose: Function;
}

const ModalForm = ({ children, title, handleClose }: Props) => {
  return (


    
    <div>
      <Dialog open={true} fullScreen >
        <Grid container paddingTop="2%" sx={{ bgcolor:"#CCCCCC" }}>
          <Grid item xs={7} sm={10} md={11} lg={11} >
            <Box sx={{ display: "flex", justifyContent: "center"}}>
              <Typography variant="h4" >
                {title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} paddingBottom="1%" >
            <Button variant="outlined" onClick={() => handleClose()}>
              <Tooltip title="Salir">
                <IconButton
                  aria-label="close"
                  color="error"
                  onClick={() => handleClose()}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Button>
          </Grid>
        </Grid>
        <DialogContent>
          <Box>{children}</Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalForm;
