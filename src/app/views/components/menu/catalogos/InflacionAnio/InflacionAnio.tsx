import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import InflacionAnioModal from "./InflacionAnioModal";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import { porcentage } from "../../CustomToolbar";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { fanios } from "../../../../../share/loadAnios";
import { Grid } from "@mui/material";


const InflacionAnio = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [dataInflacionAnio, setDataInflacionAnio] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [agregar, setAgregar] = useState<boolean>(false);
  const [plantilla, setPlantilla] = useState("");
  const [anios, setAnios] = useState<SelectValues[]>([]);

  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  //funciones

  const handleFilterChange = (v: string) => {
    setFilterAnio(v);

    let data = {
      NUMOPERACION: 4,
      ANIO: v,
    };
    if (v !== "false") {
      setFilterAnio(v);
      consulta(data);
    } else {
      consulta({ NUMOPERACION: 4, ANIO: "", });
      setFilterAnio("");

    }
  };


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
    { field: "Anio", headerName: "Año", description: "Año", width: 150 },
    { field: "Inflacion", headerName: "Inflación", description: "Inflación", width: 150, ...porcentage },

  ];

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  }

  const handleBorrar = () => {

  };
  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 })

  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };



  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro??",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(v);

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        //console.log(data);

        CatalogosServices.inflacionAnio(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            consulta({ NUMOPERACION: 4 });

          } else {
            AlertS.fire({
              title: "¡Error!",
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

  const consulta = (data: any) => {
    CatalogosServices.inflacionAnio(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setDataInflacionAnio(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  useEffect(() => {
    setAnios(fanios());
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "INFANIO") {
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
    consulta({ NUMOPERACION: 4 })
  }, []);

  return (
    <>
      {open ? (
        <InflacionAnioModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <NombreCatalogo controlInterno={"INFANIO"} />
      <Grid item xs={12} container  justifyContent={"space-between"}>
        <Grid item xs={2}>  <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
        </Grid>
        <Grid item xs={2}>  <SelectFrag
          value={plantilla}
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"}
          label={""}
          disabled={false}
        /> 
        </Grid>
       

      </Grid>
      <div style={{ height: 600, width: "100%" }}>
        <MUIXDataGridMun columns={columns} rows={dataInflacionAnio} modulo={"INFANIO"} handleBorrar={handleBorrar} controlInterno={"INFANIO"} />


      </div>

    </>

  )
}

export default InflacionAnio
