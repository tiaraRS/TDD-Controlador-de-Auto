function controlarAuto(cadena) {
    let y = 0;
    let x = 4;
    let orientaciones = ['N','E','S','O'];
    let orient = "N";
    for(let i=0;i<cadena.length;i++){           
        if(cadena[i]=="A"){
            if(orient=="N") y++;
            if(orient=="O") x--;
            if(orient=="E") x++; 
            if(orient=="S") y--;          
        } 
        if(cadena[i]=="I") {
            if (orient=="N"){
                orient="O";
            } else{
                orient = orientaciones[orientaciones.indexOf(orient)-1];
            }
        }
        if(cadena[i] == "D") {
            if (orient=="O"){
                orient="N";
            } else{
                orient = orientaciones[orientaciones.indexOf(orient)+1];
            }  
        }        
        if(cadena[i] !="I" && cadena[i] !="A" && cadena[i]!="D") { 
            return `(${x},${y})${orient}`;
        }       
    }
    if(y>8) y=8;
    if(y<0) y=0;
    if(x>8) x=8;
    if(x<0) x=0;
    return `(${x},${y})${orient}`;
}
  
export default controlarAuto;
  