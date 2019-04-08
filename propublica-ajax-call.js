
let data;

fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
  method: 'GET',
  headers: {
    'X-API-Key': 's3rUR0pNj1b3rAUOxF3Yt50ZRnneSpkQ11lVTwiq'
  },
})
  .then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    // Read the response as json.
    return response.json();
  })
  .then(function (responseAsJson) {
    // Do stuff with the JSON
    data = responseAsJson;

  })
  .catch(function (error) {
    console.log('Looks like there was a problem: \n', error);
  });

// fetch('/appointments/18', {
//   method: 'GET',
//   body: JSON.stringify({}),
//   headers: new Headers({
//     contentType: 'application/json'
//   })
// }).then(function (response) {
//   if (response.ok) {
//     alert('Appointment saved');
//   }
//   throw new Error(response.statusText);
// }).catch(function (error) {
//   alert('Appointment not saved: ' + error.message);
// });



// var request = new Request('https://api.propublica.org/congress/v1/senate/113/members.json', {
//   method: 'GET',
//   headers: 's3rUR0pNj1b3rAUOxF3Yt50ZRnneSpkQ11lVTwiq'
// });
// fetch(request)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (responseAsJson) {
//     data = responseAsJson;
//   })
//   .catch(function (err) {
//     console.error(err);
//   });