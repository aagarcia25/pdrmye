import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import InsightsIcon from "@mui/icons-material/Insights";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import EastIcon from "@mui/icons-material/East";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";

const BotonesOpciones = ({
  estatus,
  handleAccion,
  autorizar,
  cancelar,
  verTrazabilidad,
  enviar,
  presupuesto,
  perfil,
  area,
}: {
  estatus: string;
  handleAccion: Function;
  autorizar: boolean;
  cancelar: boolean;
  verTrazabilidad: boolean;
  enviar: boolean;
  presupuesto: boolean;
  perfil: string;
  area: string;
}) => {
  const user: RESPONSE = JSON.parse(String(getUser()));
  //console.log("PERFIL DEL USUARIO" + user.PERFILES[0].Referencia);
  //console.log("DEPARTAMENTO DEL USUARIO" + user.DEPARTAMENTOS[0].NombreCorto);

  //console.log("PERFIL DONDE SE ENCUENTRA EL CALCULO" + perfil);
  //console.log("AREA DONDE SE ENCUENTRA EL CALCULO" + area);

  return (
    <div>
      <Box>
        <ToggleButtonGroup>
          <Tooltip title={"Regresar"}>
            <ToggleButton value="check" onClick={() => handleAccion(1)}>
              <ArrowBackIcon />
            </ToggleButton>
          </Tooltip>

          {verTrazabilidad ? (
            <Tooltip title={"Ver Trazabilidad"}>
              <ToggleButton value="check" onClick={() => handleAccion(5)}>
                <InsightsIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {(autorizar 
           &&             estatus == "INICIO" 
           &&     user.PERFILES[0].Referencia == perfil) ||
         
           (autorizar &&
            estatus == "ENVIADO" &&
            user.PERFILES[0].Referencia == perfil &&
            area == user.DEPARTAMENTOS[0].NombreCorto) ? (
            <Tooltip title={"Autorizar"}>
              <ToggleButton value="check" onClick={() => handleAccion(2)}>
                <DoneAllIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {cancelar &&
          estatus == "INICIO" &&
          user.PERFILES[0].Referencia == "ANA" ? (
            <Tooltip title={"Cancelar"}>
              <ToggleButton value="check" onClick={() => handleAccion(3)}>
                <CancelPresentationIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {cancelar &&
          estatus == "ENVIADO" &&
          user.PERFILES[0].Referencia == perfil &&
          perfil == "COOR" &&
          area == user.DEPARTAMENTOS[0].NombreCorto ? (
            <Tooltip title={"Regresar a Analista"}>
              <ToggleButton value="check" onClick={() => handleAccion(7)}>
                <CompareArrowsIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {cancelar &&
          estatus == "ENVIADO" &&
          user.PERFILES[0].Referencia == perfil &&
          perfil == "DIR" ? (
            <Tooltip title={"Regresar a Coordinador"}>
              <ToggleButton value="check" onClick={() => handleAccion(8)}>
                <CompareArrowsIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {(enviar &&
            estatus == "AUTORIZADO" &&
            user.PERFILES[0].Referencia == perfil) ||
          (enviar &&
            estatus == "AUTORIZADO" &&
            user.PERFILES[0].Referencia == perfil) ||
          (enviar &&
            estatus == "AUTORIZADO" &&
            user.PERFILES[0].Referencia == perfil) ? (
            <Tooltip title={"Enviar"}>
              <ToggleButton value="check" onClick={() => handleAccion(4)}>
                <SendIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {presupuesto &&
          estatus == "ENVIADO" &&
          area == user.DEPARTAMENTOS[0].NombreCorto &&
          user.PERFILES[0].Referencia == perfil ? (
            <Tooltip title={"Asignar Presupuesto Global"}>
              <ToggleButton value="check" onClick={() => handleAccion(6)}>
                <AttachMoneyIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {presupuesto &&
          estatus == "ENVIADO" &&
          area == user.DEPARTAMENTOS[0].NombreCorto &&
          user.PERFILES[0].Referencia == perfil ? (
            <Tooltip title={"Finalizar"}>
              <ToggleButton value="check" onClick={() => handleAccion(9)}>
                <EastIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}
        </ToggleButtonGroup>
      </Box>
    </div>
  );
};

export default BotonesOpciones;
