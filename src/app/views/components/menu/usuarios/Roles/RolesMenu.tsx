import { useEffect, useState } from 'react'

import {   Checkbox, Typography, Grid, Tooltip, IconButton } from '@mui/material';
import { AuthService } from '../../../../../services/AuthService';
import { Toast } from '../../../../../helpers/Toast';
import { AlertS } from '../../../../../helpers/AlertS';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGridSimple from '../../../MUIXDataGridSimple';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AsignarPermisoRol from './AsignarPermisoRol';
import EliminarPermisosRol from './EliminarPermisosRol';
import ModalForm from '../../../componentes/ModalForm';

const RolesMenu = ({
  id,
  open,
  handleClose,
}: {
  id: string,
  open: boolean;
  handleClose: Function,
}) => {
  const [data, setData] = useState([]);
  const [dt, setDt] = useState([]);
  const [openRel, setOpenRel] = useState(false);
  const [openPerRel, setOpenPerRel] = useState(false);
  const handleRel = (v: any) => {
    setDt(v);
    setOpenRel(true);

  };

  const handleViewPermisos = (v: any) => {

    setDt(v);
    setOpenPerRel(true);

  };

  const handleCloseAsignar = (v: string) => {

    setOpenPerRel(false);
    setOpenRel(false);

    
      if (v === "saved")
        consulta({ NUMOPERACION: 4 });
    
  };

  const handleChange = (v: any) => {
    let data = {
      TIPO: 2,
      IDROL: id,
      IDMENU: v.id
    }
    AuthService.rolespermisorelacionar(data).then((res) => {
      setData(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Menu Eliminado!",
        });
        consulta({ CHID: id });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };



  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",
      headerName: "",
      description: "Relacionar Menus",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return <Checkbox onChange={() => handleChange(v)} />;
      },
    },
    { field: "MENU", headerName: "Menu", width: 300 },
    {
      field: "Permisos",
      headerName: "Permisos",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <Tooltip title={"Ver Permisos Relaciados al Menú"}>
              <IconButton onClick={() => handleViewPermisos(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Relacionar Permiso a Rol"}>
              <IconButton onClick={() => handleRel(v)}>
                <AccountTreeIcon />
              </IconButton>
            </Tooltip>





          </>
        );
      },
    },


  ];



  const consulta = (data: any) => {
    AuthService.menurelacionadosalrol(data).then((res) => {
      setData(res.RESPONSE);
    });
  };

  useEffect(() => {
    consulta({ CHID: id });
  }, [id]);

  return (
    <div>



      <ModalForm title={' Relacion Menú a Rol'} handleClose={handleClose}>

        <Grid
          container
          sx={{           
            left: "50%",
            width: "100%",
            height: "80vh",
            bgcolor: "rgb(255,255,255)",
            boxShadow: 50,
            p: 2,
            borderRadius: 3,
            justifyContent:"center"
            
          }}
        >
 

          <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center",   }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "1.5vw",
                color: "#808080",
              
              }}
            >
              Para Eliminar el menú solo Marcar la Casilla
            </Typography>
          </Grid>


          <Grid item sm={12}
            sx={{
              height: "100%",
              paddingTop:"1%"

            }}
          >
            <MUIXDataGridSimple columns={columns} rows={data} />

          </Grid>


          <Grid item sm={12}
            sx={{

      
            }}
          >
          </Grid>
        </Grid>
      </ModalForm>

      {openRel ? (
        <AsignarPermisoRol
          id={id}
          open={openRel}
          handleCloseAsignar={handleCloseAsignar}
          handleClose={handleClose}
          dt={dt}
        ></AsignarPermisoRol>
      ) : (
        ""
      )}

      {openPerRel ? (
        <EliminarPermisosRol
          id={id}
          open={openPerRel}
          handleCloseAsignar={handleCloseAsignar}
          handleClose={handleClose}
          dt={dt}
        ></EliminarPermisosRol>
      ) : (
        ""
      )}


    </div>
  )
}

export default RolesMenu
