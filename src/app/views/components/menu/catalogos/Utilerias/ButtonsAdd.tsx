import AddIcon from "@mui/icons-material/Add";
import { Box, ToggleButtonGroup, Tooltip, ToggleButton, Grid } from "@mui/material";

const ButtonsAdd = ({
  handleOpen,
  agregar,
}: {
  handleOpen: Function;
  agregar: boolean;
}) => {
  return (
    <Box sx={{ alignItems: "center",  }} >
        <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
      {agregar ? (
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform"   >
          <Tooltip title="Agregar" >
            <ToggleButton value="check" onClick={() => handleOpen(1)}>
              <AddIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      ) : (
        ""
      )}
      </Grid>
    </Box>
  );
};

export default ButtonsAdd;
