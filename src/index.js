import controlarAuto from "./ControladorAuto";

const comandosAuto = document.querySelector("#comandos-text");
const form = document.querySelector("#controlador-form");
const div = document.querySelector("#resultado-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  div.innerHTML = "<label>Posicion final:</label><b></b>"+"<p>" + controlarAuto(comandosAuto.value) + "</p>";
});
