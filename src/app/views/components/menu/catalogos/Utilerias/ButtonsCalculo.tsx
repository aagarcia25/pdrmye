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
        

<Tooltip
title={"Agregar"}>
<ToggleButton  className="enviar-mensaje" value="check" onClick={() => handleOpen(1)}>
  <AddIcon />
</ToggleButton>
</Tooltip>


      ) : (
        ""
      )}
    </Box>
  );
};
 
export default ButtonsCalculo;
