import React, { useContext, useEffect } from "react";


import { TiendaContext } from "../../context/TiendaContext";
import { Link } from "react-router-dom";



const SelectStore = () => {
  const { stores, selectedStore, setSelectedStore, getTiendaMembresiaAdmin } =
    useContext(TiendaContext);

  // useEffect(() => {
  //   if (stores.length > 0) {
  //     setSelectedStore(stores[0].tienda?.id);
  //   }
  // }, [stores]);

  useEffect(() => {
    if (selectedStore !== "") {
      getTiendaMembresiaAdmin();
    }
  }, [selectedStore]);

  // const onChangeStore = (event) => {
  //   setSelectedStore(event.target.value);
  // };

  const onSelectStore = (id) => {
    setSelectedStore(id);
    
  };

  const StoreCard = ({ store, isSelected, onSelect }) => (
    <Link
      to="/"
      className={`card ${isSelected ? 'border-primary ' : ''} text-decoration-none text-secondary`}
      onClick={() => onSelect(store.tienda?.id)}
      style={{ cursor: 'pointer', width: '18rem', margin: '1rem' }}
    >
      <div className="card-body">
        <h5 className="card-title">{store.tienda?.nombre}</h5>
      </div>
    </Link>
  );

  return (
    <div className="d-flex flex-wrap justify-content-around mt-2">
    {stores.map((store) => (
      <StoreCard
        key={store.tienda?.id}
        store={store}
        isSelected={selectedStore === store.tienda?.id}
        onSelect={onSelectStore}
      />
    ))}
  </div>
    // <div>
    //   <select
    //     onChange={onChangeStore}
    //     name="selectStore"
    //     className="btn btn-outline-primary mt-2"
    //     value={selectedStore}
    //   >
    //     {stores.map((store) => (
    //       <option key={store.tienda?.id} value={store.tienda?.id}>
    //         {store.tienda?.nombre}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
};

export default SelectStore;
