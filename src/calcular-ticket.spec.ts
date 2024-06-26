
import { calculaTicket, calcularIvasegunTipo, calcularTotales, crearTicketFinal, precioProductoMasIva, totalTipoIva } from "./calcular-ticket";
import { LineaTicket, ResultadoLineaTicket, productos } from "./model";

describe("calcularIvasegunTipo", () => {
  it("Debería devolver un undefined", () => {
    //Arrange
    const precionSinIva: any = undefined;
    const tipoIva: any = undefined;
    //Act
    const resultado = () => calcularIvasegunTipo(precionSinIva, tipoIva);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error")
  });
  it("Debería devolver null", () => {
    //Arrange
    const precionSinIva: any = null;
    const tipoIva: any = null;
    //Act
    const resultado = () => calcularIvasegunTipo(precionSinIva, tipoIva);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error")
  });
  it("Debería devolver un string vacío", () => {
    //Arrange
    const precionSinIva: any = "";
    const tipoIva: any = "";
    //Act
    const resultado = () => calcularIvasegunTipo(precionSinIva, tipoIva);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error")
  });
  
  it("Debería delvolver la cantidad de IVA que hay que sumar a un precio según el tipo de IVA", () => {
    //Arrange
    const precioSinIva = 2;
    const tipoIva = "general";
    //Act
    const resultado = calcularIvasegunTipo(precioSinIva, tipoIva)
    //Assert
    expect(resultado).toEqual(0.42)
  });
  it("Debería delvolver la cantidad de IVA que hay que sumar a un precio según el tipo de IVA", () => {
    //Arrange
    const precioSinIva = 4;
    const tipoIva = "reducido";
    //Act
    const resultado = calcularIvasegunTipo(precioSinIva, tipoIva)
    //Assert
    expect(resultado).toEqual(0.4)
  });
  it("Debería delvolver la cantidad de IVA que hay que sumar a un precio según el tipo de IVA", () => {
    //Arrange
    const precioSinIva = 13;
    const tipoIva = "superreducidoA";
    //Act
    const resultado = calcularIvasegunTipo(precioSinIva, tipoIva)
    //Assert
    expect(resultado).toEqual(0.65)
  });
  it("Debería delvolver la cantidad de IVA que hay que sumar a un precio según el tipo de IVA", () => {
    //Arrange
    const precioSinIva = 57;
    const tipoIva = "superreducidoB";
    //Act
    const resultado = calcularIvasegunTipo(precioSinIva, tipoIva)
    //Assert
    expect(resultado).toEqual(2.28)
    });
  it("Debería delvolver la cantidad de IVA que hay que sumar a un precio según el tipo de IVA", () =>{
    //Arrange
    const precioSinIva = 33;
    const tipoIva = "superreducidoC";
    //Act
    const resultado = calcularIvasegunTipo(precioSinIva, tipoIva)
    //Assert
    expect(resultado).toEqual(0)
    });
  it("Debería delvolver la cantidad de IVA que hay que sumar a un precio según el tipo de IVA", () =>{
    //Arrange
    const precioSinIva = 33;
    const tipoIva = "sinIva";
    //Act
    const resultado = calcularIvasegunTipo(precioSinIva, tipoIva)
    //Assert
    expect(resultado).toEqual(0)
    });
});

describe("precioProductoMasIva", () => {
  it("Debería devolver un undefined", () => {
    //Arrange
    const lineasTicket: any = undefined;
    const tipoIva: any = undefined;
    //Act
    const resultado = () => precioProductoMasIva(lineasTicket,tipoIva);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error")
  });
  it("Debería devolver null", () => {
    //Arrange
    const lineasTicket: any = null;
    const tipoIva: any = null;
    //Act
    const resultado = () => precioProductoMasIva(lineasTicket,tipoIva);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error")
  });
  it("Debería devolver un string vacío", () => {
    //Arrange
    const lineasTicket: any = "";
    const tipoIva: any = "";
    //Act
    const resultado = () => precioProductoMasIva(lineasTicket,tipoIva);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error")
  });

  it("Debería devolver el precio total del producto sumándole el tipo de iva", () => {
    //Arrange
    const precioSinIva = 57;
    const tipoIva = "superreducidoB";
    //Act
    const resultado = precioProductoMasIva(precioSinIva, tipoIva);
    //Assert
    expect(resultado).toEqual(59.28)
  })
});

describe("calculaTicket", () => {
  it("Debería devolver undefined", () => {
    //Arrange
    const lineasTicket: any = undefined;
    //Act
    const resultado = () => calculaTicket(lineasTicket);
    //Asser
    expect(resultado).toThrowError("Ha sucedido un error")
  });
  it("Debería devolver null", () => {
    //Arrange
    const lineasTicket: any = null;
    //Act
    const resultado = () => calculaTicket(lineasTicket);
    //Asser
    expect(resultado).toThrowError("Ha sucedido un error")
  });
  it("Debería devolver ''", () => {
    //Arrange
    const lineasTicket: any = null;
    //Act
    const resultado = () => calculaTicket(lineasTicket);
    //Asser
    expect(resultado).toThrowError("Ha sucedido un error")
  });

  it("Debería devolver un ticket completo", () => {
    //Arrange
    const productos: LineaTicket[] = [
      {
        producto: {
          nombre: "Legumbres",
          precio: 2,
          tipoIva: "general",
        },
        cantidad: 2,
      },
      {
        producto: {
          nombre: "leche",
          precio: 1,
          tipoIva: "superreducidoC",
        },
        cantidad: 3,
      },
    ];
    //Act
    const resultado = calculaTicket(productos);
    //Assert
    expect(resultado).toEqual([
      {
        nombre: "Legumbres",
        cantidad: 2,
        precionSinIva: 4,
        tipoIva: "general",
        precioConIva: 4.84,
      },
      {
        nombre: "leche",
        cantidad: 3,
        precionSinIva: 3,
        tipoIva: "superreducidoC",
        precioConIva: 3,
      },
    ])
  })
});

