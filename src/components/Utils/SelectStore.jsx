import React, { useContext, useEffect } from "react";

import { TiendaContext } from "../../context/TiendaContext";

const SelectStore = () => {
  const {
    stores,
    selectedStore,
    setSelectedStore,
    getTiendaMembresiaAdmin,
  } = useContext(TiendaContext);



  useEffect(() => {
    if (stores.length > 0) {
      setSelectedStore(stores[0].id);
    }
  }, [stores]);

  useEffect(() => {
    if (selectedStore !== "") {
      getTiendaMembresiaAdmin();
    }
  }, [selectedStore]);

  const onChangeStore = (event) => {
    setSelectedStore(event.target.value);
  };

  return (
    <div>
      <select
        onChange={onChangeStore}
        name="selectStore"
        className="btn btn-outline-primary mt-2"
        value={selectedStore}
      >
        {stores.map((store) => (
          <option key={store.id} value={store.id}>
            {store.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStore;
