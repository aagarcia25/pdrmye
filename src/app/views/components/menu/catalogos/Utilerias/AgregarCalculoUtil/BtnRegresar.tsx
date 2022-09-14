import { Button, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

interface BtnRegresarProps {
  onClick: any;
}

export function BtnRegresar(props: BtnRegresarProps) {
  return (
    <Grid item xs={12} sx={{ display: "flex", justifyContent: "start" }}>
      <Button
        onClick={props.onClick}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
      >
        Regresar
      </Button>
    </Grid>
  );
}
