import { useEffect } from "react";

const SumaHeaders = ({
    modulo,
    handleBorrar,
    columns,
    rows,
    controlInterno
  }: {
    modulo: string
    handleBorrar: Function,
    columns: any,
    rows: any,
    controlInterno: string
  
  }
  ) => {
  
    useEffect(() => {
  
    }, []);
    return (
      <div style={{ height: 600, width: "100%" }}>
        <label>{ modulo  + controlInterno }</label>
      </div>
    );
  }
  export default SumaHeaders;