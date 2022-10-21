import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { municipiosc } from "../../../../share/loadMunicipios";
import SelectFrag from "../../Fragmentos/Select/SelectFrag";

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

    const [mun, setMun] = useState<SelectValues[]>([]);

    const handleFilterChange = (v: string) => {
    };

    const handleSend = () => {
       
      };

    useEffect(() => {
        setMun(municipiosc());
        if (dt === '') {
        } else {
    
        }
    
      }, [dt]);

  return (
    <div>
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
                  options={mun}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Proceso"}
                  label={""}
                  disabled={false}
                />
                </Box>

               <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  options={mun}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Departamento Origen"}
                  label={""}
                  disabled={false}
                />
                </Box>
                
                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  options={mun}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Departamento Destino"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  options={mun}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Estatus Origen"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  options={mun}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Estatus Destino"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  options={mun}
                  onInputChange={handleFilterChange}
                  placeholder={"Seleccione Perfil Origen"}
                  label={""}
                  disabled={false}
                />
                </Box>

                <Box sx={{
                margin:1
               }}>
                <SelectFrag
                  options={mun}
                  onInputChange={handleFilterChange}
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
