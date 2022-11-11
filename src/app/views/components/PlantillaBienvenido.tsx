import * as React from "react";
import {Grid} from "@mui/material";

import logo from "../../assets/img/logopalacio.svg";
import { blue } from "@mui/material/colors";
interface UserProps{
  name: string;
  lastConnnection: string;
  id:any;
  children?: React.ReactNode;
}

export default function PlantillaBienvenido(props: UserProps) {

 

  return (
   
    <Grid container sm={12}>
          <Grid item sm={12} md={2}></Grid>
          <Grid item sm={12} md={8}  >
           <img src={logo}  style={{
                        alignContent:"center",
                        marginTop:"5%",
                        width: "100%",
                        height: "40rem",
                        objectFit: "fill",
                      }}></img>
           <Grid item sm={12} md={2}></Grid>
          </Grid>
    </Grid>
  );
}
