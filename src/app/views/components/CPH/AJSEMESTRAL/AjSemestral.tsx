import AutoModeIcon from "@mui/icons-material/AutoMode";
import {
  Box,
  createTheme,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography
} from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  esES as gridEsES, GridSelectionModel
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AlertS } from "../../../../helpers/AlertS";
import { Toast } from "../../../../helpers/Toast";
import { PERMISO, RESPONSE } from "../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos, getUser } from "../../../../services/localStorage";
import { Moneda } from "../../menu/CustomToolbar";
import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import Slider from "../../Slider";
import { AjSemestralModal } from "./AjSemestralModal";
import InfoIcon from "@mui/icons-material/Info";
import { AjSemestralDetail } from "./AjSemestralDetail";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from "sweetalert2";

export const AjSemestral = () => {

  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(false);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  //MODAL
  //Constantes para las columnas
  const [vrows, setVrows] = useState<{}>("");
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  ///// Modal de Administración de Speis
  const [openModal, setOpenModal] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const [agregar, setagregar] = useState(true);
  const [eliminar, setEliminar] = useState(true);


  

  const handleclose = (data: any) => {
    handleClick();
    setOpenModal(false);
    setOpenDetail(false);
  };

  const handleDetalle = (data: any) => {
    setVrows(data);
    setOpenDetail(true);
  };

  const handleDeleted =( v: any ) =>{
    Swal.fire({
      icon: "error",
      title: "Eliminación",
      text: "El Movimiento Seleccionado se Eliminará",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 4,
          P_IDANIO: v.row.anio,
          P_FONDO: v.row.id,

        };

        calculosServices.AjusteSemestralIndex(data).then((res) => {
          if (res.SUCCESS) {
            AlertS.fire({
              title: res.RESPONSE,
              icon: "success",
            }).then(async (result) => {
              if (result.isConfirmed) {
                handleClick();
              }
            });
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });


      }
    });
  }
  

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      disableExport: true,
      field: "acciones",
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title="Ver Detalle">
              <IconButton onClick={() => handleDetalle(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>

            {eliminar ?
           <Tooltip title={"Eliminar Registro"}>
           <IconButton  color="inherit" onClick={() => handleDeleted(v)}>
          <DeleteForeverIcon />
        </IconButton>
        </Tooltip>
        :""
        
        }

          </Box>


        );

       

      },
    },
    {
      field: "anio", headerName: "Año", width: 100,
    },
    {
      field: "Descripcion",
      headerName: "Fondo",
      width: 300,
      description: "Fondo",
    },
    {
      field: "distribuido",
      headerName: "Importe Distribuido",
      width: 200,
      description: "Importe Distribuido",
      ...Moneda,
    },
    {
      field: "distribucionactualizada",
      headerName: "Distribución Actualizada",
      width: 200,
      description: "Importe Distribuido",
      ...Moneda,
    },
    
  ];

  
  const handleVersion = () => {
    setOpenModal(true);
  };

 
  const handleClick = () => {
    setslideropen(true);
    let data = {
      NUMOPERACION: 2,
    };
    calculosServices.AjusteSemestralIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setslideropen(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        setslideropen(false);
      }
    });
  };
  
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  useEffect(() => {
    handleClick();

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AJUSTESEMESTRAL") {
        if (String(item.Referencia) === "AGREGAR") {
          setagregar(true);
        }
        if (String(item.Referencia) === "ELIMINAR") {
          setEliminar(true);
        }
      }
    });
  }, []);

  return (
    <>
      <Slider open={slideropen}></Slider>
      {openModal ? (      <AjSemestralModal handleClose={handleclose}     />
      ) : (
        ""
      )}

     {openDetail ? (      <AjSemestralDetail handleClose={handleclose} row={vrows}     />
      ) : (
        ""
      )}

      <div>
        <Grid container spacing={1} padding={2}>
          <Grid container item spacing={1} xs={12} sm={12} md={12} lg={12}>
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid className="Titulo" container item xs={12} >
                <Typography variant="h4" paddingBottom={2}>
                 Ajuste Semestral
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {true ? (
            <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              <Tooltip title="Generar">
                <ToggleButton className="enviar-mensaje" value="check" onClick={() => handleVersion()}>
                  <AutoModeIcon />
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          ) : (
            ""
          )}
       
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MUIXDataGridGeneral
              modulo={"DistribucionDaf"}
              handleBorrar={handleBorrar} columns={columnsParticipaciones} rows={data} controlInterno={"AJUSTESEMESTRAL"} multiselect={true} />
          </Grid>
        </Grid>
      </div>

    
     
    </>
  );
};


