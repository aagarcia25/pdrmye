import React, { useEffect, useState } from 'react'
import { SireService } from '../../../services/SireService';
import { RConsultaClavesPresupuestales } from '../../../interfaces/siregob/RConsultaClavesPresupuestales';
import { currencyFormatter } from '../menu/CustomToolbar';

const SaldosSiregob = ({
    anio,
    clasificador1,
    clasificador2,
    clasificador3,
    clasificador4,
    clasificador5,
    clasificador6,
    clasificador7,
    clasificador8,
    clasificador9,
    clasificador10,
    clasificador11,
    mes
  }: {
    anio: string,
    clasificador1: string,
    clasificador2: string,
    clasificador3: string,
    clasificador4: string,
    clasificador5: string,
    clasificador6: string,
    clasificador7: string,
    clasificador8: string,
    clasificador9: string,
    clasificador10: string,
    clasificador11: string,
    mes: string
  
  }
  ) => {

    const [suficiencia, setSuficiencia] = useState("");
    const [error, setError] = useState("");

    const buscarPresu = () => {
        let data = {
          anio:anio.trim(),
          clasificador1:clasificador1.trim(),
          clasificador2:clasificador2.trim(),
          clasificador3:clasificador3.trim(),
          clasificador4:clasificador4.trim(),
          clasificador5:clasificador5.trim(),
          clasificador6:clasificador6.trim(),
          clasificador7:clasificador7.trim(),
          clasificador8:clasificador8.trim(),
          clasificador9:clasificador9.trim(),
          clasificador10:clasificador10.trim(),
          clasificador11:clasificador11.trim(),
          mes:mes.trim()
        };
        SireService.ConsultaPresupuesto(data).then((res) => {
          if (res.data.SUCCESS) {
            const obj: RConsultaClavesPresupuestales  = res.data;
           // console.log(obj.RESPONSE[0].Saldos.Comprometido.Total);
           setSuficiencia(String(obj.RESPONSE[0].Saldos.Comprometido.Total));
          } else {
            setError(res.data.STRMESSAGE);
          }
        });
      };


useEffect(() => {
        buscarPresu();
}, [
    clasificador1,
    clasificador2,
    clasificador3,
    clasificador4,
    clasificador5,
    clasificador6,
    clasificador7,
    clasificador8,
    clasificador9,
    clasificador10,
    clasificador11]);

  return (
    <>
    {error !== "" ? error : currencyFormatter.format(Number(suficiencia)) }
    </>
  )
}

export default SaldosSiregob
