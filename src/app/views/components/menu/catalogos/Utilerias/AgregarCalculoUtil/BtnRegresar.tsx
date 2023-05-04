import { Grid, ToggleButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BtnRegresarProps {
  onClick: any;
}

export function BtnRegresar(props: BtnRegresarProps) {
  return (


    <Grid item xs={12} sx={{ display: "flex", justifyContent: "start" }}>

      <Tooltip title="Regresar">
        <ToggleButton value="check" className="regresar"
          onClick={props.onClick} >
          <ArrowBackIcon />
        </ToggleButton>
      </Tooltip>

    </Grid>
  );
}
