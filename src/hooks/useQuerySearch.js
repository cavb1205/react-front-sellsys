import { useState } from 'react'

const useQuerySearch = () => {
    const [query, setQuery]=useState('')
    
    const handleSearch = (event)=>{
        setQuery((event.target.value).toLowerCase())
    }
    
  return {query, setQuery, handleSearch}
}

export default useQuerySearch