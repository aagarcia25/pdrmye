import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Input,
  FormControlLabel,
  Checkbox,
  Box
  
} from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { CatalogosServices } from "../../../services/catalogosServices";
import { AlertS } from "../../../helpers/AlertS";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";
import SelectFrag from "../Fragmentos/SelectFrag";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { InputAdornment } from "@mui/material";
import { DPCPServices } from "../../../services/DPCPServices";
import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../MUIXDataGrid";
export const Descuentos = ({
  handleClose,
  tipo,
  dt,
}: {
  handleClose: Function;
  tipo: number;
  dt: any;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [id, setId] = useState("");

  const [dataRow, setdataRow] = useState([]);


  const [proveedores, setProveedores]= useState<SelectValues[]>([]);
  const [clasificiones, setClasificaciones]= useState<SelectValues[]>([]);
  const [tiposAnticipos, setTiposAnticipos]= useState<SelectValues[]>([]);

  const[idTipoAnticipo, setIdTipoAnticipo] = useState("");
  const[idProveedor, setIdProveedor] = useState("");
  const[monto, setMonto] = useState<number>();
  const[observaciones, setObservaciones]= useState("");
  const[ppt, setppt]= useState<boolean>(false);
  const[ddt, setddt]= useState<boolean>(false);
  const[clasificacion, setClasificacion]= useState("");


  const columns: GridColDef[] = [

    { field: "id", headerName: "Identificador", hide: true, width: 150},
    { field: "fechaInicio", headerName: "Fecha de Inicio", width: 200 },
    { field: "FechaFin", headerName: "Expiracion", width: 200 },
    { field: "Nombre", headerName: "Nombre", width: 250 },
    { field: "Descripcion", headerName: "Descripcion", width: 500 },
    { field: "NombreDocumento", headerName: "NombreDocumento", hide: true, width: 150, },
  ];

  
  const handleSelect01 = (v: SelectValues) => {
    if(String(v) === "1"){
      loadFilter(20);
    }else{
      loadFilter(21);
    }
    setIdTipoAnticipo(String(v));
  };

  const handleSelect02 = (v: SelectValues) => {
    setIdProveedor(String(v));
  };

  const handleSelect03 = (v: SelectValues) => {
    setClasificacion(String(v));
  };

  const handleChangeppt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setppt(event.target.checked);
  };


  const handleChangeddt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setddt(event.target.checked);
  };



  const handleRequest = (data: any) => {
    //console.log(data);
    if (tipo === 1) {
      //AGREGAR
      agregar(data);
    } else if (tipo === 2) {
      //EDITAR

      editar(data);
    }
  };

  const agregar = (data: any) => {
    CatalogosServices.Bancos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.Bancos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consulta = (data: any) => {
    DPCPServices.getDescuentos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 2) {
        // setMeses(res.RESPONSE);
      } else if (operacion === 19) {
        setTiposAnticipos(res.RESPONSE);
      } else if (operacion === 20) {
        setProveedores(res.RESPONSE);
      } else if (operacion === 21) {
        setProveedores(res.RESPONSE);
      }else if (operacion === 22){
        setClasificaciones(res.RESPONSE)
      }
    });
  };


  useEffect(() => {

    loadFilter(19);
    loadFilter(22);

    if (dt === "") {
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
   
    }
  }, [dt]);

  return (
    <>
      <ModalForm
        title={"Edición de Descuentos"}
        handleClose={handleClose}
      >
    
    <MUIXDataGrid columns={columns} rows={dataRow} />
      </ModalForm>
    </>
  );
};
