import { useEffect, useState } from "react";
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { Toast } from '../../../../../helpers/Toast';
import ButtonsAdd from '../Utilerias/ButtonsAdd';
import { getPermisos, getUser } from '../../../../../services/localStorage';
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { AlertS } from '../../../../../helpers/AlertS';
import Swal from 'sweetalert2';
import BotonesAcciones from '../../../componentes/BotonesAcciones';
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGrid from '../../../MUIXDataGrid';
import { CATORGModal } from "./CATORGModal";
import { IconButton, Tooltip } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UsuarioResponsable from "../../../DAMOP/UsuarioResponsable";
import NombreCatalogo from "../../../componentes/NombreCatalogo";

export const CATORG = () => {
  const [data, setData] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [openUR, setOpenUR] = useState(false);
  const [idMun, setIdMun] = useState("");
  const [nombreMun, setNombreMun] = useState("");



  const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <>
            <BotonesAcciones
              handleAccion={handleAccion}
              row={v}
              editar={editar}
              eliminar={eliminar} />

            {true ? (
              <Tooltip title={"Visualizar Usuario Responsable"}>
                <IconButton onClick={() => handleUR(v)}>
                  <ManageAccountsIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    { field: "Descripcion", headerName: "Descripcion", description: "Descripcion", width: 450 },
    { field: "ClavePSIREGOB", headerName: "Clave Proveedor Siregob ", description: "Clave Proveedor Siregob ", width: 300 },
    { field: "ClaveDSIREGOB", headerName: "Clave Deudor Siregob", description: "Clave Deudor Siregob", width: 300 },
    { field: "Clasificador01", headerName: "Clasificador 01", description: "Clasificador 01", width: 300 },
    { field: "Clasificador02", headerName: "Clasificador 02", description: "Clasificador 02", width: 300 },
    { field: "Clasificador03", headerName: "Clasificador 03", description: "Clasificador 03", width: 300 },
    { field: "Clasificador04", headerName: "Clasificador 04", description: "Clasificador 04", width: 300 },
    { field: "Clasificador05", headerName: "Clasificador 05", description: "Clasificador 05", width: 300 },
    { field: "Clasificador06", headerName: "Clasificador 06", description: "Clasificador 06", width: 300 },
    { field: "Clasificador07", headerName: "Clasificador 07", description: "Clasificador 07", width: 300 },
    { field: "Clasificador08", headerName: "Clasificador 08", description: "Clasificador 08", width: 300 },
    { field: "Clasificador09", headerName: "Clasificador 09", description: "Clasificador 09", width: 300 },
    { field: "Clasificador10", headerName: "Clasificador 10", description: "Clasificador 10", width: 300 },
    { field: "Clasificador11", headerName: "Clasificador 11", description: "Clasificador 11", width: 300 },


  ];

  const handleUR = (v: any) => {
    setOpenUR(true);
    // setData(v);
    setIdMun(v.row.id);
    setNombreMun(v.row.Descripcion);
  };

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      //console.log(v);
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      Swal.fire({
        icon: "info",
        title: "Estas seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          //console.log(v);
          const user: RESPONSE = JSON.parse(String(getUser()));

          let data = {
            NUMOPERACION: 3,
            CHID: v.row.id,
            CHUSER: user.id,
          };
          //console.log(data);

          CatalogosServices.Organismos(data).then((res) => {
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
              AlertS.fire({
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
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUR(false);
    consulta({ NUMOPERACION: 4 });

  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows(v);
  };

  const consulta = (data: any) => {
    CatalogosServices.Organismos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        //console.log(res);
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  useEffect(() => {

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "ORG") {
        //console.log(item)
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
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      {openUR ? (
        <UsuarioResponsable handleClose={handleClose} id={idMun} nombre={nombreMun} tipo={"ORG"} />
      ) : (
        ""
      )}
      {open ? (
        <CATORGModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <NombreCatalogo controlInterno={"ORG"} />
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  )
}
