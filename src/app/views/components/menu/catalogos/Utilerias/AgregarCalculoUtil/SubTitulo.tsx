import { Grid, Typography } from "@mui/material";

export function SubTitulo() {
  return (
    <Grid item xs={12} sx={{ mb: 5, display: "flex", justifyContent: "start" }}>
      <Typography sx={{ ml: 20, fontWeight: "Bold" }}>
        Ingrese año y mes de carga
      </Typography>
    </Grid>
  );
}
