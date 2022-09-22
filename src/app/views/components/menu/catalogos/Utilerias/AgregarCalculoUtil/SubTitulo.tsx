import { Grid, Typography } from "@mui/material";

export function SubTitulo() {
  return (
    <Grid item xs={12} sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
      <Typography sx={{  fontWeight: "Bold" }}>
        Ingrese año y mes de carga
      </Typography>
    </Grid>
  );
}
