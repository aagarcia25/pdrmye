import Swal from "sweetalert2";



//SOLO VENTANA DE CONFIRMACION
export const Alert = Swal.mixin({
    showConfirmButton: true,
    confirmButtonText: 'OK',
});

//SOLO VENTANA PARA TOMA DE DESICION
export const AlertD = Swal.mixin({
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
});

