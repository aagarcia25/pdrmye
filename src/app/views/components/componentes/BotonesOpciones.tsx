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

const BotonesOpciones = ({
  estatus,
  handleAccion,
  autorizar,
  cancelar,
  verTrazabilidad,
  enviar,
  presupuesto,
}: {
  estatus: string,
  handleAccion: Function;
  autorizar: boolean;
  cancelar: boolean;
  verTrazabilidad: boolean;
  enviar: boolean;
  presupuesto: boolean;
}) => {
  return (
    <div>
      <Box sx={{}}>
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
          <Tooltip title="Regresar">
            <ToggleButton value="check" onClick={() => handleAccion(1)}>
              <ArrowBackIcon />
            </ToggleButton>
          </Tooltip>

          {autorizar  && estatus=="INICIO" ? (
            <Tooltip title="Autorizar">
              <ToggleButton value="check" onClick={() => handleAccion(2)}>
                <DoneAllIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}
          {cancelar && estatus=="INICIO" ? (
            <Tooltip title="Cancelar">
              <ToggleButton value="check" onClick={() => handleAccion(3)}>
                <CancelPresentationIcon />
              </ToggleButton>
            </Tooltip>
          ) : (
            ""
          )}
          {enviar && estatus=="AUTORIZADO" ? (
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

          {presupuesto && estatus=="PRESUPUESTO"? (
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
