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
} from "@mui/material";

import Slider from "./Slider";
import { Toast } from "../../helpers/Toast";
import { calculosServices } from "../../services/calculosServices";
import { Alert } from "../../helpers/Alert";

const Trazabilidad = ({
  id,
  open,
  handleClose,
}: {
  id:string;
  open: boolean;
  handleClose: Function;
}) => {
  const [openSlider, setOpenSlider] = useState(false);
  const [data, setdata] = useState([]);

  const consulta = () => {
    setOpenSlider(true);
    let data={
      CHID:id
    }
    calculosServices.trazabilidad(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setdata(res.RESPONSE);
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
        <Dialog 
        open={open}
        fullWidth={open}
        >
          <DialogTitle>Trazabilidad</DialogTitle>
          <DialogContent>
           
             

             <Timeline position="alternate">


                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      09:30 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Eat</TimelineContent>
                  </TimelineItem>

                
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
