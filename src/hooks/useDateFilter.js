import { useState } from "react";
import { createUtcDateIso } from "./useDate";

const useDateFilter = () => {
  const [fecha, setFecha] = useState(createUtcDateIso());
  const [fechaFin, setFechaFin] = useState(createUtcDateIso());
  const dateChange = (event) => {
    setFecha(event.target.value);
  };
  const dateChangeFin = (event) => {
    setFechaFin(event.target.value);
  };
  return { fecha, dateChange , fechaFin, dateChangeFin};
};

export default useDateFilter;
