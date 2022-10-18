import React, { useEffect, useState } from "react";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { GridColDef } from "@mui/x-data-grid";
import { messages } from "../../../../styles";
import AccionesGrid from "../../../AccionesGrid";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { ParametroServices } from "../../../../../services/ParametroServices";
import Slider from "../../../Slider";
import Buttons from "../Utilerias/Buttons";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { ParametrosGeneralesModal } from "./ParametrosGeneralesModal";

export const ParametrosGenerales= ()=>{
    const [parametroGeneral, setParametroGeneral] = useState([]);


    const [modo, setModo] = useState("");
  
    const [open, setOpen] = useState(false);
    const [tipoOperacion, setTipoOperacion] = useState(0);
    const [data, setData] = useState({});
    const [plantilla, setPlantilla] = useState("");
    const [slideropen, setslideropen] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));

    const columns: GridColDef[] = [
        {
          field: "id",
          hide: true,
          headerName: "Identificador",
          width: 150,
          description: messages.dataTableColum.id,
        },
        {
          field: "Nombre",
          headerName: "Nombre",
          width: 150,
        },
        {
          field: "Valor",
          headerName: "Valor",
          width: 120,
        },
        {
          field: "acciones",
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 150,
          renderCell: (v) => {
            return (
              <AccionesGrid
                handleEditar={handleEdit}
                handleBorrar={handleDelete}
                v={v}
                update={true}
                pdelete={true}
              />
            );
          },
        },
      ];

      const handleClose = () => {
        setOpen(false);
        consulta({ NUMOPERACION: 4 });
      };

      const handleOpen = (v: any) => {
        setTipoOperacion(1);
        setModo("Agregar Registro");
        setOpen(true);
        setData("");
      };
    
      const handleEdit = (v: any) => {
        setTipoOperacion(2);
        setModo("Editar Registro");
        setOpen(true);
        setData(v);
      };
    
      const handleDelete = (v: any) => {
        Swal.fire({
          icon: "info",
          title: "Estas seguro de eliminar este registro?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(v);
            const user: RESPONSE = JSON.parse(String(getUser()));
    
            let data = {
              NUMOPERACION: 3,
              CHID: v.row.id,
              CHUSER: user.id
            };
            console.log(data);
    
            ParametroServices.ParametroGeneralesIndex(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Registro Eliminado!",
                });
    
                let data = {
                  NUMOPERACION: 4,
                };
                consulta(data);
              } else {
                Alert.fire({
                  title: "Error!",
                  text: res.STRMESSAGE,
                  icon: "error",
                });
              }
            });
          } else if (result.isDenied) {
            Swal.fire("No se realizaron cambios", "", "info");
          }
        });
      };
    
      const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setslideropen(true);
        let file = event?.target?.files?.[0] || "";
        const formData = new FormData();
        formData.append("inputfile", file, "inputfile.xlsx");
        formData.append("tipo", "MunFacturacion");
        ParametroServices.ParametroGeneralesIndex(formData).then((res) => {
          setslideropen(false);
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Carga Exitosa!",
            });
          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      };
    
      const consulta = (data: any) => {
        ParametroServices.ParametroGeneralesIndex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Consulta Exitosa!",
            });
            console.log(data);
            setParametroGeneral(res.RESPONSE);
          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
            console.log(res);
            console.log(res.SUCCESS);
          }
        });
      };
    
      useEffect(() => {
        console.log();
        let data = {
          NUMOPERACION: 4,
        };
    
        ParametroServices.ParametroGeneralesIndex(data).then((res) => {
          setParametroGeneral(res.RESPONSE);
        });
      }, []);

      return(
        <div style={{ height: 600, width: "100%" }}>
        <Slider open={slideropen}></Slider>
  
        {open ? (
        <ParametrosGeneralesModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}

        <Buttons
          handleOpen={handleOpen}
          url={plantilla}
          handleUpload={handleUpload}
        />
  
        <MUIXDataGrid sx={{}} columns={columns} rows={parametroGeneral} />
      </div>
        );
}