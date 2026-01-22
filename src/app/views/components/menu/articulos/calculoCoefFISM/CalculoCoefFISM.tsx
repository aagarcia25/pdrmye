import { useEffect, useState } from "react";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import {
  ToggleButton,
  ToggleButtonGroup,
  Tooltip
} from "@mui/material";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import { calculosServices } from "../../../../../services/calculosServices";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { messages } from "../../../../styles";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import Swal from "sweetalert2";



const columns: GridColDef[] = [
  { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id },
  { field: "municipio", headerName: "Municipio", width: 200 },
  { field: "version", headerName: "Version de coeficiente del FISM", width: 200 },
  { field: "fechaCreacion", headerName: "Fecha de Creación", width: 180 },
  { field: "creadoPor", headerName: "Creado Por", hide: true, width: 150, description: messages.dataTableColum.creadoPor },
  { field: "anio", headerName: "Año", hide: true, width: 100 },
  { field: "mes", headerName: "Mes", hide: true, width: 100 },
  { field: "coeficiente", headerName: "Coeficiente", width: 150 },
];

const CalculoCoefFISM = () => {

    const [coeffism, setCoefFism] = useState([]);

        useEffect(()=>{
            consulta();
        },[]);

    const consulta = () => {
        let dat  = {}
        calculosServices.obtenercalculogarantiaisn(dat).then(
            (res) => {
                if(res.SUCCESS){
                    
                    setCoefFism(res.RESPONSE);
                }else{
                    console.error("Error al obtener datos:", res.STRMESSAGE);
                    
                }
            }
        )
    }

      const alerta = () => {
    
        const user : USUARIORESPONSE = JSON.parse(String(getUser()));
    
        const lastMonth = new Date();
    
        const anio = lastMonth.getFullYear();
        const mes = lastMonth.getMonth() +1;
    
        let data = {
          CHUSER: user.Id,
          ANIO: anio,
          MES: mes,
        };
    
        Swal.fire({
          icon: "question",
          title: "¿Deseas crear un nuevo cálculo de Garantía del ISN?",
          text: "Se calculara una nueva version de la Garantia del ISN",      
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          color: "rgb(175, 140, 85)",
        }).then((result) => {
          if (result.isConfirmed) {
            calculosServices.calculargarantiaisn(data).then(
                (res) => {
                    if(res.SUCCESS){
                        calculosServices.setGarantiaDesdeISN({}).then(
                            (res) => {
                                if(res.SUCCESS){
                                    consulta();
                                    Swal.fire({
                                        icon: "success",
                                        title: "Se ha creado una nueva versión.",
                                    });
                                }else{
                                    Swal.fire({
                                        icon: "error",
                                        title: res.RESPONSE,
                                    });
                                }
                            }
                        );
                        
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: res.RESPONSE,
                        });
                    }
                }
            );

          }
        });
      }

    return (
        <div style={{ height: 800, width: "100%" }}>

            <NombreCatalogo controlInterno={"COEFFISM"}/>

            {
                <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              <Tooltip title="Generar Nueva Garantia del ISN">
                <ToggleButton
                  className="enviar-mensaje"
                  value="check"
                  onClick={() => {
                        alerta();
                    }}
                  >
                  <AutoModeIcon />
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
            }
            
            <MUIXDataGridMun
            columns={columns}
            rows={coeffism}
            handleBorrar={()=>{}}
            modulo=''
            controlInterno={"CAISN"}
            />
        </div>
    )
}

export default CalculoCoefFISM;