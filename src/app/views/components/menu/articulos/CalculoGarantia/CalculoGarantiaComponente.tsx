import { Grid,  Typography } from "@mui/material";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { calculosServices } from "../../../../../services/calculosServices";
import { CalculoGarantiaModal } from "./CalculoGarantiaModal";
import { Moneda } from "../../CustomToolbar";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import ButtonsMunicipio from "../../catalogos/Utilerias/ButtonsMunicipio";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import React from "react";

export const CalculoGarantiaComponente = () => {
  const [slideropen, setslideropen] = useState(true);
  const [calculoGarantia, setCalculoGarantia] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [plantilla, setPlantilla] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  
  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "idmunicipio",
      hide: true,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 150 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 150 },
    { field: "Nombre", headerName: "Municipio", width: 250 },
    {
      field: "clave",
      hide: false,
      headerName: "Clave Fondo",
      width: 100,
    },
    {
      field: "Descripcion",
      headerName: "Descripción de fondo",
      width: 420,
    },
    {
      field: "Anio",
      headerName: "Año",
      width: 120,
    },
    {
      field: "Garantia",
      headerName: "Garantía",
      width: 150,
      ...Moneda,
    },
    {
      field: "Distribucion",
      headerName: "Distribucion",
      width: 150,

    },


  ];
  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  }

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "PLANTILLA DE CARGA DE GARANTIA",
    };
    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };
  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    console.log(v);
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setVrows(v);
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
          CHUSER: user.id,
        };
        console.log(data);

        calculosServices.CalculoGarantia(data).then((res) => {
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
            AlertS.fire({
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

  const handleUpload = (data: any) => {

    if (data.tipo == 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlsx");
      formData.append("tipo", "CalculoGarantia");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          consulta({ NUMOPERACION: 4 });
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });

        } else {
          consulta({ NUMOPERACION: 4 });
          AlertS.fire({
            title: "Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
  
  
  
      });
    } 
    else if (data.tipo == 2) {
      console.log("borrado de toda la tabla")
      console.log(selectionModel)

      if(selectionModel.length!==0){
      Swal.fire({
        icon: "question",
        title: selectionModel.length +" Registros Se Eliminaran!!",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
  
          let data = {
           NUMOPERACION: 5,
           OBJS: selectionModel,
           CHUSER: user.id
          };
  
          calculosServices.CalculoGarantia(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Borrado!",
              });
  
              consulta({ NUMOPERACION: 4 });
            } else {
              AlertS.fire({
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "Seleccione Registros Para Borrar",
        confirmButtonText: "Aceptar",
      });
    }



    }

  };

  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const consulta = (data: any) => {
    calculosServices.CalculoGarantia(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setCalculoGarantia(res.RESPONSE);
        setslideropen(false);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    downloadplantilla();
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "CA") {
        console.log(item)

        setNombreMenu(item.Menu);
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
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
    <Slider open={slideropen}></Slider>
      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography>
            <h1>Calculo Garantía</h1>
          </Typography>
        </Grid>
      </Grid>


      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"CA"}      />
        < MUIXDataGridMun columns={columns} rows={calculoGarantia} handleBorrar={handleBorrar} borrar={eliminar} modulo={"Garantia"}   />
      
        {open ? (
        <CalculoGarantiaModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

    </div>
  );
};
