"use strict"

document.getElementById("senateData").innerHTML = JSON.stringify(senateData, null, 2);

// senateData.results[0].members[0].first_name

// coger el valor "x" del objeto senateData
// crea una fila(tr)
// crea una columna(td)
// mete el valor "x" en la columna

function getElement() {
  let firstName = senateData.results[0].members[0].first_name;
  return firstName;
}
console.log(getElement(senateData));

function makeTR() {
  let makeTR = document.createElement("tr");
  return makeTR;
}

function makeTD() {
  let makeTD = document.createElement("tr");
  return makeTD;
}

function makeTable() {
  let makeTR.innerHTML
}

function pushTheElement() {

}


// let makeTR = document.createElement("tr");
// let makeTD = document.createElement("td");

// makeTD.innerHTML = "Hola";
// makeTD.classList.add("container");
// makeTD.innerHTML = "Hola";

// makeTR.appendChild(makeTD);

// let table = document.getElementById("senateData");

// table.appendChild(makeTR);

// .insertRow
// .insertCell
