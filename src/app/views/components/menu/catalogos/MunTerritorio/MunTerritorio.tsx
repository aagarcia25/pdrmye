import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import Buttons from "../Utilerias/Buttons";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import MunTerritorioModal from "./MunTerritorioModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";



export const MunTerritorio = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [territorio, setTerritorio] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));


  // VARIABLES PARA LOS FILTROS


  //funciones



  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Km2", headerName: "Area", width: 150 },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <IconButton onClick={() => handleEdit(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(v)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },

  ];

  const handleClose = (v: string) => {
    if (v == "close") {
      setOpen(false);
    }
    else if (v == "save") {
      setOpen(false);
      let data = {
        NUMOPERACION: 4,

      };
      consulta(data);

    }
    console.log('cerrando');


  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setData("");
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

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        console.log(data);

        CatalogosServices.munterritorio(data).then((res) => {
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
    formData.append("tipo", "MunTerritorio");
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
    CatalogosServices.munterritorio(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setTerritorio(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };




  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_TERRITORIO",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    downloadplantilla();


  }, []);

  let dat = ({
    NUMOPERACION: 4,
    CHUSER: user.id
  })
  useEffect(() => {
    CatalogosServices.munterritorio(dat).then((res) => {
      setTerritorio(res.RESPONSE);
    });
  }, []);


  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>



      {open ? (
        <MunTerritorioModal
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
      <MUIXDataGrid columns={columns} rows={territorio} />

    </div>
  );
};
