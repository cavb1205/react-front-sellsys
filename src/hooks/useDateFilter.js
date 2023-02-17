import { useState } from 'react'
import {createUtcDateIso} from './useDate'

const useDateFilter = () => {

    const [fecha, setFecha] = useState(createUtcDateIso())
    const dateChange = (event) => {
        setFecha(event.target.value)
    }
    
  return {fecha, dateChange}
}

export default useDateFilter