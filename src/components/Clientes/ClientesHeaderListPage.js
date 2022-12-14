import React from 'react';
import Search from '../Utils/Search';


const ClientesHeaderListPage = (props) => {
 
  const {clientes}=props

  return (
    <div className="text-center mb-4">
    <h1>Clientes</h1>
    {clientes.message?
        <p className='badge rounded-pill text-bg-secondary'>Total Clientes: 0</p>:
        <p className='badge rounded-pill text-bg-secondary'>Total Clientes: {clientes.length}</p>
    }
    
    <Search/>
    
    
</div>
  )
}

export default ClientesHeaderListPage