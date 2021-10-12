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
    
    
});
