import { Box, ToggleButtonGroup, Tooltip, ToggleButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ButtonsCalculo = ({
  handleOpen,
  agregar,
}: {
  agregar: boolean;
  handleOpen: Function;
}) => {
  return (
    <Box sx={{}}>
      {agregar ? (
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
          <Tooltip title="Agregar Calcúlo">
            <ToggleButton value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
    </Box>
  );
};

export default ButtonsCalculo;
