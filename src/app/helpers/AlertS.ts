import Swal from "sweetalert2";



//SOLO VENTANA DE CONFIRMACION
export const AlertS = Swal.mixin({
    showConfirmButton: true,
    confirmButtonText: 'OK',
    color: 'rgb(175, 140, 85)',

});

//SOLO VENTANA PARA TOMA DE DESICION
export const AlertD = Swal.mixin({
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    color: 'rgb(175, 140, 85)',
});



