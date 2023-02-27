import Swal from "sweetalert2";



//SOLO VENTANA DE CONFIRMACION
export const AlertS = Swal.mixin({
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


export const InputAlert = Swal.mixin({
    input: 'textarea',
    inputLabel: 'Message',
    inputPlaceholder: 'Type your message here...',
    inputAttributes: {
      'aria-label': 'Type your message here'
    },
    showCancelButton: true
  })
  
