import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
const BotonesAPD = ({
  handleAccion,
  eliminar,
}: {
  handleAccion: Function;
  eliminar: boolean;
}) => {
  const user: RESPONSE = JSON.parse(String(getUser()));


  return (
    <div>
      <Box>
        <ToggleButtonGroup>
          <Tooltip title={"Regresar"}>
            <ToggleButton value="check" onClick={() => handleAccion(1)}>
              <ArrowBackIcon />
            </ToggleButton>
          </Tooltip>

          {eliminar ? (
            <Tooltip title={"Eliminar"}>
              <ToggleButton value="check" onClick={() => handleAccion(2)}>
                <RemoveCircleOutlineIcon />
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

export default BotonesAPD;
