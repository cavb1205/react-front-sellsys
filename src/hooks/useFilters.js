import { useContext, useState } from "react";

import { ITEMS } from "../config";
import { AuthContext } from "../context/AuthContext";


export const useFilters = () => {

    const {query} =useContext(AuthContext)
    
    
    const [currentPage, setCurrentPage] = useState(0)

    const listFilter = (listItems, listName) => {
       
        if(query.length === 0){
            return listItems.slice(currentPage,currentPage + ITEMS)
        }
        if (listName == 'clientes'){
            const filtered = listItems.filter(item => item.nombres.toLowerCase().includes(query)||item.apellidos.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'clientesDisponibles'){
            const filtered = listItems.filter(item => item.nombres.toLowerCase().includes(query)||item.apellidos.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'trabajadores'){
            const filtered = listItems.filter(item => item.trabajador.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'aportes'){
            const filtered = listItems.filter(item => item.trabajador?.trabajador.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'gastos'){
            const filtered = listItems.filter(item => item.tipo_gasto?.tipo_gasto.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'utilidades'){
            const filtered = listItems.filter(item => item.trabajador?.trabajador.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'ventas'){
            const filtered = listItems.filter(item => item.cliente?.nombres.toLowerCase().includes(query)||item.cliente?.apellidos.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'liquidar'){
            const filtered = listItems.filter(item => item.cliente?.nombres.toLowerCase().includes(query)||item.cliente?.apellidos.toLowerCase().includes(query))
            return filtered
        }
        if (listName == 'recaudos'){
            const filtered = listItems.slice(currentPage,currentPage + ITEMS)
            return filtered
        }
        if (listName == 'cierres'){
            const filtered = listItems.slice(currentPage,currentPage + ITEMS)
            return filtered
        }
        if (listName == 'tiendas'){
            const filtered = listItems.slice(currentPage,currentPage + ITEMS)
            return filtered
        }
    }

    const nextPage = () => {
        setCurrentPage(currentPage + ITEMS)
      }
    
    const prevPage = () => {
        if(currentPage > 0){
          setCurrentPage(currentPage - ITEMS)
      }
      }
  return {listFilter,prevPage, nextPage, currentPage, ITEMS}
}

