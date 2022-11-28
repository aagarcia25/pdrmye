import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import { ParametroServices } from "../../../../../services/ParametroServices";
import ModalForm from "../../../componentes/ModalForm";

export const ParametrosGeneralesModal = ({
  open,
  modo,
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
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [slug, setSlug] = useState("");


  const user: RESPONSE = JSON.parse(String(getUser()));

  const handleSend = () => {
    if (nombre === "" || valor === "" || slug=== ""|| descripcion==="") {
      AlertS.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "warning",
      });
    } else {
      let data = {
        CHID:id,
        NUMOPERACION: tipo,
        NOMBRE: nombre,
        VALOR: valor,
        DESCRIPCION: descripcion,
        SLUG: slug,
      };
      handleRequest(data);
      handleClose();
    }
  };

  const handleRequest = (data: any) => {
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR
      editar(data);
    }
  };

  const agregar = (data: any) => {
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
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
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
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
    } else {
      //SE PINTAN LOS CAMPOS
      setId(dt?.row?.id);
      setNombre(dt?.row?.Nombre);
      setValor(dt?.row?.Valor);
      setDescripcion(dt?.row?.Descripcion);
      setSlug(dt?.row?.slug);
    }
  }, [dt]);

  return (

    <ModalForm title={modo} handleClose={handleClose}>

        <Box>
    
            <Container maxWidth="sm">
                <TextField
            required
            margin="dense"
            id="Nombre"
            label="Nombre"
            value={nombre}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setNombre(v.target.value)}
            error={!nombre ? true : false}
            inputProps={{maxLength: 50,}}
          />
          <TextField
            required
            margin="dense"
            id="Valor"
            label="Valor"
            value={valor}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setValor(v.target.value)}
            error={!valor ? true : false}
            inputProps={{maxLength: 100,}}
            
          />
            <TextField
            required
            margin="dense"
            id="slug"
            label="Referencia"
            value={slug}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setSlug(v.target.value)}
            error={!slug ? true : false}
            inputProps={{maxLength: 100,}}
            
          />
            <TextField
            required
            margin="dense"
            id="Descripcion"
            label="Descripcion"
            value={descripcion}
            type="text"
            fullWidth
            variant="standard"
            onChange={(v) => setDescripcion(v.target.value)}
            error={!descripcion ? true : false}
            inputProps={{maxLength: 200,}}
            
          />
            </Container>



          
        </Box>

        <Grid container
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Grid item xs={4} sm={3} md={2} lg={1}
            >
              <Button className={tipo===1?"guardar":"actualizar"} onClick={() => handleSend()}>{tipo===1?"Guardar":"Actualizar"}</Button>
            </Grid>
          </Grid>
   

    </ModalForm>
   
  );
};
