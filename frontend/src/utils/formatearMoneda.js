export const formatearMoneda = (valor) => {
  return new Intl.NumberFormat("es-CO").format(valor);
};