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

//F3:
describe("Controlador de Auto para girar a la derecha y avanzar 1 posición", () => {
    //CC1
    it("deberia devolver (4,0)E con cadena D", () => {
        expect(controlarAuto("D")).toEqual("(4,0)E");
    });
    it("deberia devolver (5,0)E con cadena DA", () => {
        expect(controlarAuto("DA")).toEqual("(5,0)E");
    });
    it("deberia devolver (5,0)E con cadena DAFDS", () => {
        expect(controlarAuto("DAFDS")).toEqual("(5,0)E");
    });
    //CC2
    it("deberia mantener pos inicial con caracteres distintos de IDA al principio de la cadena", () => {
        expect(controlarAuto("PAFDSDAFDS")).toEqual("(4,0)N");
    }); 

});

//F4:
describe("Controlador de Auto para girar varias veces y avanzar 1 posicion", () => {
    //CC1
    it("deberia devolver (4,0)S con cadena DD", () => {
        expect(controlarAuto("DD")).toEqual("(4,0)S");
    });
    it("deberia devolver (4,0)O con cadena DDD", () => {
        expect(controlarAuto("DDD")).toEqual("(4,0)O");
    });
    it("deberia devolver (4,0)S con cadena II", () => {
        expect(controlarAuto("II")).toEqual("(4,0)S");
    });
    it("deberia devolver (4,0)E con cadena III", () => {
        expect(controlarAuto("III")).toEqual("(4,0)E");
    });
    it("deberia devolver (4,0)N con cadena DDDD", () => {
        expect(controlarAuto("DDDD")).toEqual("(4,0)N");
    });
    it("deberia devolver (4,1)N  con cadena DDIIAZ", () => {
        expect(controlarAuto("DDIIAZ")).toEqual("(4,1)N");
    });
    //CC2
    it("deberia devolver (4,1)O con cadena DIAI", () => {
        expect(controlarAuto("DIAI")).toEqual("(4,1)O");
    });
    it("deberia devolver (5,2)N con cadena ADAIA", () => {
        expect(controlarAuto("ADAIA")).toEqual("(5,2)N");
    });
    
});
//F5:
describe("Controlador de Auto para girar varias veces y avanzar varias posiciones", () => {
    //CC1
    it("deberia devolver (4,3)N con cadena AAA", () => {
        expect(controlarAuto("AAA")).toEqual("(4,3)N");
    });
    it("deberia devolver (4,6)N con cadena DIAAAAAA", () => {
        expect(controlarAuto("DIAAAAAA")).toEqual("(4,6)N");
    });
    it("deberia devolver (5,1)E con cadena AADDAIA", () => {
        expect(controlarAuto("AADDAIA")).toEqual("(5,1)E");
    });
    //CC2
    it("deberia devolver (4,8)N con cadena AAAAAAAAAA", () => {
        expect(controlarAuto("AAAAAAAAAA")).toEqual("(4,8)N");
    });
    it("deberia devolver (4,0)S con cadena DDAAA", () => {
        expect(controlarAuto("DDAAA")).toEqual("(4,0)S");
    });
    it("deberia devolver (8,0)E con cadena DAAAAAA", () => {
        expect(controlarAuto("DAAAAAA")).toEqual("(8,0)E");
    });
    it("deberia devolver (0,0)O con cadena IAAAAAA", () => {
        expect(controlarAuto("IAAAAAA")).toEqual("(0,0)O");
    }); 
});
//F6
describe("Controlador de Auto eligiendo posicion inicial x del auto en la superficie", () => {
    //CC1
    it("deberia devolver (0,3)O con cadena 0/AAAI", () => {
        expect(controlarAuto("0/AAAI")).toEqual("(0,3)O");
    });
    it("deberia devolver (5,3)N con cadena 0/AAAI", () => {
        expect(controlarAuto("5/AAA")).toEqual("(5,3)N");
    });
    //CC2
    it("deberia mostrar mensaje de error fuera de rango de superficie para 9/DA", () => {
        expect(controlarAuto("9/DA")).toEqual("Valor no permitido: fuera de rango de superficie");
    });
    it("deberia mostrar mensaje de error fuera de rango de superficie para -9/DA", () => {
        expect(controlarAuto("-9/DA")).toEqual("Valor no permitido: fuera de rango de superficie");
    });
    //CC3
    it("deberia mostrar mensaje de error Sintaxis incorrecto para -/DA", () => {
        expect(controlarAuto("-/DA")).toEqual("Sintaxis incorrecto");
    });
    it("deberia mostrar mensaje de error Sintaxis incorrecto para *-/DA", () => {
        expect(controlarAuto("*-/DA")).toEqual("Sintaxis incorrecto");
    });

});
//F7
describe("Controlador de Auto eligiendo posicion inicial x,y del auto en la superficie", () => {
    //CC1
    it("deberia devolver (0,3)O con cadena 0/AAAI", () => {
        expect(controlarAuto("0,0/AAAI")).toEqual("(0,3)O");
    });
    it("deberia devolver (4,6)N con cadena 4,4/AADDDD", () => {
        expect(controlarAuto("4,4/AADDDD")).toEqual("(4,6)N");
    });
    //CC2
    it("deberia mensaje de error fuera de rango de superficie para 9,9/DA", () => {
        expect(controlarAuto("9,9/DA")).toEqual("Valor no permitido: fuera de rango de superficie");
    });
    it("deberia mensaje de error fuera de rango de superficie para 0,9/DA", () => {
        expect(controlarAuto("0,9/DA")).toEqual("Valor no permitido: fuera de rango de superficie");
    });
    it("deberia mensaje de error fuera de rango de superficie para 0,-2/DA", () => {
        expect(controlarAuto("0,-2/DA")).toEqual("Valor no permitido: fuera de rango de superficie");
    });
    //CC3
    it("deberia mostrar mensaje de error Sintaxis incorrecto para 7,=/DA", () => {
        expect(controlarAuto("7,=/DA")).toEqual("Sintaxis incorrecto");
    });
    it("deberia mostrar mensaje de error Sintaxis incorrecto para 0,;,1/AAAI", () => {
        expect(controlarAuto("0,;,1/AAAI")).toEqual("Sintaxis incorrecto");
    });
});
//F8
describe("Controlador de Auto eligiendo orientacion inicial del auto", () => {
    //CC1
    it("deberia devolver (0,1)N con cadena 0,0N/A", () => {
        expect(controlarAuto("0,0N/A")).toEqual("(0,1)N");
    });
    it("deberia devolver (0,4)O con cadena 0,1N/AAAI", () => {
        expect(controlarAuto("0,1N/AAAI")).toEqual("(0,4)O");
    });
    //CC2
    it("deberia devolver orientación inicial no válida con cadena 5,5B/AAAI", () => {
        expect(controlarAuto("5,5B/AAAI")).toEqual("orientación inicial no válida");
    });
    it("deberia devolver orientación inicial no válida con cadena 5,5U/AAAI", () => {
        expect(controlarAuto("5,5U/AAAI")).toEqual("orientación inicial no válida");
    });
});

