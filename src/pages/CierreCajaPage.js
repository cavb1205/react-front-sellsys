import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap'

const CierreCajaPage = () => {
  return (
    <div className='container-sm'>
        <Card className='mb-3 shadow rounder'>
            <CardHeader>
                <h2 className='text-secondary'>Cierre Caja</h2>
            </CardHeader>
            <CardBody>
                                    
            </CardBody>
            <CardFooter>
                <button className='btn btn-secondary'>Cancelar</button>
                <button className='btn btn-danger'>Cerrar Caja</button>
            </CardFooter>
        </Card>                        
    </div>
  )
}

export default CierreCajaPage