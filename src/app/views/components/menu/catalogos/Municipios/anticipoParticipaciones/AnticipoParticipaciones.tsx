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
        {
          field: "id",
          hide: true,
          headerName: "Identificador",
          width: 150,
        },
        { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
        { field: "Nombre", headerName: "Municipio", width: 250 },
    
        //{ field: "ClaveMun", headerName: "Clave Municipio", width: 150 },
   
            { field: "NombreCorto", headerName: "Nombre Corto", width: 250 },
        { field: "OrdenSFTGNL", headerName: "Orden SFTGNL", width: 120 },
        { field: "ClaveSIREGOB", headerName: "Clave SIREGOB", width: 120 },
        { field: "ClaveINEGI", headerName: "Clave INEGI", width: 120 },
        
       
        {
          field: "acciones",
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 350,
          renderCell: (v) => {
            return (
              <>
                <Box>
                </Box>
              </>
            );
          },
        },
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
            NUMOPERACION: 1,
        };

        CatalogosServices.indexAPC(data).then((res) => {
            setAPC(res.RESPONSE);
            console.log(res.RESPONSE)
        });
    }, []);
    return (
        <div style={{ height: 600, width: "100%" }}>
         <MUIXDataGrid sx={{}} columns={columns} rows={{}} />
        </div>
    );
};
