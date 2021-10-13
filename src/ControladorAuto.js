
function ajustarCoordenada(coordenada, limiteMaxCoordenada){
    let coordenadaAjustada = coordenada;
    if (coordenada > limiteMaxCoordenada) coordenadaAjustada = limiteMaxCoordenada;
    if (coordenada < 0) coordenadaAjustada = 0;
    return coordenadaAjustada;
}

function ajustarXYFueraDeSuperficie(x,y,limiteX,limiteY){
    let xAjustada = ajustarCoordenada(x,limiteX);
    let yAjustada = ajustarCoordenada(y,limiteY);
    return [xAjustada,yAjustada]
}


function obtenerPosicionNuevaSegunOrientacion(x,y,orientacion){
    let xNueva = x;
    let yNueva = y;
    if(orientacion=="N") yNueva++;
    if(orientacion=="O") xNueva--;
    if(orientacion=="E") xNueva++; 
    if(orientacion=="S") yNueva--;  
    return [xNueva,yNueva]
}

function obtenerSiguienteOrientacion(orientacion,orientaciones){
  let siguienteOrientacion = orientacion;
  if(orientacion==orientaciones[3]) siguienteOrientacion = orientaciones[0];
        else siguienteOrientacion = orientaciones[orientaciones.indexOf(orientacion)+1];
  return siguienteOrientacion;
}

function obtenerOrientacionGiro(giro,orientacion){
    let orientaciones = ['N','E','S','O'];
    let nuevaOrientacion = orientacion;
    if(giro=="I") nuevaOrientacion = obtenerSiguienteOrientacion(orientacion,orientaciones.reverse());
    if(giro == "D") nuevaOrientacion = obtenerSiguienteOrientacion(orientacion,orientaciones);    
    return nuevaOrientacion;
}

function caracterValido(caracter){
    let valido =  ["I","D","A"].includes(caracter);
    return valido;
}

function obtenerCadenaDeAvance(cadenaDeControlAuto){
    let cadenaSeparada = cadenaDeControlAuto.split("/");  
    let cadenaDeAvance = cadenaDeControlAuto; 
    if(cadenaSeparada.length>1){
        cadenaDeAvance = cadenaSeparada[1];      
    }
    if(cadenaSeparada.length>2){
        cadenaDeAvance = cadenaSeparada[2];      
    }
    return cadenaDeAvance;
}

function obtenerPosicionInicial(cadenaDeControlAuto){
    let cadenaSeparada = cadenaDeControlAuto.split("/");
    let cadenaPosInicial="4";
    let x = 4;
    let y = 0;
    let posPosicionInicial = -1;
    let orientacion="N";
    if(cadenaSeparada.length>2){        
        posPosicionInicial = 1;
    }
    else if(cadenaSeparada.length>1){
        posPosicionInicial = 0;
    }    
    if(posPosicionInicial>-1) cadenaPosInicial = cadenaSeparada[posPosicionInicial];
    let cadenaPosInicialSeparada = cadenaPosInicial.split(",");  
    x = cadenaPosInicialSeparada[0];
    if(cadenaPosInicial.length>1){
        y = cadenaPosInicialSeparada[1];
        if(y!=undefined && y[y.length-1].toUpperCase() != y[y.length-1].toLowerCase()){
            orientacion = y[y.length-1];
            y=y.slice(0,y.length-1);
        }
    }      
    return [Number(x),Number(y),orientacion];
}

function obtenerTamSuperficie(cadenaDeControlAuto){
    let cadenaSeparada = cadenaDeControlAuto.split("/");
    let tamInicialX = 8;
    let tamInicialY = 8;
    let cadenaTamSuperficie = "8";
    if(cadenaSeparada.length>2){        
        cadenaTamSuperficie = cadenaSeparada[0];
    }
    tamInicialX = cadenaTamSuperficie.split(",")[0];
    tamInicialY = cadenaTamSuperficie;
    if(cadenaTamSuperficie.split(",").length>1){
        tamInicialY = cadenaTamSuperficie.split(",")[1];
    }    
    return [Number(tamInicialX),Number(tamInicialY)];
}

function verificarOrientacionValida(orientacion){
    let orientaciones = ['N','E','S','O'];
    return orientaciones.includes(orientacion);
}

function verificarPosicionInicialFueraDeRango(x,y, tamX, tamY){
    let valorFueraDeRango = false;
    if(x>tamX || x<0 || y>tamY || y<0) valorFueraDeRango = true;
    return valorFueraDeRango;
}

function verificarTamSuperficie(tamInicialX,tamInicialY){
    return tamInicialY < 0 || tamInicialX < 0;
}


function controlarAuto(cadenaDeControlAuto) {
    let y = 0;
    let x = 4;
    let tamInicialX = 8;
    let tamInicialY = 8;
    let orientacion = "N";
    let cadenaPosInicial="4";    
    let cadenaDeAvance = obtenerCadenaDeAvance(cadenaDeControlAuto);
    [x,y,orientacion] = obtenerPosicionInicial(cadenaDeControlAuto);
    [tamInicialX,tamInicialY] = obtenerTamSuperficie(cadenaDeControlAuto);   
    if(Number.isNaN(tamInicialX) || Number.isNaN(tamInicialY)) return "Sintaxis incorrecto";
    if(verificarTamSuperficie(tamInicialX,tamInicialY)) return "número negativo en tamaño de superficie";
    if(!verificarOrientacionValida(orientacion)) return "orientación inicial no válida";    
    if(verificarPosicionInicialFueraDeRango(x,y,tamInicialX, tamInicialY)) return "Valor no permitido: fuera de rango de superficie";
    if(Number.isNaN(x)||x==undefined) return "Sintaxis incorrecto";
    if(Number.isNaN(y)||y==undefined) return "Sintaxis incorrecto";
    for(let i=0;i<cadenaDeAvance.length;i++){           
        if(cadenaDeAvance[i]=="A"){
            [x,y] = obtenerPosicionNuevaSegunOrientacion(x,y,orientacion)    
        } 
        orientacion = obtenerOrientacionGiro(cadenaDeAvance[i],orientacion);       
        if(!caracterValido(cadenaDeAvance[i])) { 
            [x,y] = ajustarXYFueraDeSuperficie(x,y,tamInicialX,tamInicialY);
            return `(${x},${y})${orientacion}`;
        }       
    }
    [x,y] = ajustarXYFueraDeSuperficie(x,y,tamInicialX,tamInicialY);
    return `(${x},${y})${orientacion}`;
}
  
export default controlarAuto;