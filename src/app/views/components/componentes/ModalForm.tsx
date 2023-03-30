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
import { COLOR } from "../../../styles/colors";

interface Props {
  children?: ReactNode;
  title: string;
  handleClose: Function;
}

const ModalForm = ({ children, title, handleClose }: Props) => {
  return (
    <div>
      <Dialog open={true} fullScreen >
        <Grid container paddingTop={1} sx={{ bgcolor: "#CCCCCC" }}>
          <Grid item xs={7} sm={10} md={10} lg={10} >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4" >
                {title}
              </Typography>
            </Box>
          </Grid>
          <Grid item  xs={1} sm={2} paddingBottom={1} >
            <Grid container alignItems="flex-end" direction="row"   justifyContent="flex-end" paddingRight={1}>
              <Button className="cerrar" variant="outlined" onClick={() => handleClose()} >
                <Tooltip title="Salir">
                  <IconButton aria-label="close" color="primary" onClick={() => handleClose()}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Button>
            </Grid>
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
