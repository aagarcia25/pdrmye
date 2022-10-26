import * as React from "react";
import {Grid} from "@mui/material";

import logo from "../../assets/img/logopalacio.svg";
interface UserProps{
  name: string;
  lastConnnection: string;
  id:any;
  children?: React.ReactNode;
}

export default function PlantillaBienvenido(props: UserProps) {

 

  return (
   
    <Grid container spacing={1} >
          <Grid item xs={12} sm={12} md={12} >
           <img src={logo}  style={{
                        width: "60vw",
                        height: "60vh",
                        objectFit: "fill",
                      }}></img>
          </Grid>
        
    </Grid>
  );
}
