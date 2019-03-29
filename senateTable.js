"use strict"

// document.getElementById("senateData").innerHTML = JSON.stringify(senateData, null, 2);

// senateData.results[0].members[0].first_name

// coger el valor "x" del objeto senateData
// X crea una fila(tr) 
// X crea una columna(td)
// X mete el valor "x" en la columna


// Get the Full Name from the data:

let fullNameArr = []; // Array holding all the full names

senateData.results[0].members.forEach(name => { // Loop to get first name, middle name(if exist) and last name, and build up the Full Name
  let fullName;
  fullName = name.first_name; // Get the first name

  if (name.middle_name !== null) {
    fullName += " " + name.middle_name; // Get the middle name when exist and add it to the full name
  }

  fullName += " " + name.last_name; // Get the last name and add it to the full name
  fullNameArr.push(fullName); // Push the full name to the holder array
});


// Get the url from the data:

let fullNameWebArr = [];

senateData.results[0].members.forEach(url => { // 
  let fullNameWeb;
  fullNameWeb = url.url; // 



  fullNameWebArr.push(fullNameWeb); // 
});


// Get the Party info from the data

let partyArr = []; // Array holding all the parties

senateData.results[0].members.forEach(party => { // Loop to get the party of each member
  let eachParty = party.party; // Get the party

  partyArr.push(eachParty); // Push the party info to the holder array
});


// Get the State info from the data

let stateArr = []; // Array holding all the States info

senateData.results[0].members.forEach(state => { // Loop to get the State of each member
  let eachState = state.state; // Get the State

  stateArr.push(eachState); // Push the State info to the holder array
});


// Get the Seniority info from the data

let seniorityArr = []; // Array holding all the Seniority info

senateData.results[0].members.forEach(seniority => { // Loop to get the Seniority of each member
  let eachSeniority = seniority.seniority; // Get the Seniority

  seniorityArr.push(eachSeniority); // Push the Seniority info to the holder array
});


// Get the Percentage of Votes from the data

let votesPercentageArr = []; // Array holding all the porcentages of votes info

senateData.results[0].members.forEach(votesPct => { // Loop to get the porcentages of votes of each member
  let eachVotesPct = votesPct.votes_with_party_pct + "%"; // Get the porcentages of votes and add % symbol

  votesPercentageArr.push(eachVotesPct); // Push the porcentages of votes info to the holder array
});


// Create rows and cells function

function rowsAndCellsCreator(fullName, url, party, state, seniority, votesPercentage) {
  let tBody = document.getElementById("senateTable");

  for (let i = 0; i < fullName.length; i++) {
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

rowsAndCellsCreator(fullNameArr, fullNameWebArr, partyArr, stateArr, seniorityArr, votesPercentageArr);

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

