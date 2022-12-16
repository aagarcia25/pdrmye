import { Grid, Typography } from "@mui/material";

interface TituloProps {
  name: string;
}

export function Titulo(props: TituloProps) {
  return (
  
      <label className="titulo-FPG" >
        <Typography variant="h4">{props.name}</Typography>
        </label>
  
  );
}
