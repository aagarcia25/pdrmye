import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { Moneda } from "../CustomToolbar";
import { Toast } from "../../../../helpers/Toast";
import { Alert } from "../../../../helpers/Alert";
import { calculosServices } from "../../../../services/calculosServices";
import ButtonsBack from "../catalogos/Utilerias/ButtonsBack";
import MUIXDataGrid from "../../MUIXDataGrid";
import { columnasCal } from "../../../../interfaces/calculos/columnasCal";
import Slider from "../../Slider";


import { getMenus, getPermisos } from "../../../../services/localStorage";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import BotonesOpciones from "../../componentes/BotonesOpciones";


const DetalleFgp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [fondo, setFondo] = useState("");
  ////////////////////////

  const handleTras = (v: string) => {
    setIdtrazabilidad(v);
    setOpenTrazabilidad(true);
};


  const [autorizar, setAutorizar] = useState<boolean>(false);
  const [cancelar, setCancelar] = useState<boolean>(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [enviar, setEnviar] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [openTrazabilidad, setOpenTrazabilidad] = useState(false);

  const [idtrazabilidad, setIdtrazabilidad] = useState("");


  //////////////////
  const [openSlider, setOpenSlider] = useState(false);
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

  const handleTraz = (v: any) => {
    setIdtrazabilidad(v.row.id);
    setOpenTrazabilidad(true);
  };


  const handleAccion = (v: any) => {

    if (v == 1) {
      navigate(`/inicio/participaciones/${fondo}`);
    } else
      if (v == 2) {
      }
    if (v == 3) {
    }
    if (v == 4) {
    }
    if (v == 5) {
    }
  };

  const columnas = (data: any) => {
    setOpenSlider(true);
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
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consulta = (data: any) => {
    setOpenSlider(true);
    calculosServices.calculosInfodetalle(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
        setOpenSlider(false);
      } else {
        setOpenSlider(false);
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
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
      width: 150,
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
  ];

  let params = useParams();
  useEffect(() => {

    setFondo(String(params.fondo));
    setTimeout(() => {
      columnas({ IDCALCULOTOTAL: params.id });
      consulta({ IDCALCULOTOTAL: params.id });
    }, 2000);
  }, []);

  return (
    <div>
      <Box>
        <Slider open={openSlider}></Slider>

        <BotonesOpciones 
          handleAccion={handleAccion}
          autorizar={autorizar}
          cancelar={cancelar}
          verTrazabilidad={verTrazabilidad}
          enviar={enviar}
          handleTras={handleTras} 
          idDetalle={""} />

        <MUIXDataGrid columns={columns} rows={data} />
      </Box>
    </div>
  );
};

export default DetalleFgp;
