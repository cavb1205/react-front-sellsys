import React, { useContext, memo } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Search = () => {
  const { handleSearch, setQuery } = useContext(AuthContext)

  return (
    <form className='row'>
      <div className='col-2' />
      <div className='col-8'>
        <input onChange={handleSearch} placeholder='Buscar' type='text' className='form-control ' />
        <button className='btn btn-outline-primary btn-sm mt-1' type='reset' onClick={() => setQuery('')}>Limpiar</button>
      </div>
    </form>
  )
}

export default memo(Search)
