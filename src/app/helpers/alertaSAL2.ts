import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const MySwal = withReactContent(Swal)

const returnNotificacion = (title: string, text: string, tipo: number) => {

    if (tipo == 1) {
        MySwal.fire({
            title: title,
            text: text,
        })
    }

}

export const alertaSAL2 = (title: string, text: string, tipo: number) => {
    return (
        returnNotificacion(title, text, tipo)
    )
}
