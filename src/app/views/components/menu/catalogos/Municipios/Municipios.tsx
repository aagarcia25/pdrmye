import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Modal,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import Slider from "../../../Slider";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { messages } from "../../../../styles";
import MUIXDataGrid from "../../../MUIXDataGrid";
import AccionesGrid from "../../../AccionesGrid";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import MunicipiosModal from "./MunicipiosModal";
import Buttons from "../Utilerias/Buttons";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";

export const Municipios = () => {
  const [municipio, setMunicipio] = useState([]);
  const user = getUser();

  const [modo, setModo] = useState("");

  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);

  console.log("Municipio :", municipio);
  console.log("modo :", modo);
  console.log("open :", open);
  console.log("tipoOperacion :", tipoOperacion);
  console.log("data :", data);
  console.log("plantilla :", plantilla);
  console.log("slideropen :", slideropen);

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "Identificador",
      width: 150,
      description: messages.dataTableColum.id,
    },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
    { field: "Nombre", headerName: "Municipio", width: 250 },

    //{ field: "ClaveMun", headerName: "Clave Municipio", width: 150 },
    {
      field: "MAM",
      headerName: "Área Metropolitana",
      width: 150,
      renderCell: (v) => {
        return v.row.MAM === 1 ? "SI" : "NO";
      },
    },
    {
      field: "Descentralizado",
      headerName: "Descentralizado",
      width: 120,
      renderCell: (v) => {
        return v.row.Descentralizado === 1 ? "SI" : "NO";
      },
    },
    { field: "NombreCorto", headerName: "Nombre Corto", width: 250 },
    { field: "OrdenSFTGNL", headerName: "Orden SFTGNL", width: 120 },
    { field: "ClaveSIREGOB", headerName: "Clave SIREGOB", width: 120 },
    { field: "ClaveINEGI", headerName: "Clave INEGI", width: 120 },
    {
      field: "ArtF1",
      headerName: "ARTF1",
      width: 120,
      renderCell: (v) => {
        return v.row.ArtF1 === "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF2",
      headerName: "ARTF2",
      width: 120,
      renderCell: (v) => {
        return v.row.ArtF2 === "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF3",
      headerName: "ARTF3",
      width: 120,
      renderCell: (v) => {
        return v.row.ArtF3 === "1" ? "SI" : "NO";
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <AccionesGrid
            handleEditar={handleEdit}
            handleBorrar={handleDelete}
            v={v}
            update={true}
            pdelete={true}
          />
        );
      },
    },
  ];

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setData("");
  };

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setData(v);
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
        const user: RESPONSE = JSON.parse(String(getUser()));

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id,
        };
        console.log(data);

        CatalogosServices.municipios(data).then((res) => {
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
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "MunFacturacion");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
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

  const consulta = (data: any) => {
    CatalogosServices.municipios(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        console.log(data);
        setMunicipio(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        console.log(res);
        console.log(res.SUCCESS);
      }
    });
  };

  useEffect(() => {
    console.log();
    let data = {
      NUMOPERACION: 4,
    };

    CatalogosServices.municipios(data).then((res) => {
      setMunicipio(res.RESPONSE);
    });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      {open ? (
        <MunicipiosModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}

      <Buttons
        handleOpen={handleOpen}
        url={plantilla}
        handleUpload={handleUpload}
      />

      <MUIXDataGrid sx={{}} columns={columns} rows={municipio} />
    </div>
  );
};
