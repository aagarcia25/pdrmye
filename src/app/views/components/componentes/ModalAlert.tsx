import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { AlertS } from "../../../helpers/AlertS";
import ModalForm from "./ModalForm";
import { getMunicipio, getUser } from "../../../services/localStorage";
import { MUNICIPIO, RESPONSE } from "../../../interfaces/user/UserInfo";
import Swal from "sweetalert2";

const ModalAlert = ({
  accion,
  open,
  tipo,
  handleClose,
  handleAccion,
  vrows,
}: {
  accion: number;
  open: boolean;
  tipo: string;
  handleClose: Function;
  handleAccion: Function;
  vrows: any;
}) => {

  const user: RESPONSE = JSON.parse(String(getUser()));

  const [mensaje, setMensaje] = useState<string>();
  const mun: MUNICIPIO[] = JSON.parse(String(getMunicipio()));
  const [nombreMun, setnombreMun] = useState("");

  const validacion = (est:string) => {
    if (mensaje === "" || mensaje === null) {
      AlertS.fire({
        title: "Error!",
        text: "Favor de llenar el campo Comentarios*",
        icon: "error",
      });
    } else {
      Swal.fire({
        icon: est==="DAMOP_REGRESADO"? "error":"success",
        title: "Enviar",
        text: est==="DAMOP_REGRESADO"? "Desea Regresar La Solicitud":"Desea Autorizar La Cuenta",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
              console.log({ data: vrows, texto: mensaje, tipo: accion },est);
              handleAccion({ data: vrows, texto: mensaje, tipo: accion },est)
      
        }
        if (result.isDenied) {
        }
    });

      
     
    }

  }
  useEffect(() => {

    mun?.map((item: MUNICIPIO) => {
      setnombreMun(item.Nombre);
    });



  }, []);



  return (
    <div>

      <ModalForm title={tipo} handleClose={handleClose}>
     
        <Grid container spacing={1}
          sx={{
            mt: "2vh",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
           <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography
                sx={{ textAlign: "center", fontFamily: "MontserratMedium", fontSize: "3vw", color: "#000000", }}>
                Municipio: {nombreMun}
              </Typography>
            </Grid>
          <Grid item xs={12}>
            <h3> Comentarios:</h3>
          </Grid>
          <Grid item xs={12}>
            <textarea
              required
              spellCheck="true"
              rows={5}
              onChange={(v) => setMensaje(v.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>

          {(user.DEPARTAMENTOS[0].NombreCorto === "MUN" && user.PERFILES[0].Referencia === "MUN") ?
            < Grid item xs={4} sm={3} md={2} lg={1}>
              <Button className="actualizar" onClick={() => validacion("DAMOP_REVISION")}>Enviar</Button>
            </Grid>
            : ""}
          {(user.DEPARTAMENTOS[0].NombreCorto === "DAMOP" && user.PERFILES[0].Referencia === "ANA") ?
            <>
              < Grid item xs={4} sm={3} md={3} lg={3}>
                <Button className="actualizar" onClick={() => validacion("DAMOP_AUTORIZADO")}>Autorizar</Button>
              </Grid>
              < Grid item xs={4} sm={3} md={3} lg={3}>
                <Button className="regresar" onClick={() => validacion("DAMOP_REGRESADO")}>Regresar</Button>
              </Grid>
            </>
            : ""}

        </Grid>


      </ModalForm>

    </div >
  );
};

export default ModalAlert;
