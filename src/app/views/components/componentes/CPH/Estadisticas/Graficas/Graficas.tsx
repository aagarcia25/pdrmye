import { Grid, Typography } from "@mui/material";

export const Graficas = () => {
  
  
   




  return (
    <div style={{ height: 600, width: "100%" }}>


      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography variant="h3">
           {"Graficas"}
          </Typography>
        </Grid>
      </Grid>

      <Grid container
        sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.8} sx={{ textAlign: "center" }}>
          <Typography variant="h3">
           {"Graficas"}
          </Typography>
        </Grid>        
        <Grid item xs={2.8} sx={{ textAlign: "center" }}>
          <Typography variant="h3">
           {"Graficas"}
          </Typography>
        </Grid>        
        <Grid item xs={2.8} sx={{ textAlign: "center" }}>
          <Typography variant="h3">
           {"Graficas"}
          </Typography>
        </Grid>        
        <Grid item xs={2.88} sx={{ textAlign: "center" }}>
          <Typography variant="h3">
           {"Graficas"}
          </Typography>
        </Grid>
      </Grid>

     
     
     
    </div>
  );
};
