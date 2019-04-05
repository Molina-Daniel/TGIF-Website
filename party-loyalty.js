'use strict'

let members = senateData.results[0].members;

getPartiesData();
tableGlance();
leastLoyalCalc();
mostLoyalCalc();

function getPartiesData() {
  let democrats = [];
  let republicans = [];
  let independents = [];

  let demTotalVotes = 0;
  let repTotalVotes = 0;
  let indTotalVotes = 0;

  let partyVotes = 0;

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
  if (a.votes_with_party_pct < b.votes_with_party_pct)
    return -1;
  if (a.votes_with_party_pct > b.votes_with_party_pct)
    return 1;
  return 0;
}

function leastLoyalCalc() {
  let membersSortedByVotesWithPartyPct = members.sort(compare);
  let votesWithPartyTenPct = [];
  let leastLoyalTable = document.getElementById("leastLoyalTable");

  for (let i = 0; i < membersSortedByVotesWithPartyPct.length; i++) {
    let member = members[i];

    if (votesWithPartyTenPct.length <= membersSortedByVotesWithPartyPct.length * 10 / 100 || member.votes_with_party_pct == votesWithPartyTenPct[votesWithPartyTenPct.length - 1]) {
      votesWithPartyTenPct.push(member.votes_with_party_pct);
      leastLoyalTable.insertAdjacentHTML("beforeend", `
        <tr>
          <td><a href="${member.url}" target="_blank">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
          <td>${Math.round((member.votes_with_party_pct / 100) * member.total_votes)}</td>
          <td>${member.votes_with_party_pct}</td>
        </tr>`);
    }
  }
}

function mostLoyalCalc() {
  let membersSortedByVotesWithPartyPct = members.sort(compare).reverse();
  let votesWithPartyTenPct = [];
  let leastLoyalTable = document.getElementById("mostLoyalTable");

  for (let i = 0; i < membersSortedByVotesWithPartyPct.length; i++) {
    let member = members[i];

    if (votesWithPartyTenPct.length <= membersSortedByVotesWithPartyPct.length * 10 / 100 || member.votes_with_party_pct == votesWithPartyTenPct[votesWithPartyTenPct.length - 1]) {
      votesWithPartyTenPct.push(member.votes_with_party_pct);
      leastLoyalTable.insertAdjacentHTML("beforeend", `
        <tr>
          <td><a href="${member.url}" target="_blank">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
          <td>${Math.round((member.votes_with_party_pct / 100) * member.total_votes)}</td>
          <td>${member.votes_with_party_pct}</td>
        </tr>`);
    }
  }
}




