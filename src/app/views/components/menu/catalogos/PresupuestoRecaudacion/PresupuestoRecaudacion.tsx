import { useEffect, useState } from "react";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { messages } from "../../../../styles";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import { PresupuestoRecaudacionModal } from "./PresupuestoRecaudacionModal";
import ButtonsAdd from "../Utilerias/ButtonsAdd";

const columns : GridColDef[] = [
    {
        field: "id",
        headerName: "Identificador",
        hide: true,
        width: 150,
        description: messages.dataTableColum.id,
    },
    {
        field: "anio",
        headerName: "Año",
        hide: true,
        width: 150,
    },
    {
        field: "mes",
        headerName: "Mes",
        hide: true,
        width: 150,
    },
    {
        field: "creadoPor",
        headerName: "Creado Por",
        hide: true,
        width: 150,
        description: messages.dataTableColum.creadoPor,
    },
    {
        field: "version",
        headerName: "Version",
        hide: true,
        width: 150,
    },
    {
        field: "presupuesto",
        headerName: "Presupuesto",
        hide: true,
        width: 150,
    },
];

const PresupuestoRecaudacion = () => {

    const [presupuestoPorRecaudacion, setPresupuestoPorRecaudacion] = useState([]);
    const [open, setOpen] = useState(false);
    
      useEffect(() => {

       consulta();
      }, []);

    const handleOpen = (v: any) => {
        // Aquí puedes pasar datos al modal si es necesario
        setOpen(true);
    };

    const handleClose = (v: string) => {
        setOpen(false);
        consulta();
    };

    const consulta = () => {
        let dat = {
            /*
            NUMOPERACION: 4,
            CHUSER: "user.Id",*/ // Reemplaza con el ID del usuario actual
        }
        CatalogosServices.obtenerpresupuestoporrecaudacion(dat).then(
            (res) => {
                if (res.SUCCESS) {
                    // Aquí puedes manejar la respuesta exitosa
                    console.log("Datos obtenidos:", res.RESPONSE);
                    setPresupuestoPorRecaudacion(res.RESPONSE);
                } else {
                    // Manejo de error
                    console.error("Error al obtener datos:", res.STRMESSAGE);
                }
            }
        );
    }

  return (

     <div style={{ height: 500, width: "100%" }}>
        
        {
            open ? 
            (
                <PresupuestoRecaudacionModal
                handleClose={ 
                    handleClose
                }
                />
            )
            : ("")
        }

        <NombreCatalogo controlInterno={"PPR"} />

        <ButtonsAdd handleOpen={handleOpen} agregar={true} />

        <MUIXDataGridMun
        columns={columns}
        rows={presupuestoPorRecaudacion}
        handleBorrar={()=>{}}
        modulo=''
        controlInterno={"PPR"}
      />
     </div>
    
  );
}

export default PresupuestoRecaudacion;