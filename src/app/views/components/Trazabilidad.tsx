import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  Timeline,
} from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";

import Slider from "./Slider";
import { calculosServices } from "../../services/calculosServices";
import { Itrazabilidad } from "../../interfaces/calculos/Itrazabilidad";

const Trazabilidad = ({
  id,
  open,
  handleClose,
}: {
  id: string;
  open: boolean;
  handleClose: Function;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [data, setdata] = useState<Itrazabilidad[]>([]);

  const consulta = () => {

    let data = {
      CHID: id,
    };
    calculosServices.trazabilidad(data).then((res) => {
      if (res.SUCCESS) {
        const obj: Itrazabilidad[] = res.RESPONSE;
        setdata(obj);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
      }
    });
  };

  useEffect(() => {
    consulta();
  }, [id]);

  return (
    <div>

      <Box>
        <Dialog open={open} fullWidth={open}
          scroll={"paper"}>
          <Slider open={openSlider}></Slider>
          <Grid container xs={12}  direction="row"  justifyContent="space-between" alignItems="flex-start" >
            <Grid item xs={6}>
            <DialogTitle>Trazabilidad</DialogTitle>
            </Grid>
            <Grid item xs={6} container alignContent="rigth"   justifyContent="flex-end" alignItems="center">
            <Button variant="contained" color="error" onClick={() => handleClose()}>
              <Tooltip title="Salir">
                <IconButton aria-label="close" color="primary" onClick={() => handleClose()}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Button>
            </Grid>
          </Grid>

          <DialogContent dividers={true}>

            <Timeline position="alternate">
              {data.map((it) => {
                return (

                  <TimelineItem key={Math.random()}>
                    <TimelineOppositeContent key={Math.random()}>
                      {it.FechaCreacion}
                    </TimelineOppositeContent>
                    <TimelineSeparator key={Math.random()}>
                      <TimelineDot color="success" />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }} key={Math.random()}>
                      <Typography variant="h6" component="span">
                        {it.Nombre}
                      </Typography>
                      <Typography>{it.Descripcion}</Typography>
                      <Typography>{it.Comentario}</Typography>
                    </TimelineContent>
                  </TimelineItem>

                );
              })}

            </Timeline>
          </DialogContent>

          <DialogActions>

          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default Trazabilidad;
