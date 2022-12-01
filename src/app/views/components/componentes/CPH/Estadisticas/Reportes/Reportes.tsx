import { Grid, Typography } from "@mui/material";


export const Reportes = () => {



  return (
    <div style={{ height: 600, width: "100%" }}>


      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography variant="h3">
           {"Reportes"}
          </Typography>
        </Grid>
      </Grid>


     
    </div>
  );
};
