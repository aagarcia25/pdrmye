import { Box, IconButton, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from '@mui/icons-material/Send';
import InsightsIcon from '@mui/icons-material/Insights';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ParametroServices } from "../../../services/ParametroServices";
import { permisosc } from "../../../share/loadPermisos";

const BotonesOpciones = ({
    handleAccion,
    autorizar,
    cancelar,
    verTrazabilidad,
    enviar

}: {
    handleAccion: Function;
    autorizar: boolean;
    cancelar: boolean;
    verTrazabilidad: boolean;
    enviar: boolean;





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

                    {(autorizar) ?
                        <Tooltip title="Autorizar">
                            <ToggleButton value="check" onClick={() => handleAccion(2)}>
                                <DoneAllIcon />
                            </ToggleButton>
                        </Tooltip>
                        : ""}
                    {(cancelar) ?
                        <Tooltip title="Cancelar">
                            <ToggleButton value="check" onClick={() => handleAccion(3)}>
                                <CancelPresentationIcon />
                            </ToggleButton>
                        </Tooltip>

                        : ""}
                    {(enviar)?

                        <Tooltip title="Enviar">
                            <ToggleButton value="check" onClick={() => handleAccion(4)}>
                                <SendIcon />
                            </ToggleButton>
                        </Tooltip>
                        : ""}
                    {(verTrazabilidad) ?

                        <Tooltip title="Ver Trazabilidad">
                            <ToggleButton value="check" onClick={() => handleAccion(5)}>
                                <InsightsIcon />
                            </ToggleButton>
                        </Tooltip>
                        : ""}
                </ToggleButtonGroup>
            </Box>
        </div>
    );
};

export default BotonesOpciones;
