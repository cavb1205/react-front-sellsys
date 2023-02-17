import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import { RecaudosContext } from '../../context/RecaudosContext'
import RecaudosModalDelete from './RecaudosModalDelete'
import RecaudosModalUpdate from './RecaudosModalUpdate'

const RecaudosDetail = () => {
  const { recaudoId } = useParams()
  const navigate = useNavigate()

  const {
    getRecaudo,
    recaudo,
    openModalDeleteRecaudo,
    openModalUpdateRecaudo
  } = useContext(RecaudosContext)
  console.log(recaudo)

  useEffect(() => {
    getRecaudo(recaudoId)
  }, [])
  return (
    <div className='container-sm'>
      <Card className='mb-3 shadow rounder'>
        <CardBody>
          <div className='text-center text-secondary text-capitalize'>
            <Link className='text-secondary text-decoration-none btn btn-outline-secondary' to={`/ventas/${recaudo.venta?.id}/`}><h2>{recaudo.venta?.cliente.nombres} {recaudo.venta?.cliente.apellidos}</h2></Link>
          </div>
          <div className='text-center'>
            <span className='badge rounded-pill text-bg-light'>{recaudo.fecha_recaudo}</span>
          </div>
          <div className='text-center text-success'>
            <strong>{recaudo.valor_recaudo}</strong>
          </div>
          <div className='text-center'>
            <span className='badge rounded-pill text-bg-light'>{recaudo.visita_blanco?.tipo_falla}</span>
            {recaudo.visita_blanco?.comentario
              ? <p>Comentario: {recaudo.visita_blanco?.comentario}</p>
              : null}
          </div>
          <div className='d-flex justify-content-around mt-4'>
            <button onClick={() => navigate(-1)} className='btn btn-primary'>Atrás</button>
            <button onClick={openModalUpdateRecaudo} className='btn btn-warning'>Actualizar</button>
            <button onClick={openModalDeleteRecaudo} className='btn btn-danger'>Eliminar</button>
          </div>
        </CardBody>
      </Card>

      <RecaudosModalDelete />
      <RecaudosModalUpdate />
    </div>
  )
}

export default RecaudosDetail
