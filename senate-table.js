"use strict"

// addEventListener

let members = senateData.results[0].members;

// Execute the functions to build the table:
stateSelectOptionsCreator();
tableCheck();
// checkboxEvent();
selectorEvent();

function tableCheck() {

  let stateValue = document.getElementById("state").value;
  let checkboxesArr = getCheckboxesValues();
  let tBody = document.getElementById("senateTable");
  tBody.innerHTML = "";

  for (let i = 0; i < members.length; i++) {
    // Check if the current member party is or not in the checkboxes values and create its row and cells if so
    let checkboxesFilter = (checkboxesArr.length == 0 || checkboxesArr.includes(members[i].party));
    let dropdownFilter = (stateValue == "-All-" || stateValue == members[i].state);

    if (checkboxesFilter && dropdownFilter) {
      // Create a new row
      let rows = tBody.insertRow(-1);

      // Create the full name cell
      let cellFullName = rows.insertCell(0);

      // Create the anchor for the names
      let makeLink = document.createElement("a");
      // Insert the attribute href and the url to the anchor tag
      makeLink.setAttribute("href", members[i].url);
      // Insert the attribute target blank
      makeLink.setAttribute("target", "_blank");
      // Insert the full name text in the anchor
      makeLink.innerHTML = members[i].first_name + " " + (members[i].middle_name || "") + " " + members[i].last_name;
      // Append the anchor tag to its cell
      cellFullName.appendChild(makeLink);

      // Create remaining cells
      let cellParty = rows.insertCell(1);
      let cellState = rows.insertCell(2);
      let cellSeniority = rows.insertCell(3);
      let cellVotesPercentage = rows.insertCell(4);

      // Insert the correspondent values to each cell
      cellParty.innerHTML = members[i].party;
      cellState.innerHTML = members[i].state;
      cellSeniority.innerHTML = members[i].seniority;
      cellVotesPercentage.innerHTML = members[i].votes_with_party_pct + "%";
    }
  }
  let noData = document.getElementById("noData");
  noData.innerHTML = "";

  if (tBody.rows.length == 0) {
    noData.insertAdjacentHTML("beforeend", `<p>Sorry, any data match your request.</p>`);
  }
  // TODO Make the noData message point with state has no data
}


// Create the options for the select filter

function stateSelectOptionsCreator() {

  let stateArr = []; // Array holding all the States info

  members.forEach(state => { // Loop to get the State of each member
    let eachState = state.state; // Get the State
    stateArr.push(eachState); // Push the State info to the holder array
  });

  // Create the no-duplicates array
  let stateArrNoDuplicates = ["-All-"];

  for (let i = 0; i < stateArr.length; i++) {
    if (!stateArrNoDuplicates.includes(stateArr[i])) {
      stateArrNoDuplicates.push(stateArr[i]);
    }
  }

  // Create an array with all the states sorted
  let stateArrSelect = stateArrNoDuplicates.sort();

  // Create the option list in the HTML
  let targetSelect = document.getElementById("state");


  for (let i = 0; i < stateArrSelect.length; i++) {
    targetSelect.insertAdjacentHTML("beforeend", `<option value="${stateArrSelect[i]}">${stateArrSelect[i]}</option>`); // .insertAdjacentHTML parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position.
  }
}


// Get checkedboxes value and put them into an array.
function getCheckboxesValues() {
  let checkboxesValue = [];
  let checkboxes = document.querySelectorAll("input[name=partyCheckboxes]:checked");

  checkboxesValue = Array.from(checkboxes).map(partyLetter => partyLetter.value);
  return checkboxesValue;
}


// Call the main function tableCreator() whenever a checkbox is changed

function checkboxEvent() {

  let checkboxChange = document.querySelectorAll("input[name=partyCheckboxes]");
  console.log(checkboxChange);
  let checkboxChangeArr = Array.from(checkboxChange);
  console.log(checkboxChangeArr);
  let checkboxChangeVal = checkboxChangeArr.map(checkboxValue => checkboxValue.value)
  console.log(checkboxChangeVal);
  // let checkboxChange = document.getElementById("democrat");
  checkboxChangeVal.addEventListener("click", tableCheck);
}

function selectorEvent() {
  let selectorChange = document.getElementById("state");
  selectorChange.addEventListener("change", tableCheck);
}



// let makeLink = document.createElement("a");

// makeLink.setAttribute("href", "https://www.alexander.senate.gov/public");

// makeLink.innerHTML = "HOLAAA";

// let modificar = document.getElementById("pruebaLink");

// modificar.appendChild(makeLink);

// let makeTR = document.createElement("tr");
// let makeTD = document.createElement("td");

// makeTD.innerHTML = "Hola";
// makeTD.classList.add("container");
// makeTD.innerHTML = "Hola";

// makeTR.appendChild(makeTD);

// let table = document.getElementById("senateData");

// table.appendChild(makeTR);

