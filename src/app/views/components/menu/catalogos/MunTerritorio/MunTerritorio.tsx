import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import MunTerritorioModal from "./MunTerritorioModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import AccionesGrid from "../Utilerias/AccionesGrid";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import { Grid, Typography } from "@mui/material";

export const MunTerritorio = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [territorio, setTerritorio] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");

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
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Km2", headerName: "Area", width: 150 },
  

  ];
  const handleAccion = (v: any) => {
    if(v.tipo ==1){
      setTipoOperacion(2);
      setOpen(true);
      setData(v.data);
      setModo("Editar Registro");
    }else if(v.tipo ==2){
      handleDelete(v.data);
    }
  }
  

  const handleClose = (v: string) => {
      setOpen(false);
      setOpen(false);
      let data = {
        NUMOPERACION: 4,
      }
      consulta(data);

    console.log('cerrando');


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
      title: "Estas seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(v);

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        console.log(data);

        CatalogosServices.munterritorio(data).then((res) => {
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



  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "MunTerritorio");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }



    });
  };

  const consulta = (data: any) => {
    CatalogosServices.munterritorio(data).then((res) => {
      // if (res.SUCCESS) {
      //   Toast.fire({
      //     icon: "success",
      //     title: "Consulta Exitosa!",
      //   });
      //   setTerritorio(res.RESPONSE);
      // } else {
      //   AlertS.fire({
      //     title: "Error!",
      //     text: res.STRMESSAGE,
      //     icon: "error",
      //   });
      // }
    });
  };




  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_TERRITORIO",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNTERR") {
        console.log(item)
        setNombreMenu(item.Menu);
        if (String(item.Referencia) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
        }
      }
    });
    downloadplantilla();


  }, []);

  let dat = ({
    NUMOPERACION: 4,
    CHUSER: user.id
  })
  useEffect(() => {
    CatalogosServices.munterritorio(dat).then((res) => {
      setTerritorio(res.RESPONSE);
    });
  }, []);


  return (
    <div style={{ height: 500, width: "100%" }}>
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
       <Grid container
        sx={{justifyContent: "center"}}>
        <Grid item xs={10} sx={{textAlign:"center"}}>
          <Typography>
            <h1>{nombreMenu}</h1>
          </Typography>
        </Grid>
      </Grid>

      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"MUNTERR"}      />
      <MUIXDataGrid columns={columns} rows={territorio} />

    </div>
  );
};
