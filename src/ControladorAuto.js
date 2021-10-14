
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
    return ["I","D","A","S"].includes(caracter);
}

function obtenerCadenaDeAvance(cadenaDeControlAuto){
    let cadenaSeparada = cadenaDeControlAuto.split("/");  
    let cadenaDeAvance = cadenaDeControlAuto; 
    if(cadenaSeparada.length>1) cadenaDeAvance = cadenaSeparada[1];      
    if(cadenaSeparada.length>2) cadenaDeAvance = cadenaSeparada[2];      
    return cadenaDeAvance;
}

function obtenerPosicionCadenaDePosicionInicial(cadenaDeControlAuto){
    let cadenaSeparada = cadenaDeControlAuto.split("/");
    let posicionCadenaPosicionInicial = -1;
    if(cadenaSeparada.length>2) posicionCadenaPosicionInicial = 1;
    else if(cadenaSeparada.length>1) posicionCadenaPosicionInicial = 0; 
    return posicionCadenaPosicionInicial; 
}

function tieneCadenaDePosicionInicial(posicionCadenaPosicionInicial){
    return posicionCadenaPosicionInicial > -1;
}

function tienePosicionInicialY(cadenaPosInicial){
    return cadenaPosInicial.length>1;
}

function tieneOrientacionInicial(y){
    return y[y.length-1].toUpperCase() != y[y.length-1].toLowerCase();
}

function obtenerCadenaPosicionInicialSeparada(cadenaPosInicial){
    return cadenaPosInicial.split(",");  
}

function obtenerPosicionInicialX(cadenaPosInicial){
    let cadenaPosInicialSeparada = obtenerCadenaPosicionInicialSeparada(cadenaPosInicial);
    return cadenaPosInicialSeparada[0];
}

function obtenerPosicionInicialY(cadenaPosInicial){
    let y = 0; 
    let cadenaPosInicialSeparada = obtenerCadenaPosicionInicialSeparada(cadenaPosInicial);
    if(tienePosicionInicialY(cadenaPosInicial)){
        y = cadenaPosInicialSeparada[1];
        if(y!=undefined && tieneOrientacionInicial(y)){
            y=y.slice(0,y.length-1);
        }
    }
    return y;
}
function obtenerOrientacionInicial(cadenaPosInicial)  {
    let y = 0; 
    let cadenaPosInicialSeparada = obtenerCadenaPosicionInicialSeparada(cadenaPosInicial);
    let orientacion ="N";
    if(tienePosicionInicialY(cadenaPosInicial)){
        y = cadenaPosInicialSeparada[1];
        if(y!=undefined && tieneOrientacionInicial(y)){
            orientacion = y[y.length-1];
        }
    }
    return orientacion;
}
function obtenerPosicionInicial(cadenaDeControlAuto){
    let cadenaSeparada = cadenaDeControlAuto.split("/");
    let cadenaPosInicial="4";
    let posicionCadenaPosicionInicial = obtenerPosicionCadenaDePosicionInicial(cadenaDeControlAuto);
    if(tieneCadenaDePosicionInicial(posicionCadenaPosicionInicial)) cadenaPosInicial = cadenaSeparada[posicionCadenaPosicionInicial];
    let x = obtenerPosicionInicialX(cadenaPosInicial);
    let y = obtenerPosicionInicialY(cadenaPosInicial);
    let orientacion = obtenerOrientacionInicial(cadenaPosInicial); 
    return [Number(x),Number(y),orientacion];
}

function obtenerTamSuperficie(cadenaDeControlAuto){
    let cadenaSeparada = cadenaDeControlAuto.split("/");
    let tamInicialX = 8;
    let tamInicialY = 8;
    let cadenaTamSuperficie = "8";
    if(cadenaSeparada.length>2) cadenaTamSuperficie = cadenaSeparada[0];
    tamInicialX = cadenaTamSuperficie.split(",")[0];
    tamInicialY = cadenaTamSuperficie;
    if(cadenaTamSuperficie.split(",").length>1) tamInicialY = cadenaTamSuperficie.split(",")[1];   
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

function tamSuperficieInvalida(tamInicialX,tamInicialY){
    return tamInicialY < 0 || tamInicialX < 0;
}

function caracterNoValido(caracter){
    return Number.isNaN(caracter)||caracter==undefined;
}


function controlarAuto(cadenaDeControlAuto) {  
    let cadenaDeAvance = obtenerCadenaDeAvance(cadenaDeControlAuto);
    let [x,y,orientacion] = obtenerPosicionInicial(cadenaDeControlAuto);
    let [limiteSuperficieX,limiteSuperficieY] = obtenerTamSuperficie(cadenaDeControlAuto);   
    if(caracterNoValido(limiteSuperficieX) || caracterNoValido(limiteSuperficieY)) return "Sintaxis incorrecto";
    if(tamSuperficieInvalida(limiteSuperficieX,limiteSuperficieY)) return "número negativo en tamaño de superficie";
    if(!verificarOrientacionValida(orientacion)) return "orientación inicial no válida";    
    if(verificarPosicionInicialFueraDeRango(x,y,limiteSuperficieX, limiteSuperficieY)) return "Valor no permitido: fuera de rango de superficie";
    if(caracterNoValido(x)||caracterNoValido(y)) return "Sintaxis incorrecto";    
    for(let i=0;i<cadenaDeAvance.length;i++){    
        if(cadenaDeAvance[i]=="S"){
            if(orientacion=="O") x = x-2;
            else{
                y = y+2;
            }
        }        
        if(cadenaDeAvance[i]=="A") [x,y] = obtenerPosicionNuevaSegunOrientacion(x,y,orientacion);   
        orientacion = obtenerOrientacionGiro(cadenaDeAvance[i],orientacion);       
        if(!caracterValido(cadenaDeAvance[i])) break;
    }
    [x,y] = ajustarXYFueraDeSuperficie(x,y,limiteSuperficieX,limiteSuperficieY);
    return `(${x},${y})${orientacion}`;
}
  
export default controlarAuto;