describe("calcularTotales", () => {
  it("Debería devolver undefined", () => {
    //Arrange
    const ticket: any = undefined;
    //act
    const resultado = () => calcularTotales(ticket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });
  it("Debería devolver null", () => {
    //Arrange
    const ticket: any = null;
    //act
    const resultado = () => calcularTotales(ticket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });
  it("Debería devolver ''", () => {
    //Arrange
    const ticket: any = "";
    //act
    const resultado = () => calcularTotales(ticket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });

  it("Debería devolver un objeto con las propiedades totalSinIva, totalIva y totalConIva", () => {
    //Arrange
    const ticket: ResultadoLineaTicket[] = [{
      nombre: "Leche",
      cantidad: 2,
      precionSinIva: 2,
      tipoIva: "superreducidoC",
      precioConIva: 2,
      }]
    //Act
    const resultado = calcularTotales(ticket);
    //Assert
    expect(resultado).toEqual({
      totalSinIva: 2,
      totalConIva: 2,
      totalIva: 0,
    });
  });
  it("Debería devolver un objeto con las propiedades totalSinIva, totalIva y totalConIva", () => {
    //Arrange
    const ticket: any = [{
      nombre: "Perfume",
      cantidad: 1,
      precionSinIva: 20,
      tipoIva: "general",
      precioConIva: 24.2,
      }];
    //Act
    const resultado = calcularTotales(ticket);
    //Assert
    expect(resultado).toEqual({
      totalSinIva: 20,
      totalConIva: 24.2,
      totalIva: 4.20,
    });
  });
});

describe("totalTipoIva", () => {
  it("Debería devolver undefined", () => {
    //Arrange
    const ticket: any = undefined;
    //Act
    const resultado = () => totalTipoIva(ticket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });
  it("Debería devolver null", () => {
    //Arrange
    const ticket: any = null;
    //Act
    const resultado = () => totalTipoIva(ticket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });
  it("Debería devolver ''", () => {
    //Arrange
    const ticket: any = "";
    //Act
    const resultado = () => totalTipoIva(ticket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });

  it("Debería devolver los tipos de iva con sus respectivas cuantías", () => {
    //Arrange
    const ticket: ResultadoLineaTicket[] = [
      { 
        nombre: "Leche",
        cantidad: 2,
        precionSinIva: 2,
        tipoIva: "superreducidoC",
        precioConIva: 2,
      },
      {
        nombre: "Perfume",
        cantidad: 1,
        precionSinIva: 20,
        tipoIva: "general",
        precioConIva: 24.2,
      },
    ];
    //Act
    const resultado = totalTipoIva(ticket)
    //Assert
    expect(resultado).toEqual([
      {
        tipoIva: "superreducidoC",
        cuantia: 0,
      },
      {
        tipoIva: "general",
        cuantia: 4.20,
      },
    ]);
  });
});

describe("crearTicketFinal", () => {
  it("Debería devolver undefined", () => {
    //Arrange
    const lineasTicket: any = undefined;
    //Act
    const resultado = () => crearTicketFinal(lineasTicket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });
  it("Debería devolver null", () => {
    //Arrange
    const lineasTicket: any = null;
    //Act
    const resultado = () => crearTicketFinal(lineasTicket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });
  it("Debería devolver ''", () => {
    //Arrange
    const lineasTicket: any = "";
    //Act
    const resultado = () => crearTicketFinal(lineasTicket);
    //Assert
    expect(resultado).toThrowError("Ha sucedido un error");
  });

  it("Debería devolver un ticket final que incluya líneas[], total, desgloseIva[]", () => {
    //Act
    const resultado = crearTicketFinal(productos);
    //Assert
    expect(resultado).toEqual({
      lineas: [
          {
              "nombre": "Legumbres",
              "cantidad": 2,
              "precionSinIva": 4,
              "tipoIva": "general",
              "precioConIva": 4.84
          },
          {
              "nombre": "Perfume",
              "cantidad": 3,
              "precionSinIva": 60,
              "tipoIva": "general",
              "precioConIva": 72.6
          },
          {
              "nombre": "Leche",
              "cantidad": 6,
              "precionSinIva": 6,
              "tipoIva": "superreducidoC",
              "precioConIva": 6
          },
          {
              "nombre": "Lasaña",
              "cantidad": 1,
              "precionSinIva": 5,
              "tipoIva": "superreducidoA",
              "precioConIva": 5.25
          }
      ],
      total: {
          "totalSinIva": 75,
          "totalConIva": 88.69,
          "totalIva": 13.69
      },
      desgloseIva: [
          {
              "tipoIva": "general",
              "cuantia": 13.44
          },
          {
              "tipoIva": "superreducidoC",
              "cuantia": 0
          },
          {
              "tipoIva": "superreducidoA",
              "cuantia": 0.25
          }
      ]
  })
  })
});


