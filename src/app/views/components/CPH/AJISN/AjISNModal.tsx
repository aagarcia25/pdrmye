import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getUser } from "../../../../services/localStorage";

export const AjISNModal = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {

  const [anio, setAnio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const currentYear = new Date().getFullYear();

  const validarAnio = (valor: string): boolean => {
    if (valor === "") {
      setError("El año es obligatorio");
      return false;
    }

    const anioNum = parseInt(valor);

    if (isNaN(anioNum) || anioNum < 1900 || anioNum > currentYear + 1) {
      setError(`Ingresa un año válido entre 1900 y ${currentYear + 1}`);
      return false;
    }

    setError("");
    return true;
  };

  const handleAnioChange = (value: string) => {
    setAnio(value);
    if (value !== "") validarAnio(value);
    else setError("");
  };

  const validacion = async () => {
    if (!validarAnio(anio)) {
      AlertS.fire({
        title: "¡Error!",
        text: error || "Favor de ingresar un año válido",
        icon: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const mesCreacion = new Date().getMonth() + 1;

      const data = {
        NUMOPERACION: 1,
        P_ANIO: parseInt(anio),
        P_USUARIO: user.Id,
        P_MES: mesCreacion,
      };

      const res = await calculosServices.AjusteISNIndex(data);

      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Generación exitosa!",
        });
        handleClose();
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    } catch {
      AlertS.fire({
        title: "¡Error!",
        text: "Error de conexión. Intenta nuevamente.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) validacion();
  };

  return (
    <Dialog open fullScreen onClose={() => !loading && handleClose()}>
      <DialogTitle>Generación de Ajuste ISN</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 500 }}>
              Año *
            </Typography>

            <TextField
              fullWidth
              type="number"
              value={anio}
              variant="outlined"
              placeholder={`Ejemplo: ${currentYear}`}
              onChange={(e) => handleAnioChange(e.target.value)}
              onKeyPress={handleKeyPress}
              error={!!error}
              helperText={error || `Rango permitido: 1900 - ${currentYear + 1}`}
              disabled={loading}
              inputProps={{
                min: 1900,
                max: currentYear + 1,
                step: 1,
              }}
              autoFocus
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="contained"
          disabled={loading || !!error || anio === ""}
          onClick={validacion}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? "Generando..." : "Generar"}
        </Button>

        <Button
          variant="outlined"
          disabled={loading}
          onClick={handleClose}
        >
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
