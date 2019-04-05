'use strict'

let members = senateData.results[0].members;

getPartiesData();
tableGlance();
leastEngagedCalc();
mostEngagedCalc();

function getPartiesData() {
  let democrats = [];
  let republicans = [];
  let independents = [];

  let demTotalVotes = 0;
  let repTotalVotes = 0;
  let indTotalVotes = 0;

  members.forEach(member => {
    if (member.party == "D") {
      democrats.push(member);
      demTotalVotes += member.votes_with_party_pct;
    } else if (member.party == "R") {
      republicans.push(member);
      repTotalVotes += member.votes_with_party_pct;
    } else {
      independents.push(member);
      indTotalVotes += member.votes_with_party_pct;
    }
  });

  statistics.number_of_democrats = democrats.length;
  statistics.number_of_republicans = republicans.length;
  statistics.number_of_independents = independents.length;
  statistics.total_members = democrats.length + republicans.length + independents.length;

  statistics.democrats_pct = demTotalVotes / democrats.length;
  statistics.republicans_pct = repTotalVotes / republicans.length;
  statistics.independents_pct = indTotalVotes / independents.length;
  statistics.total_pct = ((demTotalVotes / democrats.length) + (repTotalVotes / republicans.length) + (indTotalVotes / independents.length)) / 3;
}

function tableGlance() {
  document.getElementById("numOfDem").innerHTML = statistics.number_of_democrats;
  document.getElementById("numOfRep").innerHTML = statistics.number_of_republicans;
  document.getElementById("numOfInd").innerHTML = statistics.number_of_independents;
  document.getElementById("totalOfMem").innerHTML = statistics.total_members;

  document.getElementById("demVotPtc").innerHTML = Math.round(statistics.democrats_pct * 100) / 100;
  document.getElementById("repVotPtc").innerHTML = Math.round(statistics.republicans_pct * 100) / 100;
  document.getElementById("indVotPtc").innerHTML = Math.round(statistics.independents_pct * 100) / 100;
  document.getElementById("totalVotPtc").innerHTML = Math.round(statistics.total_pct * 100) / 100;
}


function compare(a, b) {
  if (a.missed_votes_pct < b.missed_votes_pct)
    return -1;
  if (a.missed_votes_pct > b.missed_votes_pct)
    return 1;
  return 0;
}

function leastEngagedCalc() {
  let membersSortedByMissVotesPct = members.sort(compare).reverse();
  let missTenPct = [];
  let leastEngagedTable = document.getElementById("leastEngagedTable");

  for (let i = 0; i < membersSortedByMissVotesPct.length; i++) {
    let member = members[i];

    if (missTenPct.length <= membersSortedByMissVotesPct.length * 10 / 100 || member.missed_votes_pct == missTenPct[missTenPct.length - 1]) {
      missTenPct.push(member.missed_votes_pct);
      leastEngagedTable.insertAdjacentHTML("beforeend", `
        <tr>
          <td><a href="${member.url}" target="_blank">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
          <td>${member.missed_votes}</td>
          <td>${member.missed_votes_pct}</td>
        </tr>`);
    }
  }
}

function mostEngagedCalc() {
  let membersSortedByMissVotesPct = members.sort(compare);
  let missTenPct = [];
  let mostEngagedTable = document.getElementById("mostEngagedTable");

  for (let i = 0; i < membersSortedByMissVotesPct.length; i++) {
    let member = members[i];

    if (missTenPct.length <= membersSortedByMissVotesPct.length * 10 / 100 || member.missed_votes_pct == missTenPct[missTenPct.length - 1]) {
      missTenPct.push(member.missed_votes_pct);
      mostEngagedTable.insertAdjacentHTML("beforeend", `
        <tr>
          <td><a href="${member.url}" target="_blank">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
          <td>${member.missed_votes}</td>
          <td>${member.missed_votes_pct}</td>
        </tr>`);
    }
  }
}



// function leastEngagedCalc() {
//   let missVotArr = [];

//   for (let i = 0; i < members.length; i++) {
//     missVotArr.push(members[i].missed_votes_pct);
//   };

//   let missVotSort = missVotArr.sort((a, b) => a - b).reverse();
//   let missTenPct = [];

//   for (let i = 0; i < members.length; i++) {
//     let leastEngagedTable = document.getElementById("leastEngagedTable");
//     // let isInTenPct = member.missed_votes_pct.includes(missVotArr);
//     // let tenPctCondition = ((missTenPct.length <= (members.length * (10 / 100))) || members[i].missed_votes_pct == missTenPct[missTenPct.length - 1]);

//     if (missTenPct.length <= (members.length * (10 / 100))) {
//       for (let j = 0; j < members.length; j++) {
//         let member = members[j];

//         if ((member.missed_votes_pct == missVotSort[i]) || members[i].missed_votes_pct == missTenPct[missTenPct.length - 1]) {
//           missTenPct.push(member);

//           leastEngagedTable.insertAdjacentHTML("beforeend", `
//             <tr>
//               <td><a href="${member.url}" target="_blank">${member.first_name} ${member.middle_name ||
//             ""} ${member.last_name}</a></td>
//               <td>${member.missed_votes}</td>
//               <td>${member.missed_votes_pct}</td>
//             </tr>`);
//         }
//       }
//     }
//   }
// }







