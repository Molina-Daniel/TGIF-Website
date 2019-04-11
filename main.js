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
    demTotalVotes: null,
    repTotalVotes: null,
    indTotalVotes: null,
    totalVotes: null,
    // democrats: [],
    // republicans: [],
    // independents: [],
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
          this.demTotVots()
          this.repTotVots()
          this.indTotVots()
          this.totalVots()
          this.mostEngagedTable()
          this.leastEngagedTable()
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
    demTotVots() { // Total Democrats votes
      this.demTotalVotes = (this.democrats.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.democrats.length).toFixed(2)
    },
    repTotVots() { // Total Republicans votes
      this.repTotalVotes = (this.republicans.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.republicans.length).toFixed(2)
    },
    indTotVots() { // Total Independents
      this.indTotalVotes = (this.independents.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.independents.length).toFixed(2)
    },
    totalVots() { // Total Votes
      this.totalVotes = (this.members.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.members.length).toFixed(2)
    },
    leastEngagedTable() {
      this.leastEngaged = this.members.sort(this.compare).reverse().slice(0, this.members.length * 10 / 100)
    },
    mostEngagedTable() {
      this.mostEngaged = this.members.sort(this.compare).slice(0, this.members.length * 10 / 100)
    },
    // leastEngagedCalc() {
    //   return this.members.sort(this.compare).reverse()
    // },
  },
})

