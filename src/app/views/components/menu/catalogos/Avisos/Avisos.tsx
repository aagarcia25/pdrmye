import { useEffect, useState } from 'react'
import { Box, Grid, IconButton, Tooltip, Typography,    } from '@mui/material'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { Toast } from "../../../../../helpers/Toast";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AvisosModal from './AvisosModal'
import Swal from "sweetalert2";
import MUIXDataGrid from '../../../MUIXDataGrid'
import { GridColDef } from '@mui/x-data-grid';
import ButtonsAdd from '../Utilerias/ButtonsAdd';
import { getPermisos, getUser } from '../../../../../services/localStorage';
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import BotonesAcciones from '../../../componentes/BotonesAcciones';
import { AlertS } from '../../../../../helpers/AlertS';


export const Avisos = () => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [conAvisos, setAvisos] = useState([]);
  const [open, setOpen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const columns: GridColDef[] = [

    { field: "id", headerName: "Identificador", hide: true, width: 150},
    { field: "fechaInicio", headerName: "Fecha de Inicio", width: 200 },
    { field: "FechaFin", headerName: "Expiracion", width: 200 },
    { field: "Nombre", headerName: "Nombre", width: 250 },
    { field: "Descripcion", headerName: "Descripcion", width: 500 },
    {
      field: "Documento", headerName: "Documento", width: 100, renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Visualizar">
            <IconButton onClick={() => handleVisualizar(v)}>
              <VisibilityIcon />
            </IconButton>
            </Tooltip>
          </Box>
        );
      }
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar} ></BotonesAcciones>
        );
      },
    },
    { field: "NombreDocumento", headerName: "NombreDocumento", hide: true, width: 150, },
  ];


  const handleAccion = (v: any) => {
    if(v.tipo ===1){
      setTipoOperacion(2);
      setModo("Editar");
      setOpen(true);
      setData(v.data);
    }else if(v.tipo ===2){
      handleBorrar(v.data);
    }
  }

  const handleBorrar = (v: any) => {

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
          CHUSER:String(user.id)
        };


        CatalogosServices.avisos(data).then((res) => {
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


  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Aviso");
    setOpen(true);
    //setData(v);

  };
  const handleVisualizar = (v: any) => {
    setTipoOperacion(2);
    setModo("Aviso");
    setOpen(true);
    setData(v);

  };



  const handleClose = (v:string) => {
if(v==="save"){
  let data = {
    NUMOPERACION: 4,
    CHUSER: String(user.id),
  };
  consulta(data);

}

    setOpen(false);

  };

  const consulta = (data: any) => {
    CatalogosServices.avisos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setAvisos(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  let dat = ({
    NUMOPERACION: 4,
    CHUSER:String(user.id)
  })


  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AVISOS") {
        //console.log(item)
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    CatalogosServices.avisos(dat).then((res) => {
      setAvisos(res.RESPONSE);
    });

  }, []);


  return (

    <div style={{ height: 600, width: "100%", paddingTop:"2%" }} >

      {open ? (
        <AvisosModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}
      <Grid container >
            <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography
                sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "3vw", color: "#000000", }}>
                Avisos
              </Typography>
            </Grid>
            </Grid>
            
      <Box>
      </Box>
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={conAvisos} />
    </div>


  )
}

