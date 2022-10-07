import React, { useState } from "react";

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

const Trazabilidad = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: Function;
}) => {
  const [openSlider, setOpenSlider] = useState(false);

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


                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      10:00 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Code</TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      12:00 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Sleep</TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent color="text.secondary">
                      9:00 am
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Repeat</TimelineContent>
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
