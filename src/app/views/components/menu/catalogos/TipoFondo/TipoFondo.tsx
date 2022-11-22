import { useEffect, useState } from "react";
import { Box, IconButton, } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser, } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import TipoFondoModal from "./TipoFondoModal";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";

const TipoFondo = () => {

  //   VALORES POR DEFAULT
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dataTipoFondo, setDataTipoFondo] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const [vrows, setVrows] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "Clave",
      headerName: "Clave",
      width: 100,
    },
    { field: "Descripcion", headerName: "Descripcion", width: 350 },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
  ];
  const handleAccion = (v: any) => {
    if(v.tipo ==1){
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setVrows(v.data);
    }else if(v.tipo ==2){
      handleDelete(v.data);
    }
  }
  
  const handleClose = () => {
    setOpen(false);
    let data = {
      NUMOPERACION: 4
    };
    consulta(data);
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows({});
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

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        //console.log(data);

        CatalogosServices.tipofondo(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });


            let data = {
              NUMOPERACION: 4
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





  const consulta = (data: any) => {
    CatalogosServices.tipofondo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setDataTipoFondo(res.RESPONSE);
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
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNICIPIOS") {
        //console.log(item)
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
      NUMOPERACION: 4
    };
    consulta(data);
  }, []);



  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      {open ? (
        <TipoFondoModal open={open} modo={modo} tipo={tipoOperacion} handleClose={handleClose} dt={vrows} />
      ) : (
        ""
      )}

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />

      <MUIXDataGrid columns={columns} rows={dataTipoFondo} />

    </div>
  );
};

export default TipoFondo;
