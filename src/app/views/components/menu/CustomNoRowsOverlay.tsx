import { styled } from "@mui/material/styles";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box } from "@mui/material";

const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    
  }));

export function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
          <ErrorOutlineOutlinedIcon />
        <Box sx={{ mt: 1 }}>Sin Registros para mostrar</Box>
      </StyledGridOverlay>
    );
  }