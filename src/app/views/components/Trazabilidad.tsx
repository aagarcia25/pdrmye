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
import { Toast } from "../../helpers/Toast";
import { calculosServices } from "../../services/calculosServices";
import { Alert } from "../../helpers/Alert";
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
  const [openSlider, setOpenSlider] = useState(false);
  const [data, setdata] = useState<Itrazabilidad[]>([]);

  const consulta = () => {
    setOpenSlider(true);
    let data = {
      CHID: id,
    };
    calculosServices.trazabilidad(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });

        const obj: Itrazabilidad[] = res.RESPONSE;
        setdata(obj);
        setOpenSlider(false);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        setOpenSlider(false);
      }
    });
  };

  useEffect(() => {
    console.log(id);
    consulta();
  }, [id]);

  return (
    <div>
      <Slider open={openSlider}></Slider>
      <Box>
        <Dialog open={open} fullWidth={open}>
          <DialogTitle>Trazabilidad</DialogTitle>
          <DialogContent>

          <Timeline position="alternate">
            {data.map((it) => {
              return (
              
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                    {it.FechaCreacion}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
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

export default Trazabilidad;
