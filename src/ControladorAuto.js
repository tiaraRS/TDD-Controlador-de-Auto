
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

function controlarAuto(cadenaDeControlAuto) {
    let y = 0;
    let x = 4;
    let orientacion = "N";
    let cadenaSeparada = cadenaDeControlAuto.split("/");
    let cadenaPosInicial="4";
    if(cadenaSeparada.length>1){
        cadenaDeControlAuto = cadenaSeparada[1];
        cadenaPosInicial = cadenaSeparada[0];
    }
    x = Number(cadenaPosInicial);
    if(x>8 || x<0) return "Valor no permitido: fuera de rango de superficie";
    for(let i=0;i<cadenaDeControlAuto.length;i++){           
        if(cadenaDeControlAuto[i]=="A"){
            [x,y] = obtenerPosicionNuevaSegunOrientacion(x,y,orientacion)    
        } 
        orientacion = obtenerOrientacionGiro(cadenaDeControlAuto[i],orientacion);       
        if(!caracterValido(cadenaDeControlAuto[i])) { 
            return `(${x},${y})${orientacion}`;
        }       
    }
    [x,y] = ajustarXYFueraDeSuperficie(x,y);
    return `(${x},${y})${orientacion}`;
}
  
export default controlarAuto;
  