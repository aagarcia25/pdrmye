import { AlertS } from "../helpers/AlertS";
import { calculosServices } from "../services/calculosServices";



  export const workflow =  function (idCalculo:string,idEstatus:string) {
    let data ={
        IDCALCULO:idCalculo,
        IDESTATUS:idEstatus
      };
      calculosServices.getEstatusCalculo(data).then((res) => {
            if (res.SUCCESS) {
           //  setStatus(res.RESPONSE[0].ControlInterno)
            } else {
              AlertS.fire({
                title: "Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
};