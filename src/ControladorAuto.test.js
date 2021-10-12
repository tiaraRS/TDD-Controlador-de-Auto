import controlarAuto from "./ControladorAuto.js";
//CC = Criterio de Confirmacion
//F1:
describe("Controlador de Auto para Avanzar 1 posición con cadena A", () => {
    //CC 1
    it("deberia avanzar 1 posicion con la cadena A", () => {
      expect(controlarAuto("A")).toEqual("(4,1)N");
    });
    it("deberia avanzar 1 posicion con la cadena AB", () => {
        expect(controlarAuto("AB")).toEqual("(4,1)N");
    });
    //CC2
    it("deberia devolver la posicion inicial (4,0)N con la cadena BA", () => {
        expect(controlarAuto("BA")).toEqual("(4,0)N");
    });
    it("deberia devolver la posicion inicial (4,0)N con cadena vacia", () => {
        expect(controlarAuto("")).toEqual("(4,0)N");
    });    
});

//F2:
describe("Controlador de Auto para girar a la izquierda y avanzar 1 posición", () => {
    //CC1
    it("deberia devolver (4,0)O con cadena I", () => {
        expect(controlarAuto("I")).toEqual("(4,0)O");
    });
    it("deberia devolver (3,0)O  con cadena IA", () => {
        expect(controlarAuto("IA")).toEqual("(3,0)O");
    }); 
    it("deberia devolver (3,0)O  con cadena IABDE", () => {
        expect(controlarAuto("IABDE")).toEqual("(3,0)O");
    }); 
    //CC2
    it("deberia mantener pos inicial con caracteres distintos de IA al principio de la cadena", () => {
        expect(controlarAuto("BIABDE")).toEqual("(4,0)N");
    }); 
});
