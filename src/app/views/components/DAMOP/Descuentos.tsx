import { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Input,
  FormControlLabel,
  Checkbox,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  IconButton,
  RadioGroup,
  Typography,
  Select

} from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import { CatalogosServices } from "../../../services/catalogosServices";
import { AlertS } from "../../../helpers/AlertS";
import { getDescuentos, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";
import { Toast } from "../../../helpers/Toast";
import SelectFrag from "../Fragmentos/SelectFrag";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { InputAdornment } from "@mui/material";
import { DPCPServices } from "../../../services/DPCPServices";
import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../MUIXDataGrid";
import ButtonsAdd from "../menu/catalogos/Utilerias/ButtonsAdd";
import CloseIcon from "@mui/icons-material/Close";
import Radio from '@mui/material/Radio';
import Swal from "sweetalert2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { currencyFormatter, Moneda } from "../menu/CustomToolbar";
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
  const [openModalDes, setOpenModalDes] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [desPar, setDesPar] = useState<number>(0);
  const [otrosCar, setOtrosCar] = useState<number>(0);
  const [ComentariosDes, setComentariosDes] = useState("");
  const [numOperacion, setNumOperacion] = useState("");
  const [numOperacionOp, setNumOperacionOp] = useState<SelectValues[]>([]);
  const [cveReten, setCveReten] = useState("");
  const [cveRetenOp, setCveRetenOp] = useState<SelectValues[]>([]);
  const [sumDes, setSumDes] = useState<number>(0);
  const [sumret, setSumRet] = useState<number>(0);
  const [sumaTotal, setSumaTotal] = useState<Number>();


  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 150 },
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
            <Tooltip title="Eliminar Descuento">
              <IconButton onClick={() => handleEliminarDescuento(v)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "Tipo", headerName: "Tipo", description: "Tipo", width: 200,
      renderCell: (v) => {
        return (
          <Box>
            {v.row.Tipo === "1" ? "Descuentos" : "Retenciones"}
          </Box>
        );
      },
    },
    { field: "NumOperacion", headerName: "Num De Operación", description: "Numero De Operación", width: 200 },
    {
      field: "ParcialDescuento", headerName: "Descuento Parcial", description: "Descuento Parcial", width: 200, ...Moneda
    },
    {
      field: "OtrosCargos", headerName: "Otros Cargos", description: "Otros Cargos", width: 200, ...Moneda
    },
    {
      field: "total", headerName: "Total", description: "Total", width: 200, ...Moneda,
      renderHeader: () => (
        <>
          {"Total: " + (sumaTotal === undefined ? "0" : currencyFormatter.format(Number(sumaTotal)))}
        </>
      ),
    },
    { field: "cveRetencion", headerName: "Retención CVE", description: "Retención CVE", width: 150, },
    { field: "DescripcionDescuento", headerName: "Descripción De Descuento", description: "Descripción De Descuento", width: 500, },

  ];

  const handleRequest = (data: any) => {
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

  const consulta = (v: string) => {
    let data = {
      CHID: dt.row.id,
    }

    DPCPServices.getDescuentos(data).then((res) => {
      if (res.SUCCESS) {
        setdataRow(res.RESPONSE)
        var sumaDes = 0;
        var sumaRet = 0;
        var sumatotal = 0;
        if (v === "add") {
          res.RESPONSE.map((item: getDescuentos) => {
            if (item.Tipo === "1") {
              sumaDes = sumaDes + Number(item.total)
            }
            else if (item.Tipo === "2") {
              sumaRet = sumaRet + Number(item.total)
            }

          });
        }
        if (v === "remove") {
          res.RESPONSE.map((item: getDescuentos) => {
            if (item.Tipo === "1") {
              sumaDes = sumaDes - Number(item.total)
            }
            else if (item.Tipo === "2") {
              sumaRet = sumaRet - Number(item.total)
            }
          });
        }
        res.RESPONSE.map((item: getDescuentos) => {
          sumatotal = sumatotal + Number(item.total)
          setSumaTotal(sumatotal)
        });

        setSumDes(sumaDes);
        setSumRet(sumaRet);
      } else {
        AlertS.fire({
          title: "Error!",
          text: "Sin Respuesta",
          icon: "error",
        });
      }
    });
  };

  const handleEliminarDescuento = (v: any) => {

    Swal.fire({
      icon: "warning",
      title: "Solicitar",
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
          CHUSER: user.id,
        }
        DPCPServices.setDescuentos(data).then((res) => {
          if (res.SUCCESS) {
            setValue("")
            setOtrosCar(0);
            setDesPar(0);
            setComentariosDes("")
            consulta("remove");
            Toast.fire({
              icon: "success",
              title: "Descuento Eliminado!",
            });
          } else {
            AlertS.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      }
    });
  };

  const handleAplicarDescuento = () => {
    if (value.length < 1
      || desPar === 0
      || numOperacion === ""
      || numOperacion === "false"
      || (desPar + otrosCar) === 0) {
      AlertS.fire({
        title: "Error!",
        text: "Verificar Campos",
        icon: "error",
      });
    } else {
      if ((Number(dt.row.total) - (sumret + sumDes)) - (desPar + otrosCar) >= 0) {
        Swal.fire({
          icon: "warning",
          title: "Solicitar",
          text: "",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {

            let data = {
              NUMOPERACION: 1,
              CHID: dt.row.id,
              CHUSER: user.id,
              IDMUN: dt.row.idmunicipio,
              TIPO: value === "Anticipo" ? 1 : 2,
              NUMOP: numOperacion,
              IDURES: user.idUResp,
              IDDIVISA: dt.row.idDivisa,
              DESPARCIAL: desPar,
              TOTAL: (desPar + otrosCar),
              OTROSCARGOS: otrosCar,
              CVERET: value === "Anticipo" ? "" : Math.random() * 5000,
              DESCRIPCION: ComentariosDes
            }
            DPCPServices.setDescuentos(data).then((res) => {
              if (res.SUCCESS) {
                setValue("")
                setOtrosCar(0);
                setDesPar(0);
                setComentariosDes("")
                consulta("add");
                Toast.fire({
                  icon: "success",
                  title: "Descuento Agregado!",
                });
              } else {
                AlertS.fire({
                  title: "Error!",
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
          text: "El descuento no puede dar como resultado un numero negativo",
          showDenyButton: false,
          confirmButtonText: "Aceptar",
        });


      }
    }
  };

  const handleSelectNumOp = (e: any) => {
    setNumOperacion(e);
  };

  const handleSelectCveRet = (e: any) => {
    setCveReten(e);
  };

  const handleOpen = () => {
    setOpenModalDes(true);
  };

  const handleCloseModal = () => {
    setValue("")
    setOpenModalDes(false);
    setOtrosCar(0);
    setDesPar(0);
    setComentariosDes("")
    setNumOperacion("");
    setCveReten("");
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setOtrosCar(0);
    setDesPar(0);
    setComentariosDes("")
    handleSelectNumOp("false");
    handleSelectCveRet("");
  };

  useEffect(() => {
    setNumOperacionOp([
      {
        "value": "1515",
        "label": "Tipo 1515"
      },
      {
        "value": "25252",
        "label": "Tipo 25252"
      },
      {
        "value": "1252515",
        "label": "Tipo 1252515"
      },
      {
        "value": "15252515",
        "label": "Tipo 15252515"
      },
      {
        "value": "252588",
        "label": "Tipo 252588"
      }
    ]
    )
    setCveRetenOp([
      {
        "value": "3553",
        "label": "Tipo 3553"
      },
      {
        "value": "35356",
        "label": "Tipo 35356"
      },
      {
        "value": "2344565",
        "label": "Tipo 2344565"
      },
      {
        "value": "666544",
        "label": "Tipo 666544"
      },
      {
        "value": "976866",
        "label": "Tipo 976866"
      }
    ]


    )
    consulta("add");

    if (dt === "") {
    } else {
      setId(dt?.row?.id);

    }
  }, [dt]);

  return (

    <>
      <ModalForm title={"Edición de Descuentos"} handleClose={handleClose}>
        <Grid container>
          <Grid item>
            <label>
              {"Año:  " + dt.row.Anio}
              <br />
              {" Mes: " + dt.row.Mes}
              <br />
              {" Municipio: " + dt.row.Nombre}
              <br />
              {" Total Bruto: " + dt.row.total}
              <br />
              {"Retenciones: " + sumret}
              <br />
              {"Descuentos: " + sumDes}
              <br />
              {" Total Neto: " + (Number(dt.row.total) - (sumret + sumDes))}
              <br />
              {" Tipo de Solcitud: " + dt.row.TipoSolicitud}
              <br />
            </label>
          </Grid>

          <Grid item>

          </Grid>
        </Grid>
        <ButtonsAdd handleOpen={handleOpen} agregar={true} />
        <MUIXDataGrid columns={columns} rows={dataRow} />
      </ModalForm>

      {openModalDes ?
        <Dialog
          open={openModalDes}
        >
          <Grid container justifyContent="space-between">
            <DialogTitle>Edición de Descuentos</DialogTitle>
            <Button variant="outlined" onClick={() => handleCloseModal()}>
              <Tooltip title="Salir">
                <CloseIcon color="error" onClick={() => handleCloseModal()} />
              </Tooltip>
            </Button>
          </Grid>
          <DialogContent dividers>
            <Grid container justifyContent="flex-end">
              <label>Tipo: </label>
              <RadioGroup
                row
                aria-label="ringtone"
                name="ringtone"
                value={value}
                onChange={handleChange}
                sx={{ paddingLeft: 2 }}
              >
                <FormControlLabel
                  value={"Anticipo"}
                  key={"Anticipo"}
                  control={<Radio />}
                  label={"Anticipo"}
                />
                <FormControlLabel
                  value={"RecuperacionAdeudos"}
                  key={"RecuperacionAdeudos"}
                  control={<Radio />}
                  label={"Recuperación Adeudos"}
                />
              </RadioGroup>
            </Grid>
            <Grid container >
              <Grid item xs={6}>

                <TextField
                  required
                  disabled
                  margin="dense"
                  id="Proveedor"
                  label={value === "" ? "" : value === "Anticipo" ? "Proveedor" : "Deudor"}
                  value={value === "" ? "" : value === "Anticipo" ? dt.row.Proveedor : dt.row.Deudor}
                  type="text"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>

                {value === "RecuperacionAdeudos" ?
                    <Grid item xs={11.99}>
                      <label > Num. Operación</label>
                      <SelectFrag
                        value={numOperacion}
                        options={numOperacionOp}
                        onInputChange={handleSelectNumOp}
                        placeholder={"Seleccionar Usuario"}
                        label={"Num.  Operación"}
                        disabled={false}
                      />
                    </Grid>
                  :
                  <>
                    <label > Num. Operación</label>
                    <SelectFrag
                      value={numOperacion}
                      options={numOperacionOp}
                      onInputChange={handleSelectNumOp}
                      placeholder={"Seleccionar Usuario"}
                      label={"Num. Operación"}
                      disabled={value === "RecuperacionAdeudos"}
                    />
                  </>
                }

              </Grid>
            </Grid>

            <TextField
              required
              disabled={value === ""}
              margin="dense"
              id="uresclave"
              label="Unidad Responsable"
              value={dt.row.uresclave}
              type="text"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              disabled
              margin="dense"
              id="Divisa"
              label="Divisa"
              value={dt.row.Divisa}
              type="text"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />

            <Grid container>
              <Grid item xs={4}>
                <TextField
                  disabled={value === ""}
                  required
                  margin="dense"
                  id="Proveedor"
                  label="Descuento Parcial"
                  value={desPar}
                  type="number"
                  // fullWidth
                  variant="outlined"
                  onChange={(v) => setDesPar(Number(v.target.value))}
                  // error={!nombreCorto ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  disabled={value === "" || value === "Anticipo"}
                  required
                  margin="dense"
                  id="Proveedor"
                  label="Otros Cargos"
                  value={otrosCar}
                  type="number"
                  // fullWidth
                  variant="outlined"
                  onChange={(v) => setOtrosCar(Number(v.target.value))}
                  // error={!nombreCorto ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  disabled
                  margin="dense"
                  id="Proveedor"
                  label="Descuento Total"
                  value={desPar + otrosCar}
                  type="text"
                  // fullWidth
                  variant="outlined"
                  // onChange={(v) => setNombreCorto(v.target.value)}
                  // error={!nombreCorto ? true : false}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            {value === "RecuperacionAdeudos" ?
              <Grid container item xs={6}>
                <label > Cve. Retención</label>
                <SelectFrag
                  value={value === "RecuperacionAdeudos" ? cveReten : ""}
                  options={cveRetenOp}
                  onInputChange={handleSelectCveRet}
                  placeholder={"Cve. Retención"}
                  label={"Cve. Retención"}
                  disabled={value !== "RecuperacionAdeudos"}
                />
              </Grid>
              : ""}

            <Grid container>
              <TextField
                disabled={value === ""}
                required
                margin="dense"
                id="Proveedor"
                label="Descripción del Descuento"
                value={ComentariosDes}
                type="text"
                fullWidth
                multiline
                rows={4}
                inputProps={{ maxLength: 300 }}
                variant="outlined"
                onChange={(v) => setComentariosDes(v.target.value)}
                // error={!nombreCorto ? true : false}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button className="guardar" onClick={handleAplicarDescuento}>Aplicar</Button>
          </DialogActions>
        </Dialog>
        :
        ""
      }


    </>
  );
};
