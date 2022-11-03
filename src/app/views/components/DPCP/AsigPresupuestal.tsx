import { Box, Button, Grid, IconButton, Link, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/Select/SelectFrag";
import SendIcon from '@mui/icons-material/Send';
import { Alert } from "../../../helpers/Alert";
import { calculosServices } from "../../../services/calculosServices";
import { columnasCal } from "../../../interfaces/calculos/columnasCal";
import { Moneda } from "../menu/CustomToolbar";
import MUIXDataGrid from "../MUIXDataGrid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";

const AsigPresupuestal = () => {


    //Constantes para llenar los select
    const [estatus, setEstatus] = useState<SelectValues[]>([]);
    const [fondos, setFondos] = useState<SelectValues[]>([]);
    const [anios, setAnios] = useState<SelectValues[]>([]);
    const [mes, setMeses] = useState<SelectValues[]>([]);


    //Constantes de los filtros
    const [idEstatus, setIdEstatus] = useState("");
    const [idFondo, setIdFondo] = useState("");
    const [idanio, setIdanio] = useState("");
    const [idmes, setIdmes] = useState("");
//Constantes para las columnas 
const [data, setData] = useState([]);
const [pa, setPa] = useState(false);
const [sa, setSa] = useState(false);
const [ta, setTa] = useState(false);
const [ca, setCa] = useState(false);
const [ad, setAd] = useState(false);
const [as, setAs] = useState(false);
const [aa, setAa] = useState(false);
const [rf, setRf] = useState(false);
const [cf, setCf] = useState(false);
const [ae, setAe] = useState(false);
const [af, setAf] = useState(false);
const [presupuesto, setPresupuesto] = useState<boolean>(false);
const [openTrazabilidad, setOpenTrazabilidad] = useState(false);
const user: RESPONSE = JSON.parse(String(getUser()));

const columnas = (data: any) => {
    calculosServices.getColumns(data).then((res) => {
      if (res.SUCCESS) {
        const cl: columnasCal[] = res.RESPONSE;
        cl.map((item) => {
          console.log(item.keys);
          switch (item.keys) {
            case 0:
              break;
            case 1:
              setPa(true);
              break;
            case 2:
              setSa(true);
              break;
            case 3:
              setTa(true);
              break;
            case 4:
              setCa(true);
              break;
            case 5:
              setAd(true);
              break;
            case 6:
              setAa(true);
              break;
            case 7:
              setAs(true);
              break;
            case 8:
              setRf(true);
              break;
            case 9:
              setCf(true);
              break;
            case 10:
              setAe(true);
              break;
            case 11:
              setAf(true);
              break;
            default:
              break;
          }
        });
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  const agregarPresupuesto = (data: any) => {
   
  };



  const columns = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      width: 150,
      description: "Identificador del Municipio",
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      width: 250,
      description: "Nombre del Municipio",
    },
    {
      field: "Mensual",
      headerName: "Importe",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: pa ? false : true,
      field: "PrimerAjuste",
      headerName: "Primer Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: sa ? false : true,
      field: "SegundoAjuste",
      headerName: "Segundo Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ta ? false : true,
      field: "TercerAjuste",
      headerName: "Tercer Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ca ? false : true,
      field: "CuartoAjuste",
      headerName: "Cuarto Ajuste",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ad ? false : true,
      field: "AjusteAnual",
      headerName: "Ajuste Anual",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: as ? false : true,
      field: "AjusteSemestral",
      headerName: "Ajuste Semestral",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: aa ? false : true,
      field: "AjusteDefinitivo",
      headerName: "Ajuste Definitivo",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: ae ? false : true,
      field: "AjusteEstatal",
      headerName: "Ajuste Estatal",
      width: 150,
      description: "Importe",
      ...Moneda,
    },
    {
      hide: rf ? false : true,
      field: "CompensacionFEIF",
      headerName: "Compensación FEIF",
      width: 150,
      description: "Compensación FEIF",
      ...Moneda,
    },
    {
      hide: cf ? false : true,
      field: "RetencionFEIF",
      headerName: "Retención FEIF",
      width: 150,
      description: "Retención FEIF",
      ...Moneda,
    },
    {
      hide: af ? false : true,
      field: "AjusteFofir",
      headerName: "Ajuste FOFIR",
      width: 150,
      description: "Ajuste FOFIR",
      ...Moneda,
    },
    {
      field: "total",
      headerName: "Total",
      width: 150,
      description: "Total",
      ...Moneda,
    },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
          
              <Tooltip title="Asignar Presupuesto">
                <IconButton onClick={() => agregarPresupuesto(v)}>
                  <AttachMoneyIcon />
                </IconButton>
              </Tooltip>
           
          </Box>
        );
      },
    },

    {
      hide: presupuesto ? false : true,
      field: "ComentarioPresupuesto",
      headerName: "Observación DPCP",
      width: 300,
      description: "Observación DPCP",
    },

    {
      hide: presupuesto ? false : true,
      field: "RutaArchivo",
      headerName: "Documento DPCP",
      width: 100,
      renderCell: (v: any) => {
        return v.row.RutaArchivo !== null ? (
          <Box>
            <Link href={v.row.RutaArchivo} underline="always">
              Descargar
            </Link>
          </Box>
        ) : (
          ""
        );
      },
    },
  ];

const loadFilter = (operacion: number) => {
        let data = { NUMOPERACION: operacion };
          CatalogosServices.SelectIndex(data).then((res) => {
          
            if(operacion == 8){
                setEstatus(res.RESPONSE);
            }else if(operacion == 12){
                setFondos(res.RESPONSE);
            }else if(operacion == 4){
                setAnios(res.RESPONSE);
            }else if(operacion == 2){
                setMeses(res.RESPONSE);
            }
           
          });
        }

    const handleFilterChange1 = (v: string) => {
            setIdEstatus(v);
    };

    const handleFilterChange2 = (v: string) => {
        setIdFondo(v);
    };

    const handleFilterChange3 = (v: string) => {
        setIdFondo(v);
    };

    const handleFilterChange4 = (v: string) => {
        setIdFondo(v);
    };


const handleClick = () => {
   
};
        

        useEffect(() => {  
            loadFilter(2);
            loadFilter(4);  
            loadFilter(8);
            loadFilter(12);
          }, []);     

  return (
    <div>
      <Grid container spacing={1}>
        
        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={2}>
         <Typography   sx={{ fontFamily: "MontserratMedium"}}>Procesos:</Typography>
          <SelectFrag
                  value={idEstatus}
                  options={estatus}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Estatus"}
                  label={""}
                  disabled={false}
                />
          </Grid>
          
         <Grid item xs={2}>
         <Typography   sx={{ fontFamily: "MontserratMedium"}}>Procesos:</Typography>
          <SelectFrag
                  value={idEstatus}
                  options={estatus}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Estatus"}
                  label={""}
                  disabled={false}
                />
          </Grid>


          <Grid item  xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Estatus:</Typography>
          <SelectFrag
                  value={idEstatus}
                  options={estatus}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Estatus"}
                  label={""}
                  disabled={false}
                />
          </Grid>
          <Grid item  xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Año:</Typography>
          <SelectFrag
                  value={idanio}
                  options={anios}
                  onInputChange={handleFilterChange2}
                  placeholder={"Seleccione Año"}
                  label={""}
                  disabled={false}
                />
          </Grid>

          <Grid item  xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Mes:</Typography>
          <SelectFrag
                  value={idmes}
                  options={mes}
                  onInputChange={handleFilterChange3}
                  placeholder={"Seleccione Mes"}
                  label={""}
                  disabled={false}
                />
          </Grid>

          <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography   sx={{ fontFamily: "MontserratMedium"}}>Fondo:</Typography>
          <SelectFrag
                  value={idFondo}
                  options={fondos}
                  onInputChange={handleFilterChange4}
                  placeholder={"Seleccione Fondo"}
                  label={""}
                  disabled={false}
                />
          </Grid>
        
        
       
        </Grid>


        <Grid item xs={12} sm={12} md={12} lg={12}>
        <Button
         onClick={handleClick}
         variant="contained" 
         color="success" 
         endIcon={<SendIcon />}>
        Buscar
        </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography   sx={{ fontFamily: "MontserratMedium"}}>Para Realizar la consulta de Información es Requerido los filtros</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
        <MUIXDataGrid columns={columns} rows={data} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AsigPresupuestal;
