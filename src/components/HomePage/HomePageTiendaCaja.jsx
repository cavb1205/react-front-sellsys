import React, {useContext} from "react";
import { TiendaContext } from "../../context/TiendaContext";

const HomePageTiendaCaja = ({ tienda }) => {
  
  let {formatNumber} = useContext(TiendaContext)

 

  const bgColor = () => {
    if (tienda.caja > 0) {
      return "success";
    } else if (tienda.caja < 0) {
      return "danger";
    } else {
      return "secondary";
    }
  };


  return (
    <div className={`card text-bg-${bgColor()} shadow`}>
      <div className="card-body">
        <h4 className="card-title">Dinero en Caja</h4>
        <h2 className="card-text">

          $ {tienda.caja ? formatNumber(tienda.caja) : tienda.caja}
        </h2>
      </div>
    </div>
  );
};

export default HomePageTiendaCaja;
