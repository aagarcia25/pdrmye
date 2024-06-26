import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import Select from "react-select";

import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { GridColDef } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import {
  default as SelectValues,
  default as SelectValuesCatRetenciones,
} from "../../../interfaces/Select/SelectValues";
import {
  IndexPaRetenciones,
  USUARIORESPONSE,
} from "../../../interfaces/user/UserInfo";
import { DPCPServices } from "../../../services/DPCPServices";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getUser } from "../../../services/localStorage";
import SelectFrag from "../Fragmentos/SelectFrag";
import MUIXDataGrid from "../MUIXDataGrid";
import ModalForm from "../componentes/ModalForm";
import { Moneda, currencyFormatter } from "../menu/CustomToolbar";
import ButtonsAdd from "../menu/catalogos/Utilerias/ButtonsAdd";

export const Retenciones = ({
  handleClose,
  tipo,
  dt,
  permisoAagregarRetenciones,
  permisoEditarRetencion,
  permisoEliminarRetencion,
}: {
  handleClose: Function;
  tipo: number;
  dt: any;
  permisoAagregarRetenciones: boolean;
  permisoEditarRetencion: boolean;
  permisoEliminarRetencion: boolean;
}) => {
  // CAMPOS DE LOS FORMULARIOS
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [idPA, setIdPA] = useState("");

  const [idReg, setIdReg] = useState("");
  const [dataRow, setdataRow] = useState([]);
  const [openModalDes, setOpenModalDes] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);

  const [value, setValue] = useState("");
  const [desPar, setDesPar] = useState<string>();
  const [otrosCar, setOtrosCar] = useState<string>();
  const [importe, setImporte] = useState("");
  const [numOperacion, setNumOperacion] = useState("");
  const [claveRet, setClaveRet] = useState("");
  const [descRet, setDescRet] = useState("");
  const [ValRet, setValRet] = useState("");
  const [numOperacionOp, setNumOperacionOp] = useState<SelectValues[]>([]);
  const [claveRetencionOp, setclaveRetencionOp] = useState<
    SelectValuesCatRetenciones[]
  >([]);
  const [idRetencion, setIdRetencion] = useState("");
  // const [sumaDescuentos, setSumaDescuentos] = useState<number>(0);
  const [totalRetenciones, setTotalRetenciones] = useState<number>(0);
  const [sumaTotal, setSumaTotal] = useState<Number>();

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 100 },
    {
      field: "Acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Acciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <Box>
            {permisoEliminarRetencion ? (
              <Tooltip title="Eliminar Retención">
                <IconButton onClick={() => handleEliminarDescuento(v)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            {permisoEditarRetencion ? (
              <Tooltip title="Editar Descuento">
                <IconButton onClick={() => handleOpen(true, v)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    {
      field: "tipo",
      headerName: "Tipo",
      description: "Tipo",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.tipo == 1 ? "Acredor" : "Deudor"}</Box>;
      },
    },
    {
      field: "ClaveRetencion",
      headerName: "Clave Retención",
      description: "Numero De Operación",
      width: 150,
    },
    {
      field: "ClaveTipoRetencion",
      headerName: "Clave De Deudor/Acredor",
      description: "Clave De Deudor/Acredor",
      width: 250,
    },

    {
      field: "Des",
      headerName: "Descripcion",
      description: "Descripcion",
      width: 200,
    },
    {
      field: "ClaveAuxiliar",
      headerName: "Clave Auxiliar",
      description: "Clave Auxiliar",
      width: 200,
    },

    {
      field: "importe",
      headerName: "Total",
      description: "Total",
      width: 200,
      ...Moneda,
      renderHeader: () => (
        <>
          {"Total: " +
            (sumaTotal == undefined
              ? "0"
              : currencyFormatter.format(Number(sumaTotal)))}
        </>
      ),
    },
  ];

  const consulta = (v: string) => {
    let data = {
      NUMOPERACION: 4,
      IDMUNICIPIO: dt?.row?.idmunicipio,
      IDPA: dt?.row?.id,
    };

    DPCPServices.IndexPaRetenciones(data).then((res) => {
      if (res.SUCCESS) {
        setdataRow(res.RESPONSE);
        var sumaDes = 0;
        var sumaRet = 0;
        var sumatotal = 0;
        if (v == "add") {
          res.RESPONSE.map((item: IndexPaRetenciones) => {
            if (item.Tipo == "1") {
              sumaDes = sumaDes + Number(item.total);
            } else if (item.Tipo == "2") {
              sumaRet = sumaRet + Number(item.total);
            }
          });
        }
        if (v == "remove") {
          res.RESPONSE.map((item: IndexPaRetenciones) => {
            if (item.Tipo == "1") {
              sumaDes = sumaDes - Number(item.total);
            } else if (item.Tipo == "2") {
              sumaRet = sumaRet - Number(item.total);
            }
          });
        }
        res.RESPONSE.map((item: IndexPaRetenciones) => {
          sumatotal = sumatotal + Number(item.importe);
          setSumaTotal(sumatotal);
        });

        if (res.RESPONSE.length == 0) {
          setSumaTotal(0);
        }
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  const handleEliminarDescuento = (v: any) => {
    Swal.fire({
      icon: "warning",
      title: "Remover Retención",
      text: "",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 2,
          CHID: v.row.id,
          IDPA: idPA,
        };
        DPCPServices.IndexPaRetenciones(data).then((res) => {
          if (res.SUCCESS) {
            consulta("remove");
            setTotalRetenciones(totalRetenciones - v.row.importe);
            setDescRet("");
            setValRet("");
            setIdRetencion("");
            setImporte("");
            setOpenModalDes(false);
            setNumOperacion("");
            setClaveRet("");
            Toast.fire({
              icon: "success",
              title: "Retención Eliminada!",
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
  };

  const handleAplicarRetencion = () => {
    if (
      Number(dt.row.total) -
        totalRetenciones -
        (importe !== undefined ? Number(importe) : 0) >=
      0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Aplicar Retención",
        text: "",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {
            IDREG: idReg,
            NUMOPERACION: editar ? 3 : 1,
            CHUSER: user.Id,
            IDMUNICIPIO: dt?.row?.idmunicipio,
            TIPO: numOperacion,
            IDPA: dt?.row?.id,
            IDDIVISA: dt?.row?.idDivisa,
            IMPORTE: importe,
            IDRETENCION: idRetencion,
            CLAVE: numOperacion == "1" ? dt.row.Proveedor : dt.row.Deudor,
          };
          DPCPServices.IndexPaRetenciones(data).then((res) => {
            if (res.SUCCESS) {
              setTotalRetenciones(totalRetenciones + Number(importe));
              setDescRet("");
              setValRet("");
              setIdRetencion("");
              setImporte("0");
              consulta("add");
              setOpenModalDes(false);
              setNumOperacion("");
              setClaveRet("");
              setEditar(false);

              Toast.fire({
                icon: "success",
                title: "Retención Agregada!",
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
    } else {
      Swal.fire({
        icon: "warning",
        title: "Solicitar",
        text: "El resultado de aplicar la retencion no puede dar un numero negativo",
        showDenyButton: false,
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleSelectNumOp = (e: any) => {
    setNumOperacion(e);
  };

  const handleSelectCveRet = (e: any) => {
    // setCveReten(e);
  };

  const handleOpen = (editar: boolean, v: any) => {
    if (editar) {
      setNumOperacion(String(v.row.tipo));
      setClaveRet(String(v.row.ClaveRetencion));
      setDescRet(v.row.Des);
      setValRet(v.row.Retencion);
      setIdReg(v.row.id);
      setOpenModalDes(true);
      setImporte(v.row.importe);
      setEditar(true);
      setIdRetencion(v.row.IdRetencion);
    } else {
      setOpenModalDes(true);
    }
  };

  const handleCloseModal = () => {
    setValue("");
    setOpenModalDes(false);
    setOtrosCar("0");
    setDesPar("0");
    setImporte("0");
    setNumOperacion("");
    setClaveRet("");
    setDescRet("");
    setValRet("");
    setEditar(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setOtrosCar("0");
    setDesPar("0");
    setImporte("0");
    handleSelectNumOp("false");
    handleSelectCveRet("");
    setNumOperacion("");
  };

  const onInputChange = (v: any) => {
    if (v == "") {
      setClaveRet("");
      setDescRet("");
      setValRet("");
      setIdRetencion("");
    } else {
      setClaveRet(v.value);
      setDescRet(v.Descripcion);
      setValRet(v.retencion);
      setIdRetencion(v.id);
    }
  };

  useEffect(() => {
    setNumOperacionOp([
      {
        value: "1",
        label: "Acredor",
      },
      {
        value: "2",
        label: "Deudor",
      },
    ]);
    let data = {
      NUMOPERACION: 5,
    };
    CatalogosServices.IndexCatRetenciones(data).then((res) => {
      if (res.SUCCESS) {
        setclaveRetencionOp(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });

    consulta("add");

    if (dt == "") {
    } else {
      setIdPA(dt?.row?.id);
    }
  }, [dt]);

  return (
    <>
      <ModalForm title={"Edición de Retenciones"} handleClose={handleClose}>
        <Grid container>
          <Grid item>
            <label>
              {"Año:  " + dt.row.Anio}
              <br />
              {"Mes: " + dt.row.Mes}
              <br />
              {"Municipio: " + dt.row.Nombre}
              <br />
              {"Total Bruto: $" + Number(dt.row.total).toLocaleString("es-US")}
              <br />
              {"Recuperación de adeudos: $" +
                Number(dt.row.RecAdeudos).toLocaleString("es-US")}
              <br />
              {"Descuentos: $" +
                Number(dt.row.Descuentos).toLocaleString("es-US")}
              <br />
              {"Retenciones: $" +
                Number(sumaTotal ? sumaTotal : 0).toLocaleString("es-US")}
              <br />
              {" Total Neto: $" +
                (
                  Number(dt.row.total) -
                  (Number(dt.row.RecAdeudos) +
                    Number(dt.row.Descuentos) +
                    Number(sumaTotal ? sumaTotal : 0))
                ).toLocaleString("es-ES")}
              <br />
              {/* {" Tipo de Solcitud: " + dt.row.TipoSolicitud} */}
              {/* <br /> */}
            </label>
          </Grid>

          <Grid item></Grid>
        </Grid>
        <ButtonsAdd
          handleOpen={() => handleOpen(false, {})}
          agregar={permisoAagregarRetenciones}
        />
        <MUIXDataGrid columns={columns} rows={dataRow} />
      </ModalForm>

      {openModalDes ? (
        <Dialog open={openModalDes}>
          <Grid container justifyContent="space-between">
            <DialogTitle>Edición de Retenciones</DialogTitle>
            <Button variant="outlined" onClick={() => handleCloseModal()}>
              <Tooltip title="Salir">
                <CloseIcon color="error" onClick={() => handleCloseModal()} />
              </Tooltip>
            </Button>
          </Grid>
          <DialogContent dividers>
            <Grid container>
              <Grid>
                <label>{"Tipo de retención"}</label>
              </Grid>
              <SelectFrag
                value={numOperacion}
                options={numOperacionOp}
                onInputChange={handleSelectNumOp}
                placeholder={"Seleccionar   tipo de retención"}
                label={"Seleccionar   tipo de retención"}
                disabled={false}
              />
            </Grid>

            <Grid container>
              <Grid>
                <label>{"Clave de retención"}</label>
              </Grid>
              <FormControl sx={{ width: "100%" }}>
                <Select
                  value={claveRetencionOp.find(
                    (element) => element.label == claveRet
                  )}
                  options={claveRetencionOp}
                  isDisabled={numOperacion == "" || numOperacion == "false"}
                  isClearable={true}
                  isSearchable={true}
                  backspaceRemovesValue={true}
                  onChange={(v) =>
                    v == null ? onInputChange("") : onInputChange(v)
                  }
                  placeholder={descRet !== "" ? descRet : ""}
                  // styles={{
                  //   menu: (base: any) => ({
                  //     position: "absolute",
                  //     paddingLeft: "1rem",
                  //     zIndex: 500,
                  //     ...base,
                  //   }),
                  // }}
                />
              </FormControl>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={4}>
                <Grid>
                  <label>
                    {"Clave: " +
                      (numOperacion == "false" || numOperacion == ""
                        ? ""
                        : numOperacion == "1"
                        ? "Acredor"
                        : " Deudor")}
                  </label>
                </Grid>

                <TextField
                  required
                  disabled
                  margin="dense"
                  id="Proveedor"
                  // label={value == "" ? "" : value == "Anticipo" ? "Proveedor" : "Deudor"}
                  value={
                    numOperacion == "false" || numOperacion == ""
                      ? ""
                      : numOperacion == "1"
                      ? dt.row.Proveedor
                      : dt.row.Deudor
                  }
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Clave retención</label>
                <TextField
                  disabled
                  required
                  margin="dense"
                  id="Proveedor"
                  // label="Descuento Parcial"
                  value={claveRet}
                  type="text"
                  variant="outlined"
                  // onChange={(v) => setDesPar(v.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={4}>
                <label>Retención</label>
                <TextField
                  required
                  disabled
                  margin="dense"
                  id="Proveedor"
                  // label="Descuento Total"
                  value={ValRet}
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <label>Descripción retención</label>
                <TextField
                  disabled
                  required
                  fullWidth
                  margin="dense"
                  id="Proveedor"
                  value={descRet}
                  type="text"
                  variant="outlined"
                  // onChange={(v) => setOtrosCar(v.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <Grid container>
              <label>Importe</label>
              <TextField
                disabled={numOperacion == "" || numOperacion == "false"}
                margin="dense"
                id="Proveedor"
                value={importe ? importe : null}
                type="text"
                fullWidth
                variant="outlined"
                onChange={(v) => setImporte(v.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ maxLength: 20 }}
                error={String(Number(importe)) == "NaN"}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className={editar ? "actualizar" : "guardar"}
              disabled={
                claveRet == "" ||
                numOperacion == "" ||
                numOperacion == "false" ||
                Number(importe) <= 0 ||
                String(Number(importe)) == "NaN"
              }
              onClick={handleAplicarRetencion}
            >
              {" "}
              {editar ? "Actualizar" : "Aplicar"}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </>
  );
};
