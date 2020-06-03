// START $(document).ready(function())
$(document).ready(function () {
  getTrailName();
});
// ^^ END $(document).ready(function())
function getTrailName(trailName) {
  var hikingAPI = "https://www.hikingproject.com/data/get-trails?lat=";
  var apiKey = "200774823-429dcd20b5a00db1d5c1120bef4c2278";

  // hardcoding lat long for Austin and a max distance of 50 miles(for now)
  var lat = 30.266666;
  var long = -97.73333;
  var maxDist = 50;

  var hikingQueryURL =
    hikingAPI +
    lat +
    "&lon=" +
    long +
    "&maxDistance=" +
    maxDist +
    "&key=" +
    apiKey;

  //console.log("Hiking URL", hikingQueryURL);

  // get hiking API info
  $.ajax({
    url: hikingQueryURL,
    method: "GET",
  }).then(function (response) {
    var trailName = response.trails;
    //console.log("Response", response);
    //console.log("Trail Name: ", trailName);
    //$("#trail-name").append(trailName);
  });
}

// append 10 results at a time (nice to have: give user option on how many trails to show at once)

// create Elements,classes,ID's,attributes and append to html
