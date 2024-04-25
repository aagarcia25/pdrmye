import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { Fab } from "@mui/material";
const FAB = () => {
  const handleFabClick = () => {
    window.open("http://localhost:3005/inci/registrar?tipo=1", "_blank"); // Abrir una página externa en una nueva pestaña
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 16, // Distancia desde abajo
          right: 16, // Distancia desde la izquierda
        }}
        onClick={handleFabClick}
      >
        <LiveHelpIcon />
      </Fab>
    </div>
  );
};

export default FAB;
