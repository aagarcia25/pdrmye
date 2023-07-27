import {
  createTheme,
  Grid,
  Typography
} from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  esES as gridEsES, GridSelectionModel
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { calculosServices } from "../../../../services/calculosServices";
import { getPermisos, getUser } from "../../../../services/localStorage";
import { PERMISO, RESPONSE } from "../../../../interfaces/user/UserInfo";
import { Moneda } from "../../menu/CustomToolbar";
import Slider from "../../Slider";
import MUIXDataGridGeneral from "../../MUIXDataGridGeneral";
import { Toast } from "../../../../helpers/Toast";
import { AlertS } from "../../../../helpers/AlertS";

export const Ajanual = () => {
  const theme = createTheme(coreEsES, gridEsES);
  const [slideropen, setslideropen] = useState(false);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  //MODAL
  //Constantes de los filtros
  const [idtipo, setIdTipo] = useState("");
  const [idFondo, setIdFondo] = useState("");
  const [idMunicipio, setidMunicipio] = useState("");
  const [idestatus, setIdEstatus] = useState("");
  const [nombreMes, setNombreMes] = useState("");
  const [numOrdenPago, setNumOrdenPago] = useState("");
  //Constantes para las columnas
  const [data, setData] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  /// Permisos
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  ///// Modal de Administración de Speis
  const [openSpeis, setOpenSpeis] = useState(false);
  const [openCheque, setOpenCheque] = useState(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [agregarPoliza, setAgregarPoliza] = useState<boolean>(false);
  const [subirSpeis, setSubirSpeis] = useState<boolean>(false);
  const [pagaRegistro, setPagaRegistro] = useState<boolean>(false);




  const handleclose = (data: any) => {
    handleClick();
    setOpenSpeis(false);
    setOpenCheque(false);
  };

  const handleAccion = (data: any) => { };

  const columnsParticipaciones = [
    { field: "id", hide: true },
    {
      field: "anio", headerName: "Año", width: 150,
    },
    {
      field: "Descripcion",
      headerName: "Fondo",
      width: 120,
      description: "Fondo",
    },
    {
      field: "distribuido",
      headerName: "Importe Distribuido",
      width: 120,
      description: "Importe Distribuido",
      ...Moneda,
    },
    {
      field: "distribucionactualizada",
      headerName: "Distribución Actualizada",
      width: 120,
      description: "Importe Distribuido",
      ...Moneda,
    },
    
  ];

  

 
  const handleClick = () => {
    setslideropen(true);
    let data = {
      TIPO: 2,
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

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "AJUSTESEMESTRAL") {
        if (String(item.Referencia) === "TRAZASPEIDAF") {
          setVerTrazabilidad(true);
        }
        if (String(item.Referencia) === "POLIZASPEIDAF") {
          setAgregarPoliza(true);
        }

        if (String(item.Referencia) === "DAFSUBIRSPEI") {
          setSubirSpeis(true);
        }
        if(String(item.Referencia) === "DAFPAGASPEI"){
           setPagaRegistro(true);
        }
      }
    });
  }, []);

  return (
    <>
      <Slider open={slideropen}></Slider>
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

