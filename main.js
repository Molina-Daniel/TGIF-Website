'use strict'

// let members;

// apiToLoad();

// function apiToLoad() {
//   let senatePage = "http://localhost:8000/senate-page.html"
//   let senateAttendancePage = "http://localhost:8000/senate-attendance.html"
//   let senatePartyLoyaltyPage = "http://localhost:8000/senate-party-loyalty.html"
//   let senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";
//   let houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json";
//   let url;

//   if (document.URL == senatePage || document.URL == senateAttendancePage || document.URL == senatePartyLoyaltyPage) {
//     url = senateUrl;
//   } else {
//     url = houseUrl;
//   }

//   fetch(url, {
//     method: 'GET',
//     headers: {
//       'X-API-Key': 's3rUR0pNj1b3rAUOxF3Yt50ZRnneSpkQ11lVTwiq'
//     },
//   })
//     .then(function (response) {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       // Read the response as json.
//       return response.json();
//     })
//     .then(function (responseAsJson) {
//       // Do stuff with the JSON
//       members = responseAsJson.results[0].members;
//       // Execute the functions to build the table:
//       stateSelectOptionsCreator();
//       tableCheck();
//       checkboxEvent();
//       selectorEvent();
//     })
//     .catch(function (error) {
//       console.log('Looks like there was a problem: \n', error);
//     });
// }


let app = new Vue({
  el: "#app",
  data: {
    members: [],
    checkedParty: [],
    selectedState: ["All"],
    leastEngaged: [],
    mostEngaged: [],
  },
  created() {
    this.fetchData();
  },
  // mounted() {
  //   this.leastEngagedTable();
  // },
  computed: {
    states() { // Get all the states w/o repeats
      return new Set(this.members.map(member => member.state).sort())
    },
    filteredTable() { // Make the filters work
      if (!this.checkedParty.length && this.selectedState == "All") {
        return this.members
      }
      // "this" only works with arrow function. For regular functions we'd have to target the variables in data with "app.variableName" because "this" is out of the scope
      return this.members.filter((member) => {
        let checkboxesFilter = (!this.checkedParty.length || this.checkedParty.includes(member.party));
        let dropdownFilter = (this.selectedState == "All" || this.selectedState == member.state);
        return checkboxesFilter && dropdownFilter;
      })
    },
    democrats() { // Total Democrats
      return this.members.filter(member => member.party == "D")
    },
    republicans() { // Total Republicans
      return this.members.filter(member => member.party == "R")
    },
    independents() { // Total Independents
      return this.members.filter(member => member.party == "I")
    },
    demTotalVotes() { //Condiciones no funciona?? Total Democrats votes
      return (this.democrats.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.democrats.length).toFixed(2)
      // if (this.members.filter(member => member.party == "D")) {
      //   return this.members.map(member => member.votes_with_party_pct)//.reduce((total, num) => total + num)
      // }
    },
    repTotalVotes() { // Total Republicans votes
      return (this.republicans.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.republicans.length).toFixed(2)
    },
    indTotalVotes() { // Total Independents
      return (this.independents.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.independents.length).toFixed(2)
    },
    totalVotes() { // Total Votes
      return (this.members.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.members.length).toFixed(2)
    },
    leastEngagedTable() {
      return this.leastEngaged = this.members.sort(this.compare).reverse().slice(0, this.members.length * 10 / 100)
      // let missTenPct = [];
      // if (missTenPct.length <= this.leastEngagedCalc.length * 10 / 100 || this.members.missed_votes_pct == missTenPct[missTenPct.length - 1]) {
      //   missTenPct.push(this.members.missed_votes_pct);
      //   this.members.sort(this.compare).reverse();
      // }
      // return this.leastEngagedCalc.forEach(function (member) {
      //   if (this.missTenPct.length <= this.leastEngagedCalc.length * 10 / 100 || member.missed_votes_pct == this.missTenPct[this.missTenPct.length - 1]) {
      //     this.missTenPct.push(member);
      // this.members.sort(this.compare).reverse();
    },
    mostEngagedTable() {
      return this.mostEngaged = this.members.sort(this.compare).slice(0, this.members.length * 10 / 100)
    },
    
  },
  methods: {
    fetchData() {
      let senatePage = "http://localhost:8000/senate-page.html"
      let senateAttendancePage = "http://localhost:8000/senate-attendance.html"
      let senatePartyLoyaltyPage = "http://localhost:8000/senate-party-loyalty.html"
      let senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";
      let houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json";
      let url;

      if (document.URL == senatePage || document.URL == senateAttendancePage || document.URL == senatePartyLoyaltyPage) {
        url = senateUrl;
      } else {
        url = houseUrl;
      }

      fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Key': 's3rUR0pNj1b3rAUOxF3Yt50ZRnneSpkQ11lVTwiq'
        },
      })
        // Read the response as json.
        .then(response => response.json())
        // Do stuff with the JSON
        .then(responseAsJson => {
          this.members = responseAsJson.results[0].members
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error);
        });
    },
    compare(a, b) {
      if (a.missed_votes_pct < b.missed_votes_pct)
        return -1;
      if (a.missed_votes_pct > b.missed_votes_pct)
        return 1;
      return 0;
    },
    // leastEngagedCalc() {
    //   return this.members.sort(this.compare).reverse()
    // },
  },
})

// let numArr = [85.97, 81.45, 98.62, 91.86, 90.13, 95.72, 97.84, 98.63, 89.32, 98.81, 92.53, 98.04, 97.84, 91.38, 99.24, 99.24, 97.4, 97.65, 85.34, 82.86, 90.33, 86.12, 88.97, 59.67, 98.29, 85.8, 89.92, 96.1, 89.38, 87.6, 94.65, 98.93, 91.86, 98.72, 94.37, 82.68, 99.24, 98, 85.55, 92.85, 94.84, 98.73, 82.87, 98.01, 94.7, 83.98, 98.32, 91.71, 91.39, 86.37, 90.95, 98.47, 91.54, 97.84, 80, 95.4, 82.62, 98.62, 94.19, 96.97, 98.15, 85.96, 97.98, 85.87, 98.52, 84.66, 95.32, 91.74, 98.61, 96.61, 99.21, 90.85, 61.8, 98.01, 99.22, 98.59, 85.6, 88.47, 92.11, 97.86, 95.83, 88.51, 89.47, 98.43, 85.29, 94.95, 99.34, 98.93, 90.61, 88.98, 97.54, 87.5, 99.23, 94.62, 94.18, 90.24, 98.39, 98.17, 87.69, 97.64, 96.73, 97.67, 98, 90.16, 96.96];

// let numArrSum = numArr.reduce((total, num) => total + num);