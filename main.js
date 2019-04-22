'use strict'

// carousel();

let app = new Vue({
  el: "#app",
  data: {
    members: [],
    checkedParty: [],
    selectedState: "All",
    searchByName: "",
    filteredMembers: [],
    currentSort: 'first_name',
    currentSortDir: 'asc',
    pageSizeInput: 10,
    pageSize: 10,
    currentPage: 1,
    demTotalVotes: null,
    repTotalVotes: null,
    indTotalVotes: null,
    totalVotes: null,
    leastEngaged: [],
    mostEngaged: [],
    leastLoyal: [],
    mostLoyal: [],
  },
  created() {
    this.fetchData();
  },
  computed: { // Es una mezcla entre una variable y una funcion. Es una variable que se auto-ejecuta. Cada vez que cambia alguno de sus valores se auto-calcula de nuevo

    states() { // Get all the states w/o repeats
      return new Set(this.members.map(member => member.state).sort())
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
    filteredTable() { // Filter the original members array
      if (!this.checkedParty.length && this.selectedState == "All" && this.searchByName == "") {
        return this.filteredMembers = this.members;
      }
      // "this" only works with arrow function. For regular functions we'd have to target the variables in data with "app.variableName" because "this" is out of the scope
      return this.filteredMembers = this.members.filter((member) => {
        let checkboxesFilter = (!this.checkedParty.length || this.checkedParty.includes(member.party));
        let dropdownFilter = (this.selectedState == "All" || this.selectedState == member.state);
        let searchFilter = (this.searchByName == "" || member.first_name.toLowerCase().includes(this.searchByName.toLowerCase()) || member.last_name.toLowerCase().includes(this.searchByName.toLowerCase()));
        return checkboxesFilter && dropdownFilter && searchFilter;
      })
    },
    sortedMembers() { // Sort above filtered array alphabetically or numerically
      return this.filteredMembers.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        if (this.pageSizeInput == "All") {
          this.pageSize = this.filteredMembers.length;
          // Correct the page number if we change the entries per page
        } else if (this.currentPage > this.pages) {
          this.currentPage = this.pages;
        } else {
          this.pageSize = this.pageSizeInput;
        }
        let start = (this.currentPage - 1) * this.pageSize;
        console.log(start);
        let end = this.currentPage * this.pageSize;
        console.log(end);
        if (index >= start && index < end) {
          return true;
        }
      });
    },
    pages() {
      return Math.ceil(this.filteredMembers.length / this.pageSize);
    },
  },
  methods: {
    fetchData() {
      let senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";
      let houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json";
      let actualURL = document.URL
      let actualURLArr = actualURL.indexOf("senate")
      let url;

      if (actualURLArr !== -1) {
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
          this.leastLoyalTable()
          this.mostLoyalTable()
        })
        .catch(function (error) {
          console.log('Looks like there was a problem: \n', error);
        });
    },
    compareAttendance(a, b) {
      if (a.missed_votes_pct < b.missed_votes_pct)
        return -1;
      if (a.missed_votes_pct > b.missed_votes_pct)
        return 1;
      return 0;
    },
    compareLoyalty(a, b) {
      if (a.votes_with_party_pct < b.votes_with_party_pct)
        return -1;
      if (a.votes_with_party_pct > b.votes_with_party_pct)
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
      if (this.independents.length > 0) {
        this.indTotalVotes = (this.independents.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.independents.length).toFixed(2)
      } else {
        this.indTotalVotes = 0
      }
    },
    totalVots() { // Total Votes
      this.totalVotes = (this.members.map(member => member.votes_with_party_pct).reduce((total, num) => total + num) / this.members.length).toFixed(2)
    },
    leastEngagedTable() {
      let membersSortedByMissVotesPct = this.members.sort(this.compareAttendance).reverse();
      let missTenPct = [];

      membersSortedByMissVotesPct.forEach(member => {
        if (missTenPct.length <= membersSortedByMissVotesPct.length * 10 / 100 || member.missed_votes_pct == missTenPct[missTenPct.length - 1].missed_votes_pct) {
          missTenPct.push(member)
        }
      });
      return this.leastEngaged = missTenPct;
    },
    mostEngagedTable() {
      let membersSortedByMissVotesPct = this.members.sort(this.compareAttendance);
      let missTenPct = [];

      membersSortedByMissVotesPct.forEach(member => {
        if (missTenPct.length <= membersSortedByMissVotesPct.length * 10 / 100 || member.missed_votes_pct == missTenPct[missTenPct.length - 1].missed_votes_pct) {
          missTenPct.push(member)
        }
      });
      return this.mostEngaged = missTenPct;
    },
    leastLoyalTable() {
      let membersSortedByVotesWithPartyPct = this.members.sort(this.compareLoyalty).reverse();
      let votesWithPartyTenPct = [];

      membersSortedByVotesWithPartyPct.forEach(member => {
        if (votesWithPartyTenPct.length <= membersSortedByVotesWithPartyPct.length * 10 / 100 || member.votes_with_party_pct == votesWithPartyTenPct[votesWithPartyTenPct.length - 1].votes_with_party_pct) {
          votesWithPartyTenPct.push(member)
        }
      });
      return this.mostLoyal = votesWithPartyTenPct;
    },
    mostLoyalTable() {
      let membersSortedByVotesWithPartyPct = this.members.sort(this.compareLoyalty);
      let votesWithPartyTenPct = [];

      membersSortedByVotesWithPartyPct.forEach(member => {
        if (votesWithPartyTenPct.length <= membersSortedByVotesWithPartyPct.length * 10 / 100 || member.missed_votes_pct == votesWithPartyTenPct[votesWithPartyTenPct.length - 1].votes_with_party_pct) {
          votesWithPartyTenPct.push(member)
        }
      });
      return this.leastLoyal = votesWithPartyTenPct;
    },
    sortByColum(sort) { // It recognize when we are sorting by the same column and flip the direction
      // if sort == current sort, reverse
      if (sort === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = sort;
    },
    nextPage() {
      if ((this.currentPage * this.pageSize) < this.filteredMembers.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
})





