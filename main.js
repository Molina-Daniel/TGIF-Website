
document.getElementById("senateData").innerHTML = JSON.stringify(senateData, null, 2);

// senateData.results[0].members[0].first_name

function getSenateData(row) {
  return row.senateData.results.members.map(function (members) {
    return "<td>" + members.first_name + "</td>";
  }).join("");
}

function getRowsHtml(params) {
  
}