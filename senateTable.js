"use strict"

// document.getElementById("senateData").innerHTML = JSON.stringify(senateData, null, 2);

// senateData.results[0].members[0].first_name

// coger el valor "x" del objeto senateData
// X crea una fila(tr) 
// X crea una columna(td)
// mete el valor "x" en la columna

// function getElement() {
//   let firstName = senateData.results[0].members[0].first_name;
//   return firstName;
// }
// console.log(getElement(senateData));

// Create rows and cells
function rowsAndCellsCreator() {
  let tBody = document.getElementById("senateTable");

  let rows = tBody.insertRow(-1);

  let cellFullName = rows.insertCell(0);
  let cellParty = rows.insertCell(1);
  let cellState = rows.insertCell(2);
  let cellSeniority = rows.insertCell(3);
  let cellVotesPercentage = rows.insertCell(4);

  cellFullName.innerHTML = "Pepe";
  cellParty.innerHTML = "R";
  cellState.innerHTML = "TN";
  cellSeniority.innerHTML = "11";
  cellVotesPercentage.innerHTML = "85.97%";
}

rowsAndCellsCreator();

// Get the data from the JSON
function getTheName(fromHere) {
  let firstName = fromHere.results[0].members[0].first_name;
  return firstName;
}

console.log(getTheName(senateData));



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
