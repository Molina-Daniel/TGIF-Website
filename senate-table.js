"use strict"

// document.getElementById("senateData").innerHTML = JSON.stringify(senateData, null, 2);

let fullNameArr = []; // Array holding all the full names
let fullNameWebArr = []; // Array storing all the urls
let partyArr = []; // Array holding all the parties
let stateArr = []; // Array holding all the States info
let seniorityArr = []; // Array holding all the Seniority info
let votesPercentageArr = []; // Array holding all the porcentages of votes info

let members = senateData.results[0].members;



tableCreator();


// Get all the data from the JSON and execute the function to build the table:

function tableCreator() {

  members.forEach(name => { // Loop to get first name, middle name(if exist) and last name, and build up the Full Name
    let fullName;
    fullName = name.first_name; // Get the first name

    if (name.middle_name !== null) {
      fullName += " " + name.middle_name; // Get the middle name when exist and add it to the full name
    }

    fullName += " " + name.last_name; // Get the last name and add it to the full name
    fullNameArr.push(fullName); // Push the full name to the holder array
  });


  // Get the url from the data:


  members.forEach(url => { // Loop to get the url of each member
    let fullNameWeb;
    fullNameWeb = url.url; // Get the url from the data



    fullNameWebArr.push(fullNameWeb); // Push the url to the holder array
  });


  // Get the Party info from the data



  members.forEach(party => { // Loop to get the party of each member
    let eachParty = party.party; // Get the party

    partyArr.push(eachParty); // Push the party info to the holder array
  });


  // Get the State info from the data


  members.forEach(state => { // Loop to get the State of each member
    let eachState = state.state; // Get the State

    stateArr.push(eachState); // Push the State info to the holder array
  });


  // Get the Seniority info from the data


  members.forEach(seniority => { // Loop to get the Seniority of each member
    let eachSeniority = seniority.seniority; // Get the Seniority

    seniorityArr.push(eachSeniority); // Push the Seniority info to the holder array
  });


  // Get the Percentage of Votes from the data


  members.forEach(votesPct => { // Loop to get the porcentages of votes of each member
    let eachVotesPct = votesPct.votes_with_party_pct + "%"; // Get the porcentages of votes and add % symbol

    votesPercentageArr.push(eachVotesPct); // Push the porcentages of votes info to the holder array
  });

  // rowsAndCellsCreator(fullNameArr, fullNameWebArr, partyArr, stateArr, seniorityArr, votesPercentageArr);
  createTableChecked();

  stateSelectOptionsCreator();
}




// Create rows and cells function

function rowsAndCellsCreator(fullName, url, party, state, seniority, votesPercentage) {
  let tBody = document.getElementById("senateTable");

  for (let i = 0; i < members.length; i++) {

    // Check if the current member party is or not in the checkboxes values and create its row and cells if so
    // if (checkboxesArr.indexOf(members[i].party) >= 0)

    // Create a new row
    let rows = tBody.insertRow(-1);

    // Create the full name cell
    let cellFullName = rows.insertCell(0);

    // Create the anchor for the names
    let makeLink = document.createElement("a");
    // Insert the attribute href and the url to the anchor tag
    makeLink.setAttribute("href", url[i]);
    // Insert the full name text in the anchor
    makeLink.innerHTML = fullName[i];
    // Append the anchor tag to its cell
    cellFullName.appendChild(makeLink);

    // Create remaining cells
    let cellParty = rows.insertCell(1);
    let cellState = rows.insertCell(2);
    let cellSeniority = rows.insertCell(3);
    let cellVotesPercentage = rows.insertCell(4);

    // Insert the correspondent values to each cell
    cellParty.innerHTML = party[i];
    cellState.innerHTML = state[i];
    cellSeniority.innerHTML = seniority[i];
    cellVotesPercentage.innerHTML = votesPercentage[i];


  }

}

function createTableChecked() {
  tableCheck(fullNameArr, fullNameWebArr, partyArr, stateArr, seniorityArr, votesPercentageArr)
}

function tableCheck(fullName, url, party, state, seniority, votesPercentage) {

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
      makeLink.setAttribute("href", url[i]);
      // Insert the full name text in the anchor
      makeLink.innerHTML = fullName[i];
      // Append the anchor tag to its cell
      cellFullName.appendChild(makeLink);

      // Create remaining cells
      let cellParty = rows.insertCell(1);
      let cellState = rows.insertCell(2);
      let cellSeniority = rows.insertCell(3);
      let cellVotesPercentage = rows.insertCell(4);

      // Insert the correspondent values to each cell
      cellParty.innerHTML = party[i];
      cellState.innerHTML = state[i];
      cellSeniority.innerHTML = seniority[i];
      cellVotesPercentage.innerHTML = votesPercentage[i];
    }
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

// function checkboxEvent() {

//   // let checkboxChange = document.querySelectorAll("input[name=partyCheckboxes]:checked");

//   return tableCreator();
// }


// function selectorEvent() {

//   let selectorChange = document.getElementById("state");

//   console.log(selectorChange);

//   selectorChange.addEventListener("onchange", tableCreator());
// }

// Create the options for the select filter

function stateSelectOptionsCreator() {

  // Create an array with all the states sorted
  let stateArrNoDuplicates = ["-All-"];

  for (let i = 0; i < stateArr.length; i++) {
    if (!stateArrNoDuplicates.includes(stateArr[i])) {
      stateArrNoDuplicates.push(stateArr[i]);
    }
  }

  // stateArrNoDuplicates.push("-All-");
  let stateArrSelect = stateArrNoDuplicates.sort();

  // Create the option list in the HTML
  let targetSelect = document.getElementById("state");

  let selectOptions = "";

  for (let i = 0; i < stateArrSelect.length; i++) {
    selectOptions += `<option value="${stateArrSelect[i]}">${stateArrSelect[i]}</option>`;
  }
  return targetSelect.innerHTML = selectOptions;
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

