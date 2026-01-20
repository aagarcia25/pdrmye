import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getUser } from "../../../../../services/localStorage";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import { messages } from "../../../../styles";
import { Moneda } from "../../CustomToolbar";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";

const ISNParticipacion = () => {

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [id, setid] = useState(0);
  const [modo, setModo] = useState(0);


  const consultaISNParticipacion = ( NUMOPERACION: number) => {
    setLoading(true);

    const dataSend = {
      NUMOPERACION: NUMOPERACION,
      IDISNP: id,
      CHUSER: user.Id,
    };

    CatalogosServices.indexISNParticipacion(dataSend).then((res: any) => {
      if (res.SUCCESS) {
        setData(res.RESPONSE);
      }
      setLoading(false);
    });
  };

  const handleBorrar = (v: any) => {
    // ISN Participación solo consulta (por ahora)
  };

  
  const handleView = (v: any) => {
    consultaISNParticipacion(2)
    setModo(1);
    setid(v.id);
  };

  const handleBack = () => {
    setModo(0);
    consultaISNParticipacion(1);
  }


  useEffect(() => {
    consultaISNParticipacion(1);
    // setModo(0);
  }, []);

  const columnsISNParticipacion: GridColDef[] = [
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Ver Detalle"}>
              <IconButton onClick={() => handleView(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { field: "id", headerName: "ID", width: 150, hide: true },
    { field: "Anio", headerName: "Año", width: 120 },
    { field: "Total", headerName: "Total", width: 180, ...Moneda },
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 180 },
    { field: "UltimaActualizacion", headerName: "Última Actualización", width: 200 },
    { field: "creadoPor", headerName: "Creado Por", hide: true, width: 150, description: messages.dataTableColum.creadoPor,},
  ];

  const columnsISNParticipacionDetalle : GridColDef[] = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    { field: "anio", headerName: "Año", width: 120 },
    { field: "fechaCreacion", headerName: "Fecha Creación", width: 180 },
    { field: "nombre", headerName: "Municipio", width: 200 },
    { field: "mensual", headerName: "mensual", width: 200, ...Moneda },
    { field: "creadoPor", headerName: "Creado Por", hide: true, width: 150, description: messages.dataTableColum.creadoPor,},
  ];

  return (

    
    <div style={{ height: 600, width: "100%" }}>
      <h1>ISN Participación</h1>

        <div
          style={{
            height: 600,
            width: "100%",
            display: modo == 0 ? "block" : "none",
          }}
        >
          <MUIXDataGridMun
            columns={columnsISNParticipacion}
            rows={data}
            handleBorrar={handleBorrar}
            modulo={"ISN PARTICIPACION"}
            controlInterno={"ISNP"}
          />
        </div>


        <div
          style={{
            height: 600,
            width: "100%",
            display: modo == 1 ? "block" : "none",
          }}
        >
          <Box>
            <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              <Tooltip title="Regresar">
                <ToggleButton value="check" onClick={() => handleBack()}>
                  <ArrowBackIcon />
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          </Box>
          <MUIXDataGridMun
            columns={columnsISNParticipacionDetalle}
            rows={data}
            handleBorrar={handleBorrar}
            modulo={"ISN PARTICIPACION"}
            controlInterno={"ISNP"}
          />
        </div>

    </div>

    



  );
};

export default ISNParticipacion;
