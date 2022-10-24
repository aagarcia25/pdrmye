import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../helpers/Alert";
import { Toast } from "../../../../helpers/Toast";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../services/catalogosServices";
import SelectFrag from "../../Fragmentos/Select/SelectFrag";
import Slider from "../../Slider";

const WorflowModal = ( {
    open,
    handleClose,
    tipo,
    dt
  }: {
    open: boolean;
    tipo: number;
    handleClose: Function,
    dt: any
  }) => {

    const [slideropen, setslideropen] = useState(true);
    const [departamento, setDepartamentos] = useState<SelectValues[]>([]);
    const [procesos, setProcesos] = useState<SelectValues[]>([]);
    const [estatus, setEstatus] = useState<SelectValues[]>([]);
    const [perfil, setPerfil] = useState<SelectValues[]>([]);
   
    const [idproceso, setidproceso] = useState("");
    const [iddeporigen, setiddeporigen] = useState("");
    const [iddepdestino, setiddepdestino] = useState("");
    const [idestatusorigen, setidestatusorigen] = useState("");
    const [idestatusdestino, setidestatusdestino] = useState("");
    const [idperfilorigen, setidperfilorigen] = useState("");
    const [idperfildestino, setidperfildestino] = useState("");




    const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion };
      CatalogosServices.SelectIndex(data).then((res) => {
        if(operacion == 6){
            setProcesos(res.RESPONSE);
        }else if(operacion == 7){
            setDepartamentos(res.RESPONSE);
        }else if(operacion == 8){
            setEstatus(res.RESPONSE);
        }else if(operacion == 9){
            setPerfil(res.RESPONSE);
            setslideropen(false);
        }
       
      });
    }



    const handleFilterChange1 = (v: string) => {
        console.log(v)
        setidproceso(v);
    };

    const handleFilterChange2 = (v: string) => {
        console.log(v)
        setiddeporigen(v);
    };
    const handleFilterChange3 = (v: string) => {
        console.log(v)
        setiddepdestino(v);
    };
    const handleFilterChange4 = (v: string) => {
        console.log(v)
        setidestatusorigen(v);
    };
    const handleFilterChange5 = (v: string) => {
        console.log(v)
        setidestatusdestino(v);
    };
    const handleFilterChange6 = (v: string) => {
        console.log(v)
        setidperfilorigen(v);
    };
    const handleFilterChange7 = (v: string) => {
        console.log(v)
        
        setidperfildestino(v);
    };




    const handleSend = () => {
        let data = {
            NUMOPERACION: tipo,
            DO: iddeporigen,
            DD: iddepdestino,
            PO: idperfilorigen,
            PD: idperfildestino,
            EO: idestatusorigen,
            ED:idestatusdestino,
            PROCESO:idproceso
          };
        CatalogosServices.workFlowIndex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Consulta Exitosa!",
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

    useEffect(() => {
        if (dt === '') {
        } else {
         
            console.log(dt);
            setidproceso(dt.row.idproceso);
            setiddeporigen(dt.row.iddepartamentoOrigen);
            setiddepdestino(dt.row.iddepartamentoDestino);
            setidestatusorigen(dt.row.idEstatusOrigen);
            setidestatusdestino(dt.row.idestatusDestino);
            setidperfilorigen(dt.row.idPerfilOrigen);
            setidperfildestino(dt.row.idPerfilDestino);
            
        }
        loadFilter(6);
        loadFilter(7);
        loadFilter(8);
        loadFilter(9);
      }, [dt]);

  return (
    <div><Slider open={slideropen}></Slider>
      <Dialog open={open}>
        <DialogContent>
        
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <label className="Titulo">{tipo==1 ?"Agregar Registro":"Editar Registro"}</label>
            </Box>
            
             <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={idproceso}
                  options={procesos}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Proceso"}
                  label={""}
                  disabled={false}
                />
                </Box>

               <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={iddeporigen}
                  options={departamento}
                  onInputChange={handleFilterChange2}
                  placeholder={"Seleccione Departamento Origen"}
                  label={""}
                  disabled={false}
                />
                </Box>
                
                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={iddepdestino}
                  options={departamento}
                  onInputChange={handleFilterChange3}
                  placeholder={"Seleccione Departamento Destino"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={idestatusorigen}
                  options={estatus}
                  onInputChange={handleFilterChange4}
                  placeholder={"Seleccione Estatus Origen"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={idestatusdestino}
                  options={estatus}
                  onInputChange={handleFilterChange5}
                  placeholder={"Seleccione Estatus Destino"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={idperfilorigen}
                  options={perfil}
                  onInputChange={handleFilterChange6}
                  placeholder={"Seleccione Perfil Origen"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  value={idperfildestino}
                  options={perfil}
                  onInputChange={handleFilterChange7}
                  placeholder={"Seleccione Perfil Destino"}
                  label={""}
                  disabled={false}
                />
                </Box>
          

           

          
          </Box>
        </DialogContent>

        <DialogActions>
          <button className="guardar" onClick={() => handleSend()}>
            Guardar
          </button>
          <button className="cerrar" onClick={() => handleClose("close")}>
            Cerrar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorflowModal;
