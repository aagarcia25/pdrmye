import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


 
const MySwal = withReactContent(Swal)
 

export const alertaSAL2 = () => {
  return (
   

    MySwal.fire({
        title: 'Error de Red',
        didOpen: () => {
          MySwal.showLoading()
        },
      }).then(() => {
        return MySwal.fire()
      })

  )
}
