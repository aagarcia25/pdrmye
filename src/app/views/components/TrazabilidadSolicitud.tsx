import React, { useEffect, useState } from "react";

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
} from "@mui/material";

import Slider from "./Slider";
import { calculosServices } from "../../services/calculosServices";
import { Itrazabilidad } from "../../interfaces/calculos/Itrazabilidad";

const TrazabilidadSolicitud = ({
  dt,
  open,
  handleClose,
}: {
  dt: any;
  open: boolean;
  handleClose: Function;
}) => {
  const [openSlider, setOpenSlider] = useState(true);
  const [data, setdata] = useState<Itrazabilidad[]>([]);

  const consulta = () => {
    calculosServices.trazabilidadSolicitud(dt).then((res) => {
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
  }, [dt]);

  return (
    <div>
     
      <Box>
        <Dialog open={open} fullWidth={open}
        scroll={"paper"}>
        <Slider open={openSlider}></Slider>
          <DialogTitle>Trazabilidad</DialogTitle>
          <DialogContent dividers={true}>

          <Timeline position="alternate">
            {data.map((it) => {
              return (
              
                  <TimelineItem key={Math.random()}>
                    <TimelineOppositeContent  key={Math.random()}>
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
            <Button onClick={() => handleClose()}>Salir</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default TrazabilidadSolicitud;
