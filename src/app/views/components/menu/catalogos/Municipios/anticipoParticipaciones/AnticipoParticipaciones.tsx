import { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { PERMISO } from "../../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../../services/catalogosServices";
import { getPermisos } from "../../../../../../services/localStorage";
import MUIXDataGrid from "../../../../MUIXDataGrid";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import { DetalleAnticipoParticipaciones } from "./DetalleAnticipoParticipaciones";


export const AnticipoParticipaciones = () => {
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [open, setOpen] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [agregar, setAgregar] = useState<boolean>(false);
    const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
    const [idPrincipal, setIdPrincipal] = useState("");
    const [APC, setAPC] = useState([]);
    const [data, setdata] = useState([]);



    const handleClose = (v: any) => {
setOpen(false);    
      };

    const columns: GridColDef[] = [
        { field: "id", hide: true, },
        { field: "Descripcion", headerName: "Estatus", width: 120 },
        { field: "mesdescripcion", headerName: "Mes", width: 120 },
        { field: "Anio", headerName: "Año", width: 120 },
        { field: "Total", headerName: "Total", width: 100 },
        {
            field: "acciones",
            headerName: "Acciones",
            description: "Ver detalle de Cálculo",
            sortable: false,
            width: 150,
            renderCell: (v) => {
                return (
                    <Box>
                        <Tooltip title="Ver detalle de Cálculo">
                            <IconButton onClick={() => handleDetalle(v)}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                        {agregar ? (
                            <Tooltip title="Agregar Ajuste">
                                <IconButton
                                    disabled={
                                        String(v.row.Clave) == "FISM" ||
                                        String(v.row.Clave) == "FORTAMUN"
                                    }
                                >
                                    <AttachMoneyIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            ""
                        )}
                        {verTrazabilidad ? (
                            <Tooltip title="Ver Trazabilidad">
                                <IconButton
                                 >
                                    <InsightsIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            ""
                        )}
                    </Box>
                );
            },
        },
    ];
    const handleDetalle = (v: any) => {
        console.log(String(v.row.id))
        setIdPrincipal(String(v.row.id));
        setdata(v.row);
        setOpen(true);
    };

    useEffect(() => {
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "MUNAPC") {
                console.log(item)
                if (String(item.Referencia) == "AGREG") {
                    setAgregar(true);
                }
                if (String(item.Referencia) == "ELIM") {
                    setEliminar(true);
                }
                if (String(item.Referencia) == "TRAZA") {
                    setVerTrazabilidad(true);
                }

            }
        });
        let data = {
            NUMOPERACION: 1
        };

        CatalogosServices.indexAPC(data).then((res) => {
            setAPC(res.RESPONSE);
            console.log(res.RESPONSE)

        });
    }, []);



    return (
        <div style={{ height: 600, width: "100%" }}>
            <MUIXDataGrid sx={{}} columns={columns} rows={APC} />

            {open ?
             <DetalleAnticipoParticipaciones idPrincipal={idPrincipal} data={data} open={open} handleClose={handleClose}/>
             :""
           }
           
        </div>
    );
};
