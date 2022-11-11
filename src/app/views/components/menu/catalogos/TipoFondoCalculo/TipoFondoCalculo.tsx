import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser, } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { Box, Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import ModalForm from "../../../componentes/ModalForm";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveButton from "../../../componentes/SaveButton";

const TipoFondoCalculo = () => {

  //   VALORES POR DEFAULT
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dataTipoFondo, setDataTipoFondo] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [vrows, setVrows] = useState({});

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
          {/* EDITAR */}
          {editar ? 
            <Tooltip title={"Editar Registro"}>
           <IconButton color="info" onClick={() => handleAccion({tipo:1,data:v})}>
             <ModeEditOutlineIcon />
           </IconButton>
           </Tooltip>
           :""}
           {/* ELIMINAR */}
           {eliminar ?
             <Tooltip title={"Eliminar Registro"}>
           <IconButton  color="error" onClick={() => handleAccion({tipo:3,data:v})}>
             <DeleteForeverIcon />
           </IconButton>
           </Tooltip>
           :""
           
           }
                    
         </Box>

        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    { field: "Descripcion", headerName: "Descripcion", width: 350 },
  
  ];

  const handleAccion = (v: any) => {

    if(tipoOperacion == 2){
      setTipoOperacion(2);
      setVrows(v.data);
      setOpen(true);
    }else if(tipoOperacion ==3){
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
        
          CatalogosServices.TipoFondosCalculo(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });
              consulta();
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
    }
  }
  
  const handleClose = () => {
    setOpen(false);
    consulta();
  };


  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setVrows({});
  };


 


  const consulta = () => {
    let data = {
      NUMOPERACION: 4
    };

    CatalogosServices.TipoFondosCalculo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setDataTipoFondo(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };




  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "TIPOCALCULO") {
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
    consulta();
  }, []);



  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>
      <Grid container
        sx={{justifyContent: "center"}}>
        <Grid item xs={10} sx={{textAlign:"center"}}>
          <Typography>
            <h1>{nombreMenu}</h1>
          </Typography>
        </Grid>
      </Grid>

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={dataTipoFondo} />

 
      {open ? (
       <ModalForm title={tipoOperacion === 1 ?"Agregar Registro" : "Modificar Registro"} handleClose={handleClose}>
       
       <Grid container
         sx={{
           mt: "2vh",
           width: "100%",
           height: "100%",
           justifyContent: "center",
           alignItems: "center",
           flexDirection: "row",
         }}

       >
         

         





        <SaveButton vrow={vrows} handleAccion={handleAccion} tipoOperacion={tipoOperacion}></SaveButton>


       </Grid>






     </ModalForm>
      ) : (
        ""
      )}



    </div>
  );
};

export default TipoFondoCalculo;
