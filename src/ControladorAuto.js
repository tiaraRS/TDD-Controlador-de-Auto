function controlarAuto(cadena) {
    let y = 0;
    let x = 4;
    let orient = "N";
    if(cadena[0]=="A") y++;
    if(cadena[0]=="I") orient="O";
    if(cadena.startsWith("IA")) x--;
    if(cadena[0] == "D") orient = "E";
    if(cadena.includes("DA")) x++;
    return `(${x},${y})${orient}`;
}
  
export default controlarAuto;
  