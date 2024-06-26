
- Primer ejercicio:

  La función calcular ticket me tiene que devolver:

    interface ResultadoLineaTicket {
    nombre: string;
    cantidad: number;
    precionSinIva: number;
    tipoIva: TipoIva;
    precioConIva: number;
  }




  const ticketFinal = 
    {
      lineas: [{
        nombre: string;
        cantidad: number;
        precionSinIva: number;
        tipoIva: TipoIva;
        precioConIva: number;
      }];
      total: 
      {
        totalSinIva: number;
        totalConIva: number;
        totalIva: number;
        }
      desgloseIva: [{
        tipoIva: TipoIva;
        cuantia : number;
      }];
    }
  