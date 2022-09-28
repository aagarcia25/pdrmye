import { Grid, Input, Typography } from "@mui/material";

export function AnioReadOnly(){

    let year:number= new Date().getFullYear();

    return(<>
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontWeight: "Bold" }}>Año:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Input id="anio" readOnly defaultValue={year}></Input>
        </Grid>
        <Grid item xs={6}></Grid>
      </>
      );
}