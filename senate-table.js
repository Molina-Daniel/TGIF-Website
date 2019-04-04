"use strict"

let members = senateData.results[0].members;

// Execute the functions to build the table:
stateSelectOptionsCreator();
tableCheck();
checkboxEvent();
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
  // Add a text when any data match the filters
  let noData = document.getElementById("noData");
  noData.innerHTML = "";

  if (tBody.rows.length == 0) { // Other option is tBody.children[0] !== null
    noData.insertAdjacentHTML("beforeend", `<p>Sorry, any data matches your request.</p>`);
  }
  // TODO Make the noData message point with state has no data
}


// Create the options for the select filter

function stateSelectOptionsCreator() {
  // Create array holding all the states no duplicated
  let stateArrNoDuplicates = ["-All-"];

  for (let i = 0; i < members.length; i++) {
    if (!stateArrNoDuplicates.includes(members[i].state)) {
      stateArrNoDuplicates.push(members[i].state);
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
  let checkboxChangeDem = document.getElementById("democrat");
  let checkboxChangeRep = document.getElementById("republican");
  let checkboxChangeInd = document.getElementById("independent");
  checkboxChangeDem.addEventListener("change", tableCheck);
  checkboxChangeRep.addEventListener("change", tableCheck);
  checkboxChangeInd.addEventListener("change", tableCheck);
}

function selectorEvent() {
  let selectorChange = document.getElementById("state");
  selectorChange.addEventListener("change", tableCheck);
}

