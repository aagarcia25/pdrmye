import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { PERMISO } from "../../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../../services/catalogosServices";
import { getPermisos } from "../../../../../../services/localStorage";
import MUIXDataGrid from "../../../../MUIXDataGrid";


export const AnticipoParticipaciones = () => {
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [editar, setEditar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [agregar, setAgregar] = useState<boolean>(false);
    const [APC, setAPC] = useState([]);
    const columns: GridColDef[] = [
        {field: "id", hide: true, },
        {field: "idPrincipal", hide: true, },
        { field: "Descripcion", headerName: "Mes", width: 120 },

        { field: "Nombre", headerName: "Municipio", width: 350 },
    
        //{ field: "ClaveMun", headerName: "Clave Municipio", width: 150 },
   
            { field: "Total", headerName: "Total", width: 100 },
        { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
        { field: "Anio", headerName: "Anio", width: 120 },
      ];

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
                if (String(item.Referencia) == "EDIT") {
                    setEditar(true);
                }
             
            }
        });
        let data = {
            IDPRINCIPAL:"363a03e1-cac7-437f-9e2f-0695b8416d90"
        };

        CatalogosServices.getdetalle(data).then((res) => {
            setAPC(res.RESPONSE);
            console.log(res.RESPONSE)

        });
    }, []);
    return (
        <div style={{ height: 600, width: "100%" }}>
         <MUIXDataGrid sx={{}} columns={columns} rows={APC} />
        </div>
    );
};
