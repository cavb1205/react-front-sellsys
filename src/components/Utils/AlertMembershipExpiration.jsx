import React from 'react'

const AlertMembershipExpiration = () => {
  return (
    <div className='container-sm'>
        <div className='card shadow-lg p-3 mb-5 bg-body rounded'>
            <h2 className=' card-header text-center text-danger'>La suscripción de la ruta ha expirado</h2>
            <div className='card-body'>
                <p className='text-secondary'>
                    Lamentamos la interrupción, pero le informamos que su suscripción al servicio ha expirado debido a que no hemos recibido su pago.
                </p>
                <div className='text-center'>
                    <h5 className='text-secondary'>Planes:</h5>
                    <p className='text-center text-secondary'>Para pagar onlinecon Mercado Pago selecciona el plan de preferencia:</p>
                    <div className='d-flex justify-content-evenly'>
                        <a href='https://mpago.la/1HxUBxW' target="_blank" className='card shadow-lg p-3 mb-4 bg-body rounded text-decoration-none' rel="noreferrer">
                            <h6 className='text-primary'>Mensual</h6>
                            <h6 className='text-secondary'>20000 CLP</h6>
                        </a>
                        <a href='https://mpago.la/1XYGqqS' target='_blank' className='card shadow-lg p-3 mb-4 bg-body rounded text-decoration-none' rel="noreferrer">
                            <h6 className='text-success'>Anual</h6>
                            <h6 className='text-secondary'>180000 CLP</h6>
                        </a>
                    </div>
                </div>
                <p className='text-secondary'>
                    Para continuar utilidando el sistema realice el pago correspondiente a su suscripción y envíe el comprobante de pago al siguiente whatsapp
                </p>
                <div className='text-center'>
                    <a href='https://api.whatsapp.com/send?phone=56963511337' target="_blank" className='btn btn-outline-success btn-lg' rel="noreferrer">Whatsapp</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AlertMembershipExpiration