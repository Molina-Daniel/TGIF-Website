'use strict'

let members = data.results[0].members;

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

  if (indTotalVotes != 0) {
    statistics.independents_pct = indTotalVotes / independents.length;
  } else {
    statistics.independents_pct = 0;
  }

  let totalPct = 0;
  let counter = 0;
  if (statistics.democrats_pct != 0) {
    totalPct += (demTotalVotes / democrats.length);
    counter += 1;
  }
  if (statistics.republicans_pct != 0) {
    totalPct += (repTotalVotes / republicans.length);
    counter += 1;
  }
  if (statistics.independents_pct != 0) {
    totalPct += (indTotalVotes / independents.length);
    counter += 1;
  }
  statistics.total_pct = totalPct / counter;
}

function tableGlance() {
  document.getElementById("numOfDem").innerHTML = statistics.number_of_democrats;
  document.getElementById("numOfRep").innerHTML = statistics.number_of_republicans;
  document.getElementById("numOfInd").innerHTML = statistics.number_of_independents;
  document.getElementById("totalOfMem").innerHTML = statistics.total_members;

  document.getElementById("demVotPtc").innerHTML = statistics.democrats_pct.toFixed(2);
  document.getElementById("repVotPtc").innerHTML = statistics.republicans_pct.toFixed(2);

  if (isNaN(statistics.independents_pct)) {
    document.getElementById("indVotPtc").innerHTML = 0;
  } else {
    document.getElementById("indVotPtc").innerHTML = statistics.independents_pct.toFixed(2);
  }

  if (isNaN(statistics.total_pct)) {
    document.getElementById("totalVotPtc").innerHTML = 0;
  } else {
    document.getElementById("totalVotPtc").innerHTML = statistics.total_pct.toFixed(2);
  }

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



