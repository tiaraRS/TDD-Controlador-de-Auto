function ajustarXYFueraDeSuperficie(x,y){
    let xAjustada = x;
    let yAjustada = y;
    if(y>8) yAjustada=8;
    if(y<0) yAjustada=0;
    if(x>8) xAjustada=8;
    if(x<0) xAjustada=0;
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

function obtenerOrientacionGiro(giro,orientacion){
    let orientaciones = ['N','E','S','O'];
    let nuevaOrientacion = orientacion;
    if(giro=="I") {
        if (orientacion=="N"){
            nuevaOrientacion="O";
        } else{
            nuevaOrientacion = orientaciones[orientaciones.indexOf(orientacion)-1];
        }
    }
    if(giro == "D") {
        if (orientacion=="O"){
            nuevaOrientacion="N";
        } else{
            nuevaOrientacion = orientaciones[orientaciones.indexOf(orientacion)+1];
        }  
    }    
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
    tamInicialX = cadenaTamSuperficie;
    tamInicialY = cadenaTamSuperficie;
    return [Number(tamInicialX),Number(tamInicialY)];
}

function verificarOrientacionValida(orientacion){
    let orientaciones = ['N','E','S','O'];
    return orientaciones.includes(orientacion);
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
    if(tamInicialY < 0 || tamInicialY < 0) return "número negativo en tamaño de superficie";
    if(!verificarOrientacionValida(orientacion)) return "orientación inicial no válida";
    if(x>8 || x<0) return "Valor no permitido: fuera de rango de superficie";
    if(y>8 || y<0) return "Valor no permitido: fuera de rango de superficie";
    if(Number.isNaN(x)||x==undefined) return "Sintaxis incorrecto";
    if(Number.isNaN(y)||y==undefined) return "Sintaxis incorrecto";
    for(let i=0;i<cadenaDeAvance.length;i++){           
        if(cadenaDeAvance[i]=="A"){
            [x,y] = obtenerPosicionNuevaSegunOrientacion(x,y,orientacion)    
        } 
        orientacion = obtenerOrientacionGiro(cadenaDeAvance[i],orientacion);       
        if(!caracterValido(cadenaDeAvance[i])) { 
            return `(${x},${y})${orientacion}`;
        }       
    }
    [x,y] = ajustarXYFueraDeSuperficie(x,y);
    return `(${x},${y})${orientacion}`;
}
  
export default controlarAuto;