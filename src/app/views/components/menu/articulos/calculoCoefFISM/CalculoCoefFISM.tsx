import { useEffect, useState } from "react";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import { calculosServices } from "../../../../../services/calculosServices";
import { GridColDef } from "@mui/x-data-grid";
import { messages } from "../../../../styles";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import Swal from "sweetalert2";
import MUIXDataGridAutoHeigth from "../../../MUIXDataGridAutoHeigth";

const cell = (value: any, align: "center" | "right" | "left" = "center") => (
  <Box sx={{ py: 1, width: "100%", textAlign: align }}>
    {value ?? ""}
  </Box>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id, renderCell: (p) => cell(p.value, "center") },
  { field: "municipio", headerName: "Municipio", width: 200, align: "left", headerAlign: "center", renderCell: (p) => cell(p.value, "left") },
  { field: "version", headerName: "Version de coeficiente del FISM", width: 200, align: "center", headerAlign: "center", renderCell: (p) => cell(p.value, "center") },
  { field: "anio", headerName: "Año", hide: true, width: 100, align: "center", headerAlign: "center", renderCell: (p) => cell(p.value, "center") },
  { field: "mes", headerName: "Mes", hide: true, width: 100, align: "center", headerAlign: "center", renderCell: (p) => cell(p.value, "center") },
  { field: "coeficiente", headerName: "Coeficiente", width: 300, align: "right", headerAlign: "center", renderCell: (p) => cell(p.value, "right") },
  { field: "activo", headerName: "Status", width: 150, align: "right", headerAlign: "center", renderCell: (p) => cell(p.value == 0 ? "Activo" : "Historico", "right") },
  { field: "fechaCreacion", headerName: "Fecha de Creación", width: 180, align: "right", headerAlign: "center", renderCell: (p) => cell(p.value, "center") },
  { field: "creadoPor", headerName: "Creado Por", hide: true, width: 450, align: "center", headerAlign: "center", renderCell: (p) => cell(p.value, "center") },
];

const CalculoCoefFISM = () => {
  const [coeffism, setCoefFism] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 👈

  useEffect(() => {
    consulta();
  }, []);

  const consulta = async () => {
    setLoading(true); // 👈 prende loading al abrir y al refrescar
    try {
      const res = await calculosServices.coefFISM({ NUMOPERACION: 2 });

      if (res.SUCCESS) {
        setCoefFism(res.RESPONSE?.data ?? res.RESPONSE?.data ?? []);
      } else {
        console.error("Error al obtener datos:", res.STRMESSAGE);
        setCoefFism([]);
      }
    } catch (e) {
      console.error(e);
      setCoefFism([]);
    } finally {
      setLoading(false); // 👈 apaga loading
    }
  };

  const alerta = async () => {
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));

    const { value: montoAnual, isConfirmed } = await Swal.fire({
      icon: "question",
      title: "¿Deseas crear un nuevo coeficiente para FISM?",
      text: "Se calculará una nueva versión del coeficiente del FISM con los datos actuales.",
      input: "text",
      inputLabel: "Monto anual FISM",
      inputPlaceholder: "Ej. 692,953,476",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      color: "rgb(175, 140, 85)",
      preConfirm: (value) => {
        const cleaned = String(value ?? "").trim().replace(/[\s,]/g, "");
        if (!cleaned) return Swal.showValidationMessage("Ingresa el monto anual."), false;
        if (!/^\d+$/.test(cleaned)) return Swal.showValidationMessage("El monto debe ser numérico (solo dígitos)."), false;

        const n = Number(cleaned);
        if (!Number.isFinite(n) || n <= 0) return Swal.showValidationMessage("Ingresa un monto válido (> 0)."), false;
        return n;
      },
    });

    if (!isConfirmed) return;

    try {
      setLoading(true); // 👈 también loading mientras calcula
      const res = await calculosServices.coefFISM({
        NUMOPERACION: 1,
        p_Monto_Anual: montoAnual,
        CHUSER: user.Id,
      });

      if (res.SUCCESS) {
        await consulta();
        Swal.fire({ icon: "success", title: "Se ha creado una nueva versión." });
      } else {
        Swal.fire({ icon: "error", title: res.STRMESSAGE ?? "Error" });
      }
    } catch (e: any) {
      Swal.fire({ icon: "error", title: "Error al generar coeficiente", text: e?.message ?? String(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <NombreCatalogo controlInterno={"COEFFISM"} />

      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
        <Tooltip title="Generar nuevo coeficiente FISM">
          <ToggleButton className="enviar-mensaje" value="check" onClick={alerta}>
            <AutoModeIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>

      <MUIXDataGridAutoHeigth
        columns={columns}
        rows={coeffism}
        loading={loading}   // 👈 aquí
        handleBorrar={() => {}}
        modulo=""
        controlInterno={"CAISN"}
      />
    </div>
  );
};

export default CalculoCoefFISM;
