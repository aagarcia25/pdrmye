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
import { COLOR } from "../../styles/colors";

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
        <Dialog open={open} fullWidth={open} scroll={"paper"}>
          <Slider open={openSlider}></Slider>
          <Grid container xs={12} direction="row" justifyContent="space-between" alignItems="flex-start" >
            <Grid item xs={6} container
              direction="row"
              justifyContent="center"
              alignItems="center"
              >
              <Typography paddingTop={.5} variant="h5">Trazabilidad</Typography>
            </Grid>
            <Grid item xs={6} container alignContent="center" justifyContent="flex-end" alignItems="flex-start" >
              {/* <DialogTitle>     */}
              <Tooltip title="Salir">
                <IconButton aria-label="cerrar" color="primary" onClick={() => handleClose()}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              {/* </DialogTitle> */}


            </Grid>
          </Grid>

          <DialogContent dividers={true}>

            <Timeline position="alternate">
              {data.map((it) => {
                return (

                  <TimelineItem key={Math.random()}>
                    <TimelineOppositeContent key={Math.random()}>
                      <Typography variant="body2" component="span">
                        {it.FechaCreacion}
                      </Typography>
                    </TimelineOppositeContent>

                    <TimelineSeparator key={Math.random()}>
                      <TimelineDot sx={{ bgcolor: 'rgb(175, 140, 85)' }} />
                      <TimelineConnector />
                    </TimelineSeparator>

                    <TimelineContent sx={{ py: "12px", px: 2 }} key={Math.random()}>
                      <Typography variant="h6" component="span">
                        {it.Nombre}
                      </Typography>
                      <br />
                      <Typography variant="body2" component="span">
                        {it.Descripcion}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {it.Comentario}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>

                );
              })}

            </Timeline>
          </DialogContent>


        </Dialog>
      </Box>
    </div>
  );
};

export default Trazabilidad;
