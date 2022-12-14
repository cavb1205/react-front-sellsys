import React, { useContext } from 'react'
import  {AuthContext}  from '../../context/AuthContext'



const Search = () => {
  
 const {handleSearch}=useContext(AuthContext)
 
  return (
    
    <form className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
            <input onChange={handleSearch} placeholder='Buscar' type="text" className='form-control ' />
        </div>
    </form>
  )
}

export default Search
