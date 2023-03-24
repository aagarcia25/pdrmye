import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  Grid,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";

export const CATORGModal = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  modo: string;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ClavePSIREGOB, setClavePSIREGOB] = useState("");
  const [ClaveDSIREGOB, setClaveDSIREGOB] = useState("");  
  const [Clasificador01, setClasificador01] = useState("");
  const [Clasificador02, setClasificador02] = useState("");
  const [Clasificador03, setClasificador03] = useState("");
  const [Clasificador04, setClasificador04] = useState("");
  const [Clasificador05, setClasificador05] = useState("");
  const [Clasificador06, setClasificador06] = useState("");
  const [Clasificador07, setClasificador07] = useState("");
  const [Clasificador08, setClasificador08] = useState("");
  const [Clasificador09, setClasificador09] = useState("");
  const [Clasificador10, setClasificador10] = useState("");
  const [Clasificador11, setClasificador11] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));


  const handleSend = () => {
    if  (!descripcion /*|| !ClavePSIREGOB || !ClaveDSIREGOB 
      || !Clasificador01 
      || !Clasificador01 || !Clasificador02 || !Clasificador03 || !Clasificador04 
      || !Clasificador05 || !Clasificador06 || !Clasificador07 || !Clasificador08
      || !Clasificador09 || !Clasificador10 || !Clasificador11*/
      ) {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.id,
        NOMBRE: descripcion,
      };

      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    //console.log(data);
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR

      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.OrganismosIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });

      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.OrganismosIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (dt === "") {
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
      setDescripcion(dt?.row?.Descripcion);
    }
  }, [dt]);

  return (


    <>
      <ModalForm title={tipo === 1 ? "Agregar Registro" : "Editar Registro"} handleClose={handleClose} >
        <Box boxShadow={3}>
        <Grid container direction="row" justifyContent="center" alignItems="center"  sx={{ padding:"2%" }}  >
        <Grid item alignItems="center" justifyContent="center" xs={4}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={4}>

            <TextField
              required
              margin="dense"
              id="Descripcion"
              label="Descripción"
              value={descripcion}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setDescripcion(v.target.value)}
              error={descripcion === "" ? true : false}
              inputProps={{ maxLength: 500 }}
            />

            <TextField
              required
              margin="dense"
              id="ClavePSIREGOB"
              label="Clave Proveedor"
              value={ClavePSIREGOB}
              type="text"
              fullWidth
              variant="standard"
              onChange={(v) => setClavePSIREGOB(v.target.value)}
              error={ClavePSIREGOB === "" ? true : false}
              inputProps={{ maxLength: 10 }}
            />

              

          </Grid>
          <Grid item alignItems="center" justifyContent="center" xs={4}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={12} height={40}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={5}></Grid>
          <Grid item alignItems="center" justifyContent="center" xs={2}>
            <button  className={tipo === 1 ? "guardar" : "actualizar"}  onClick={() => handleSend()} >
              {tipo === 1 ? "Agregar" : "Editar"}
            </button>
          </Grid>

        </Grid>
        </Box>
      </ModalForm>
    </>
  );

};
