import { Grid, Typography } from "@mui/material";

interface TituloProps {
  name: string;
}

export function Titulo(props: TituloProps) {
  return (
    <Grid item xs={8}>
      <Typography sx={{ mb: 3, fontWeight: "Bold" }}>{props.name}</Typography>
    </Grid>
  );
}
