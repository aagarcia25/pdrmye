import { Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { AlertS } from '../../../../../helpers/AlertS';
import { Toast } from '../../../../../helpers/Toast';
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AuthService } from '../../../../../services/AuthService';
import { getPermisos, getUser } from '../../../../../services/localStorage';
import BotonesAcciones from '../../../componentes/BotonesAcciones';
import MUIXDataGrid from '../../../MUIXDataGrid';
import ButtonsAdd from '../../catalogos/Utilerias/ButtonsAdd';
import PermisosModal from './PermisosModal';

const Permisos = () => {

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleAccion = (v: any) => {

    if (v.tipo = 1) {
      setTipoOperacion(2);
      setModo("Editar Registro");
      setVrows(v.data);
      setOpen(true);
    } else if (v.tipo === 2) {

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
            CHID: v.data.row.id,
            CHUSER: user.id
          };
          AuthService.permisosindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
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
    }

  }

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setVrows("");
    setOpen(true);
  };
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "idmenu",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <BotonesAcciones
            handleAccion={handleAccion}
            row={v}
            editar={editar}
            eliminar={eliminar} />
        );
      },
    }, {
      field: "FechaCreacion",
      headerName: "Fecha Creacion",
      width: 200,
    },
    {
      field: "CreadoPor",
      headerName: "Creado Por",
      width: 420,
    },
    {
      field: "menu",
      headerName: "M??dulo",
      width: 300,
    },
    {
      field: "Permiso",
      headerName: "Permiso",
      width: 300,
    },
    {
      field: "Descripcion", headerName: "Descripcion", width: 350
    },

  ];



  const consulta = (data: any) => {
    AuthService.permisosindex(data).then((res) => {
      if (res.SUCCESS) {
        setData(res.RESPONSE);
      } else {
   
      }
    });
  };


  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "PRIVUSU") {
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
    consulta({ NUMOPERACION: 4 });
  }, []);
  return (
    <div>
      <Grid sx={{ padding: "1%" }} >
        {open ? (
          <PermisosModal
            open={open}
            modo={modo}
            tipo={tipoOperacion}
            handleClose={handleClose}
            dt={vrows}
          />
        ) : (
          ""
        )}

        <Grid container >
          <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Typography
              sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "3vw", color: "#000000", }}>
              Privilegios de usuario
            </Typography>
          </Grid>
        </Grid>

        <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        <MUIXDataGrid
          columns={columns}
          rows={data}
        />
      </Grid>
    </div>
  )
}

export default Permisos
