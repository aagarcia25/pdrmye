import { Grid, Typography } from "@mui/material";

interface TituloProps {
  name: string;
}

export function Titulo(props: TituloProps) {
  return (
  
      <label className="titulo-FPG"><h2>{props.name}</h2></label>
  
  );
}
