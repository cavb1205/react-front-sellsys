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
                    <div className='d-flex justify-content-evenly'>
                        <div className='card shadow-lg p-3 mb-4 bg-body rounded'>
                            <h6 className='text-primary'>Mensual</h6>
                            <h6 className='text-secondary'>20 USD</h6>
                        </div>
                        <div className='card shadow-lg p-3 mb-4 bg-body rounded'>
                            <h6 className='text-success'>Anual</h6>
                            <h6 className='text-secondary'>180 USD</h6>
                        </div>
                    </div>
                </div>
                <p className='text-secondary'>
                    Para continuar utilidando el sistema realice el pago correspondiente a su suscripción y envíe el comprobante de pago al siguiente whatsapp
                </p>
                <div className='text-center'>
                    <a href='https://api.whatsapp.com/send?phone=56963511337' target="_blank" className='btn btn-success btn-lg' rel="noreferrer">Whatsapp</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AlertMembershipExpiration