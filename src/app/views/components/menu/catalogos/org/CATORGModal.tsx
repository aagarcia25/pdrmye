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
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
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
  const [Descripcion, setDescripcion] = useState("");
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
  const user: USUARIORESPONSE= JSON.parse(String(getUser()));


  const handleSend = () => {
    if (!Descripcion || !ClavePSIREGOB || !ClaveDSIREGOB /*
      || !Clasificador01 
      || !Clasificador01 || !Clasificador02 || !Clasificador03 || !Clasificador04 
      || !Clasificador05 || !Clasificador06 || !Clasificador07 || !Clasificador08
      || !Clasificador09 || !Clasificador10 || !Clasificador11*/
    ) {
      AlertS.fire({
        title: "¡Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipo,
        CHID: id,
        CHUSER: user.Id,
        DESCRIPCION: Descripcion,
        ClavePSIREGOB: ClavePSIREGOB,
        ClaveDSIREGOB: ClaveDSIREGOB,
        CLASIFICADOR01: Clasificador01,
        CLASIFICADOR02: Clasificador02,
        CLASIFICADOR03: Clasificador03,
        CLASIFICADOR04: Clasificador04,
        CLASIFICADOR05: Clasificador05,
        CLASIFICADOR06: Clasificador06,
        CLASIFICADOR07: Clasificador07,
        CLASIFICADOR08: Clasificador08,
        CLASIFICADOR09: Clasificador09,
        CLASIFICADOR10: Clasificador10,
        CLASIFICADOR11: Clasificador11,
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
          title: "¡Registro Agregado!",
        });

      } else {
        AlertS.fire({
          title: "¡Error!",
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
          title: "¡Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "¡Error!",
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
      setClavePSIREGOB(dt?.row?.ClavePSIREGOB);
      setClaveDSIREGOB(dt?.row?.ClaveDSIREGOB);
      setClasificador01(dt?.row?.Clasificador01);
      setClasificador02(dt?.row?.Clasificador02);
      setClasificador03(dt?.row?.Clasificador03);
      setClasificador04(dt?.row?.Clasificador04);
      setClasificador05(dt?.row?.Clasificador05);
      setClasificador06(dt?.row?.Clasificador06);
      setClasificador07(dt?.row?.Clasificador07);
      setClasificador08(dt?.row?.Clasificador08);
      setClasificador09(dt?.row?.Clasificador09);
      setClasificador10(dt?.row?.Clasificador10);
      setClasificador11(dt?.row?.Clasificador11);
    }
  }, [dt]);

  return (
      <ModalForm title={tipo === 1 ? "Agregar Registro" : "Editar Registro"} handleClose={handleClose} >
        <Box boxShadow={3}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: "2%" }}  >

            <Grid item alignItems="center" justifyContent="center" xs={5.8}>

            <TextField
                required
                margin="dense"
                id="Descripcion"
                label="Descripción"
                value={Descripcion}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setDescripcion(v.target.value)}
                error={!Descripcion}
                inputProps={{ maxLength: 500 }}
              />

              <TextField
                
                margin="dense"
                id="ClavePSIREGOB"
                label="Clave Proveedor"
                value={ClavePSIREGOB}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClavePSIREGOB(v.target.value)}
                error={!ClavePSIREGOB}
                inputProps={{ maxLength: 10 }}
              />

              <TextField
                
                margin="dense"
                id="ClaveDSIREGOB"
                label="Clave Deudor"
                value={ClaveDSIREGOB}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClaveDSIREGOB(v.target.value)}
                error={!ClaveDSIREGOB }
                inputProps={{ maxLength: 10 }}
              />

              <TextField
                
                margin="dense"
                id="Clasificador01"
                label="Clasificador01"
                value={Clasificador01}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador01(v.target.value)}
                error={Clasificador01 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                
                margin="dense"
                id="Clasificador02"
                label="Clasificador02"
                value={Clasificador02}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador02(v.target.value)}
                error={Clasificador02 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                
                margin="dense"
                id="Clasificador03"
                label="Clasificador03"
                value={Clasificador03}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador03(v.target.value)}
                error={Clasificador03 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                
                margin="dense"
                id="Clasificador04"
                label="Clasificador04"
                value={Clasificador04}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador04(v.target.value)}
                error={Clasificador04 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />


            </Grid>


            <Grid item alignItems="center" justifyContent="center" xs={5.8}>

              

              <TextField
                required
                margin="dense"
                id="Clasificador05"
                label="Clasificador05"
                value={Clasificador05}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador05(v.target.value)}
                error={Clasificador05 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                required
                margin="dense"
                id="Clasificador06"
                label="Clasificador06"
                value={Clasificador06}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador06(v.target.value)}
                error={Clasificador06 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                required
                margin="dense"
                id="Clasificador07"
                label="Clasificador07"
                value={Clasificador07}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador07(v.target.value)}
                error={Clasificador07 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                required
                margin="dense"
                id="Clasificador08"
                label="Clasificador08"
                value={Clasificador08}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador08(v.target.value)}
                error={Clasificador08 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                required
                margin="dense"
                id="Clasificador09"
                label="Clasificador09"
                value={Clasificador09}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador09(v.target.value)}
                error={Clasificador09 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                required
                margin="dense"
                id="Clasificador10"
                label="Clasificador10"
                value={Clasificador10}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador10(v.target.value)}
                error={Clasificador10 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />

              <TextField
                required
                margin="dense"
                id="Clasificador11"
                label="Clasificador11"
                value={Clasificador11}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setClasificador11(v.target.value)}
                error={Clasificador11 === "" ? true : false}
                inputProps={{ maxLength: 50 }}
              />



            </Grid>


            <Grid item alignItems="center" justifyContent="center" xs={4}></Grid>
            <Grid item alignItems="center" justifyContent="center" xs={12} height={40}></Grid>
            <Grid item alignItems="center" justifyContent="center" xs={5}></Grid>
            <Grid item alignItems="center" justifyContent="center" xs={2}>
              <button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()} >
                {tipo === 1 ? "Agregar" : "Editar"}
              </button>
            </Grid>

          </Grid>
        </Box>
      </ModalForm>
  );

};
