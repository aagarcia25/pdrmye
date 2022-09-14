import { Grid, IconButton } from "@mui/material";
import { COLOR } from "../../../../../../styles/colors";
import CalculateIcon from "@mui/icons-material/Calculate";

interface BtnCalcularProps{
    onClick:any;
}

export function BtnCalcular(props:BtnCalcularProps) {
  return (
    <Grid item xs={3} sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <IconButton
      onClick={props.onClick}
        sx={{
          borderRadius: 1,
          border: 1,
          bgcolor: COLOR.negro,
          color: COLOR.blanco,
          "&:hover": {
            bgcolor: COLOR.grisTarjetaBienvenido,
            color: COLOR.negro,
          },
        }}
      >
        <CalculateIcon />
        Calcular
      </IconButton>
    </Grid>
  );
}
