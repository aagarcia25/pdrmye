import React, { useEffect, useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import MunTerritorioModal from "./MunTerritorioModal";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import { Box } from "@mui/material";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import NombreCatalogo from "../../../componentes/NombreCatalogo";


export const MunTerritorio = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [territorio, setTerritorio] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  // VARIABLES PARA LOS FILTROS


  //funciones



  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    {
      field: "acciones",  disableExport: true,
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
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 180 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Km2", headerName: "Área", width: 150 ,
     renderCell: (v) => {
      return (
        <Box  sx={{width: "100%",  display: 'flex',flexDirection: 'row-reverse',}}>
          {v.row.Km2+" km²"}
        </Box>
      );
    },
  },


  ];
  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setOpen(true);
      setData(v.data);
      setModo("Editar Registro");
    } else if (v.tipo === 2) {
      handleDelete(v.data);

    }
  }

  const handleClose = (v: string) => {
    setOpen(false);
    setOpen(false);
    consulta();
  };
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
    //console.log(v)
  };
  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setData("");
  };
  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "info",
      title:  "Solicitar La Eliminación?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(v);

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        //console.log(data);

        CatalogosServices.munterritorio(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Solicitud Enviada!",
            });

            consulta();

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

    if (data.tipo === 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlsx");
      formData.append("tipo", "MunTerritorio");
      setslideropen(false);
      //console.log(file)
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
          consulta();
        } else {
          AlertS.fire({
            title: "Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });

    } 
    else if (data.tipo === 2) {
      //console.log("borrado de toda la tabla")
      //console.log(selectionModel)

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
          //console.log(data);
  
          CatalogosServices.munterritorio(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Borrado!",
              });
  
              consulta();
  
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
  const consulta = () => {
    let dat = ({
      NUMOPERACION: 4,
      CHUSER: user.id
    })
    CatalogosServices.munterritorio(dat).then((res) => {
      setTerritorio(res.RESPONSE);
    });
  };




  useEffect(() => {

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNTERR") {
        setNombreMenu(item.Menu);
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
       
      }
    });


  }, []);


  useEffect(() => {
    consulta();
  }, []);


  return (
    <div style={{ height: 500, width: "100%",  }}>
      <Slider open={slideropen}></Slider>

      {open ?
        <MunTerritorioModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
        :
        ""
      }
        <NombreCatalogo controlInterno={"MUNTERR"} />
      <ButtonsMunicipio
        url={"MUNICIPIO_TERRITORIO.xlsx"}
        handleUpload={handleUpload} controlInterno={"MUNTERR"} value={"na"} options={[]} onInputChange={handleUpload} placeholder={""} label={""} disabled={true} />

      <MUIXDataGridMun columns={columns} rows={territorio} handleBorrar={handleBorrar} modulo={nombreMenu.toUpperCase().replace(' ', '_')} controlInterno={"MUNTERR"}   />

    </div>
  );
};
