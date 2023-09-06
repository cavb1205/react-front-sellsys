import React, { useContext, useEffect } from "react";

import { TiendaContext } from "../../context/TiendaContext";

const SelectStore = () => {
  const { stores, selectedStore, setSelectedStore, getTiendaMembresiaAdmin } =
    useContext(TiendaContext);

  useEffect(() => {
    if (stores.length > 0) {
      setSelectedStore(stores[0].tienda?.id);
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
          <option key={store.tienda?.id} value={store.tienda?.id}>
            {store.tienda?.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectStore;
