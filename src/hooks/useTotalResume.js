const useTotalResume = () => {
  /////GENERAL
  const itemsDia = (list, name, fecha) => {
    if (list.message) {
      return 0;
    }
    if (name == "aportes" || name == "gastos" || name == "utilidades") {
      return list
        .filter((item) => item.fecha == fecha)
        .map((item) => parseFloat(item.valor))
        .reduce((a, b) => a + b, 0);
    }
    if (name == "recaudos") {
      return list
        .filter((item) => item.fecha_recaudo == fecha)
        .map((item) => parseFloat(item.valor_recaudo))
        .reduce((a, b) => a + b, 0);
    }
    if (name == "ventasNetas") {
      return list
        .filter((item) => item.fecha_venta == fecha)
        .map((item) => parseFloat(item.valor_venta))
        .reduce((a, b) => a + b, 0);
    }
  };

  const itemsMes = (list, name, fecha) => {
    if (list.message) {
      return 0;
    }
    if (
      name == "aportesMes" ||
      name == "gastosMes" ||
      name == "utilidadesMes"
    ) {
      return list
        .filter(
          (item) =>
            new Date(item.fecha).getUTCMonth() + 1 ==
            new Date(fecha).getUTCMonth() + 1
        )
        .map((item) => parseFloat(item.valor))
        .reduce((a, b) => a + b, 0);
    }
    if (name == "recaudosMes") {
      return list
        .filter(
          (item) =>
            new Date(item.fecha_recaudo).getUTCMonth() + 1 ==
            new Date(fecha).getUTCMonth() + 1
        )
        .map((item) => parseFloat(item.valor_recaudo))
        .reduce((a, b) => a + b, 0);
    }
    if (name == "ventasNetasMes") {
      return list
        .filter(
          (item) =>
            new Date(item.fecha_venta).getUTCMonth() + 1 ==
            new Date(fecha).getUTCMonth() + 1
        )
        .map((item) => parseFloat(item.valor_venta))
        .reduce((a, b) => a + b, 0);
    }
  };

  const itemsAño = (list, name, fecha) => {
    if (list.message) {
      return 0;
    }
    if (
      name == "aportesAño" ||
      name == "gastosAño" ||
      name == "utilidadesAño"
    ) {
      return list
        .filter(
          (item) =>
            new Date(item.fecha).getUTCFullYear() ==
            new Date(fecha).getUTCFullYear()
        )
        .map((item) => parseFloat(item.valor))
        .reduce((a, b) => a + b, 0);
    }
    if (name == "recaudosAño") {
      return list
        .filter(
          (item) =>
            new Date(item.fecha_recaudo).getUTCFullYear() ==
            new Date(fecha).getUTCFullYear()
        )
        .map((item) => parseFloat(item.valor_recaudo))
        .reduce((a, b) => a + b, 0);
    }
    if (name == "ventasNetasAño") {
      return list
        .filter(
          (item) =>
            new Date(item.fecha_venta).getUTCFullYear() ==
            new Date(fecha).getUTCFullYear()
        )
        .map((item) => parseFloat(item.valor_venta))
        .reduce((a, b) => a + b, 0);
    }
  };

  return {
    itemsDia,
    itemsMes,
    itemsAño,
  };
};

export default useTotalResume;
