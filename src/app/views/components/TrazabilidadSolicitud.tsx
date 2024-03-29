import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Tooltip,
  Typography
} from "@mui/material";
import { Itrazabilidad } from "../../interfaces/calculos/Itrazabilidad";
import { calculosServices } from "../../services/calculosServices";
import Slider from "./Slider";

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
    <>
      <Slider open={openSlider}></Slider>
      <Dialog open={open} fullWidth
        scroll={"paper"}>
      
          <Grid item container justifyContent="space-between" xs={11.7} >
            <Grid item xs={6} sm={11} md={11} lg={11} >
            <Typography variant="h4" >Trazabilidad</Typography>
            {/* <DialogTitle>Trazabilidad</DialogTitle> */}
            </Grid>
            <Grid item xs={2.3} sm={1} md={1} lg={1}  >
                <Tooltip title="Salir">
                  <Button variant="contained" className="cerrar" aria-label="close" color="error" onClick={() => handleClose()}>
                    <CloseIcon />
                  </Button>
                </Tooltip>
            </Grid>
          </Grid>
          <DialogContent dividers={true}>
            <Grid container justifyContent="space-evenly" >
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
                        <br></br>
                        {it.Comentario ?
                          <Typography>COMENTARIO: {it.Comentario}</Typography>
                          : ""}
                      </TimelineContent>
                    </TimelineItem>

                  );
                })}

              </Timeline>
            </Grid>
          </DialogContent>


      </Dialog>

    </>
  );
};

export default TrazabilidadSolicitud;
