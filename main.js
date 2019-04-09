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
    senators: [],
  },
  created() {
    fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
      method: 'GET',
      headers: {
        'X-API-Key': 's3rUR0pNj1b3rAUOxF3Yt50ZRnneSpkQ11lVTwiq'
      },
    })
      // Read the response as json.
      .then(response => response.json())
      // Do stuff with the JSON
      .then(responseAsJson => {
        console.log(responseAsJson)
        this.senators = responseAsJson.results[0].members
      })
      .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);
      });
  }
})