//F9
describe("Controlador de Auto eligiendo tamaño de superficie l (lxl) del auto", () => {
    //CC1
    it("deberia devolver (0,1)N con cadena 8/0,0N/A", () => {
        expect(controlarAuto("8/0,0N/A")).toEqual("(0,1)N");
    })
    it("deberia devolver (0,4)O con cadena 5/0,0N/A", () => {
        expect(controlarAuto("5/0,1N/AAAI")).toEqual("(0,4)O");
    });
    //CC2
    it("deberia mostrar mensaje de error Sintaxis incorrecto para +/5,5O/AAAI", () => {
        expect(controlarAuto("+/5,5O/AAAI")).toEqual("Sintaxis incorrecto");
    });
    it("deberia mostrar mensaje de error Sintaxis incorrecto para A/5,5O/AAAI", () => {
        expect(controlarAuto("A/5,5O/AAAI")).toEqual("Sintaxis incorrecto");
    });
    //CC3
    it("deberia devolver número negativo en tamaño de superficie con cadena -4/5,5O/AAAI", () => {
        expect(controlarAuto("-4/5,5O/AAAI")).toEqual("número negativo en tamaño de superficie");
    });
});

//F10
describe("Controlador de Auto eligiendo tamaño de superficie l y a (lxa) del auto", () => {
    //CC1
    it("deberia devolver (0,1)N con cadena 8,8/0,0N/A", () => {
        expect(controlarAuto("8,8/0,0N/A")).toEqual("(0,1)N");
    });
    it("deberia devolver (0,1)N con cadena 5,6/0,0N/A", () => {
        expect(controlarAuto("5,6/0,0N/A")).toEqual("(0,1)N");
    });
    //CC2
    it("deberia devolver número negativo en tamaño de superficie con cadena -8,8/0,0N/A", () => {
        expect(controlarAuto("-8,8/0,0N/A")).toEqual("número negativo en tamaño de superficie");
    });
    //CC3
    it("deberia devolver (1,2)O con cadena 1,2/1,1N/AAAI", () => {
        expect(controlarAuto("1,2/1,1N/AAAI")).toEqual("(1,2)O");
    });
    it("deberia devolver (1,1)E con cadena 1,1/1,1N/DAAAA", () => {
        expect(controlarAuto("1,1/1,1N/DAAAA")).toEqual("(1,1)E");
    });
    it("deberia devolver (0,1)O con cadena 1,1/1,1N/IAAAA", () => {
        expect(controlarAuto("1,1/1,1N/IAAAA")).toEqual("(0,1)O");
    });
    it("deberia devolver (1,0)S con cadena 1,1/1,1S/AAAA", () => {
        expect(controlarAuto("1,1/1,1S/AAAA")).toEqual("(1,0)S");
    });
    //CC4
    it("deberia mostrar mensaje de error fuera de rango de superficie para 1,1/1,2S/AAAA", () => {
        expect(controlarAuto("1,1/1,2S/AAAA")).toEqual("Valor no permitido: fuera de rango de superficie");
    });
    it("deberia mostrar mensaje de error fuera de rango de superficie para 1,1/2,1S/AAAA", () => {
        expect(controlarAuto("2,1/1,2S/AAAA")).toEqual("Valor no permitido: fuera de rango de superficie");
    });

});

describe("Controlador de Auto con salto", () => {
    it("deberia avanzar 2 posiciones en superficie por defecto y desde pos inicial por defecto con comando S", () => {
        expect(controlarAuto("S")).toEqual("(4,2)N");
    });
    it("deberia avanzar 2 posiciones en superficie por defecto y desde pos inicial por defecto con comando ST", () => {
        expect(controlarAuto("ST")).toEqual("(4,2)N");
    });
    it("deberia avanzar 3 posiciones en superficie por defecto y desde pos inicial por defecto con comando SA", () => {
        expect(controlarAuto("SA")).toEqual("(4,3)N");
    });
    it("deberia avanzar 3 posiciones en superficie por defecto y desde pos inicial por defecto con comando SA", () => {
        expect(controlarAuto("AS")).toEqual("(4,3)N");
    });
    it("deberia girar izq y avanzar 2 posiciones en superficie por defecto y desde pos inicial por defecto con comando IS", () => {
        expect(controlarAuto("IS")).toEqual("(2,0)O");
    });

    
});
