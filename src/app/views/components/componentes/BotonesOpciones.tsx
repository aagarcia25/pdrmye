import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import InsightsIcon from "@mui/icons-material/Insights";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
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
  perfil
}: {
  estatus: string,
  handleAccion: Function;
  autorizar: boolean;
  cancelar: boolean;
  verTrazabilidad: boolean;
  enviar: boolean;
  presupuesto: boolean;
  perfil: string;
}) => {
  const user: RESPONSE = JSON.parse(String(getUser()));
  console.log(user.PERFILES[0].Referencia);
  return (
    <div>
      <Box sx={{}}>
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
          <Tooltip title="Regresar">
            <ToggleButton value="check" onClick={() => handleAccion(1)}>
              <ArrowBackIcon />
            </ToggleButton>
          </Tooltip>

          {
           (autorizar  && estatus=="INICIO"  && user.PERFILES[0].Referencia=="ANA" )
           || 
           (autorizar  && estatus=="ENVIADO" && user.PERFILES[0].Referencia=="COOR" ) 
           ||  
           (autorizar  && estatus=="ENVIADO" && user.PERFILES[0].Referencia=="DIR" )
           
           ? (
            <Tooltip title="Autorizar">
              <ToggleButton value="check" onClick={() => handleAccion(2)}>
                <DoneAllIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}
          {
          (cancelar && estatus=="INICIO"  && user.PERFILES[0].Referencia=="ANA")
         
          ? (
            <Tooltip title="Cancelar">
              <ToggleButton value="check" onClick={() => handleAccion(3)}>
                <CancelPresentationIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

        {
          (cancelar && estatus=="ENVIADO" && user.PERFILES[0].Referencia=="COOR" ) 
          ? (
            <Tooltip title="Regresar a Analista">
              <ToggleButton value="check" onClick={() => handleAccion(7)}>
                <CompareArrowsIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

        {
          (cancelar && estatus=="ENVIADO" && user.PERFILES[0].Referencia=="DIR" ) 
          ? (
            <Tooltip title="Regresar a Coordinador">
              <ToggleButton value="check" onClick={() => handleAccion(8)}>
                <CompareArrowsIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}


          {
          (enviar && estatus=="AUTORIZADO" && user.PERFILES[0].Referencia=="ANA") 
          || 
          (enviar && estatus=="AUTORIZADO" && user.PERFILES[0].Referencia=="COOR") 
          ||
          (enviar && estatus=="AUTORIZADO" && user.PERFILES[0].Referencia=="DIR") 
          ? (
            <Tooltip title="Enviar">
              <ToggleButton value="check" onClick={() => handleAccion(4)}>
                <SendIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}
          {verTrazabilidad ? (
            <Tooltip title="Ver Trazabilidad">
              <ToggleButton value="check" onClick={() => handleAccion(5)}>
                <InsightsIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}

          {(presupuesto && estatus=="PRESUPUESTO"   )? (
            <Tooltip title="Asignar Presupuesto Global">
              <ToggleButton value="check" onClick={() => handleAccion(6)}>
              <AttachMoneyIcon />
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
