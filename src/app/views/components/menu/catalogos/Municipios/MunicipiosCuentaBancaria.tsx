import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ButtonsAdd from "../Utilerias/ButtonsAdd";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ModalAlert from "../../../componentes/ModalAlert";
import { CuentaBancariaModal } from "../CuentaBancaria/CuentaBancariaModal";
import Slider from "../../../Slider";
import ModalForm from "../../../componentes/ModalForm";

export const MunicipiosCuentaBancaria = ({
    handleClose,
    dt,
}:{
    handleClose: Function;
    dt: any;
}) => {

  const [slideropen, setslideropen] = useState(true);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

 
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [texto, setTexto] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [cuentaBancaria, setCuentaBancaria] = useState([]);
  const [estatus, setEstatus] = useState("");






 

  const handleVisualizar = (v: any) => {
    setTipoOperacion(3);
    setOpen(true);
    setVrows(v);
  };

  const handlevalidar = (v: any) => {
    setEstatus('DAMOP_REVISION');
    setTexto("Enviar a Validación")
    setOpenModal(true);
    setVrows(v);
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
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <Tooltip title="Visualizar">
              <IconButton onClick={() => handleVisualizar(v)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            {
              (v.row.EstatusDescripcion == "INICIO" ? (
                <Tooltip title="Enviar a Validación">
                  <IconButton color="info" onClick={() => handlevalidar(v)}>
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              ))
            }

           
          </>
        );
      },
    },
    {
      field: "idusuario",
      headerName: "Identificador Usuario",
      width: 50,
      hide: true,
    },
    { field: "NombreCuenta", headerName: "Nombre de la Cuenta", width: 250 },
    { field: "NombreBanco", headerName: "Banco", width: 150 },
    {
      field: "idbanco",
      headerName: "Identificador Banco",
      width: 50,
      hide: true,
    },

    { field: "NumeroCuenta", headerName: "Cuenta", width: 250 },
    { field: "ClabeBancaria", headerName: "Clabe", width: 250 },
    {
      field: "idestatus",
      headerName: "Identificador Estatus",
      width: 50,
      hide: true,
    },
    { field: "EstatusDescripcion", headerName: "Estatus", width: 250 },
  ];


  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setVrows("");
  };

  const consulta = (data: any) => {
    CatalogosServices.CuentaBancaria(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        console.log(res.RESPONSE);
        setCuentaBancaria(res.RESPONSE);
        setslideropen(false);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
   /* permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "CUENTABANCARIA") {
        console.log(item);
        if (String(item.Referencia) == "AGREG") {
          setAgregar(true);
        }
       
      }
    });*/
    consulta({ CHUSER: dt.id, NUMOPERACION: 4 });
  }, []);

  return (

    <>
    <Slider open={slideropen}></Slider>
    <ModalForm
      title={"Usuario Responsable del Municipio"}
      handleClose={handleClose}
    >
     
     <div style={{ height: 600, width: "100%" }}>
      {open ? (
        <CuentaBancariaModal
          open={open}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <MUIXDataGrid columns={columns} rows={cuentaBancaria} />
    </div>

    </ModalForm>
    </>


   
  );
};
