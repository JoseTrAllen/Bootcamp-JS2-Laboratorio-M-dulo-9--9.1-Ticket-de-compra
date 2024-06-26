import { LineaTicket, ResultadoLineaTicket, ResultadoTotalTicket, TicketFinal, TipoIva, TotalPorTipoIva, productos } from "./model";

//Función que calcula porcentaje de IVA según el tipo de IVA 
export const calcularIvasegunTipo = (precioSinIva: number, tipoIva: TipoIva) => {
  if(!precioSinIva || !tipoIva){
    throw new Error("Ha sucedido un error");
  };
  switch (tipoIva) {
    case "general":
      return precioSinIva * 21 / 100;
    case "reducido":
      return precioSinIva * 10 / 100;
    case "superreducidoA":
      return precioSinIva * 5 / 100;
    case "superreducidoB":
      return precioSinIva * 4 / 100;
    case "superreducidoC":
      return precioSinIva * 0;
    case "sinIva":
      return precioSinIva * 0
    default: throw new Error("Ha ocurrido un error con el tipo de iva");
  }
}

//Función que calcula el precio del producto más el IVA según tipo
export const precioProductoMasIva = (precioSinIva: number, tipoIva: TipoIva) => {
  if(!precioSinIva || !tipoIva){
    throw new Error("Ha sucedido un error");
  }
  const iva = calcularIvasegunTipo(precioSinIva, tipoIva);
  return parseFloat((precioSinIva + iva).toFixed(2))
}

//Función que crea un ticket
export const calculaTicket = (lineasTicket: LineaTicket[]) => {
  if(!lineasTicket){
    throw new Error("Ha sucedido un error");
  };
  const ticket: ResultadoLineaTicket[] = [];

  for (let i = 0; i < lineasTicket.length; i++) {
    const linea: ResultadoLineaTicket= {
      nombre: lineasTicket[i].producto.nombre,
      cantidad: lineasTicket[i].cantidad,
      precionSinIva: lineasTicket[i].producto.precio * lineasTicket[i].cantidad,
      tipoIva: lineasTicket[i].producto.tipoIva,
      precioConIva: precioProductoMasIva(lineasTicket[i].producto.precio, lineasTicket[i].producto.tipoIva) * lineasTicket[i].cantidad,
    };
      ticket.push(linea);
  };
  return ticket;
};
const productosTicket: ResultadoLineaTicket[] = calculaTicket(productos);
console.log(productosTicket);

//Función que calcula los totales del iva
export const calcularTotales = (ticket: ResultadoLineaTicket[]): ResultadoTotalTicket => {
  if(!ticket){
    throw new Error("Ha sucedido un error");
  };
  let totalSinIva = 0;
  let totalConIva = 0;
  let totalIva = 0;

  for (let i = 0; i < ticket.length; i++) {
    totalSinIva += ticket[i].precionSinIva;
    totalConIva += ticket[i].precioConIva;
    totalIva += ticket[i].precioConIva - ticket[i].precionSinIva;
  };
  totalSinIva = parseFloat(totalSinIva.toFixed(2));
  totalIva = parseFloat(totalIva.toFixed(2));
  totalConIva = parseFloat(totalConIva.toFixed(2));
  return ({ totalSinIva, totalConIva, totalIva });
};
console.log(calcularTotales(productosTicket));

//Función que calcula los totales según el tipo de iva
export const totalTipoIva = (ticket: ResultadoLineaTicket[]): TotalPorTipoIva[] => {
  if(!ticket){
    throw new Error("Ha sucedido un error");
  }
  const resultado: TotalPorTipoIva[] = [];

  for (let i = 0; i < ticket.length; i++) {
    const tipo = ticket[i].tipoIva;
    let cuantia = ticket[i].precioConIva - ticket[i].precionSinIva;
    const itemExistente = resultado.find(item => item.tipoIva === tipo);
    if (itemExistente) {
      cuantia = parseFloat(cuantia.toFixed(2))
      itemExistente.cuantia += cuantia;
    } else {
      cuantia = parseFloat(cuantia.toFixed(2))
      resultado.push({ tipoIva: tipo, cuantia });
    }
  };
  return resultado
};
console.log(totalTipoIva(productosTicket));
  
//Función que crea un ticket final con el ResultadoLineaTicket, ResultadoTotalTicket, TotalPorTipoIva.
export const crearTicketFinal = (lineasTicket: LineaTicket[]): TicketFinal => {
  if(!lineasTicket){
    throw new Error("Ha sucedido un error");
  };
  const lineas = calculaTicket(lineasTicket);
  const total = calcularTotales(lineas);
  const desgloseIva = totalTipoIva(lineas);
  return {
    lineas,
    total,
    desgloseIva,
  };
};
console.log(crearTicketFinal(productos))