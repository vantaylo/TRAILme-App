$(document).ready(function () {
  getTrailName();
});
// ↑ END $(document).ready(function())

// ↓ Here I am creating a function that appends the cards layout based on the level of
//.. difficulty received from HikingProject API
//.. to understand the card layout look at Cards tab on Materialize CSS framework website(Horizontal Card Layout)
function renderCard(levelOfDifficulty, trail) {
  var linkEl = $("<a class = 'link' href='#'> More Info </a>").attr(
    "href",
    trail.url
  );
  var cardActionDiv = $("<div class ='card-action'>").append(linkEl);
  var intermediate = $(
    `<p class ='trail-data' > Level of Difficulty: ${levelOfDifficulty} </p>`
  );
  var trailLengthP = $("<p class ='trail-data left'>").text(
    "Length: " + trail.length + " miles"
  );
  var summary = $("<p class = 'trail-data'>").text("Summary: " + trail.summary);
  var rating = $("<p class = 'trail-data'>").text(
    "Review " + trail.stars + "/5"
  );
  var cardContentDiv = $("<div class ='card-content .targetDiv'>").append(
    intermediate,
    trailLengthP,
    summary,
    rating
  );

  var cardStackedDiv = $("<div class ='card-stacked amber lighten-5'>").append(
    cardContentDiv,
    cardActionDiv
  );
  var trailImageEl = $("<img class ='responsive-img'>").attr(
    "src",
    trail.imgSmallMed
  );
  var cardImgDiv = $("<div class ='card-image responsive-img'>").append(
    trailImageEl
  );
  var cardHorzDiv = $("<div class ='card horizontal'>").append(
    cardImgDiv,
    cardStackedDiv
  );
  var cardH2 = $("<h2 class ='header'>").text(trail.name);
  var trailCardDiv = $("<div class='col s12 m6 hoverable'>").append(
    cardH2,
    cardHorzDiv
  );
  $(".append-trail-info").append(trailCardDiv);
}
//↓ I am creating a variable that is set to 10
//..which is the number of trails that will show on the page
var numberOfTrailsToDisplay = 10;
// ↓ I am creating a function that will target the local storage that is what
//.. the user chose from the Level Of difficulty radio buttons from index.html page
function showList(currentDifficulty, trailList) {
  if (currentDifficulty === "easyBtn") {
    //↓ set count to '0'
    var count = 0;
    trailList.forEach(function (trail) {
      if (trail.difficulty === "green") {
        //↓ once the count goes pass to the declared variable( currently hardcoded at 10) stop displaying the trails
        //.. this is to show a set number of trails on the page
        if (count < numberOfTrailsToDisplay) {
          //↓ calling renderCard function which was the Horizontal Card Layout that will append to page
          renderCard("Easy", trail);
        }
        count++;
      }
    });
    //↓ same info as above, but just repeated to change the different level of difficulties
  } else if (currentDifficulty === "easyIntBtn") {
    trailList.forEach(function (trail) {
      if (trail.difficulty === "greenBlue") {
        var count = 0;
        if (count < numberOfTrailsToDisplay) {
          renderCard("Easy/Intermediate", trail);
        }
        count++;
      }
    });
  } else if (currentDifficulty === "intermediateBtn") {
    trailList.forEach(function (trail) {
      if (trail.difficulty === "blue") {
        var count = 0;
        if (count < numberOfTrailsToDisplay) {
          renderCard("Intermediate", trail);
        }
        count++;
      }
    });
  } else if (currentDifficulty === "intDiffBtn") {
    trailList.forEach(function (trail) {
      if (trail.difficulty === "blueBlack") {
        var count = 0;
        if (count < numberOfTrailsToDisplay) {
          renderCard("Intermediate/Difficult", trail);
        }
        count++;
      }
    });
  } else if (currentDifficulty === "difficultBtn") {
    trailList.forEach(function (trail) {
      if (trail.difficulty === "black") {
        var count = 0;
        if (count < numberOfTrailsToDisplay) {
          renderCard("Difficult", trail);
        }
        count++;
      }
    });
  }
}
//↓ This function will retreive the hiking trails from Hiking Project API
function getTrailName() {
  var hikingAPI = "https://www.hikingproject.com/data/get-trails?lat=";
  // ↓ currently hardcoing the max results in the APIkey
  var apiKey = "200774823-429dcd20b5a00db1d5c1120bef4c2278&maxResults=200";

  // hardcoding lat long for Austin and a max distance of 50 miles(for now)
  var maxDist = 50;
  var lat = localStorage.getItem("trailme_latitude") || "30.266666";
  var long = localStorage.getItem("trailme_longitude") || "-97.73333";

  var hikingQueryURL =
    hikingAPI +
    lat +
    "&lon=" +
    long +
    "&maxDistance=" +
    maxDist +
    "&key=" +
    apiKey;

  // get hiking API info

  $.ajax({
    url: hikingQueryURL,
    method: "GET",
  }).then(function (response) {
    // ↓ declaring variable trails to the API object of the trails
    var trails = response.trails;
    //console.log("Response", response);
    // console.log("Trail Name: ", trails);

    // ↓ declaring variable to receive the data from local storage that user picked from index.html
    //.. currentDifficulty string (not variable name) is the KEY in local storage
    var currentDifficulty = localStorage.getItem("currentDifficulty");
    // ↓ calling showlist function and inputing arguments of KEY name currentDifficulty which is also the variable name and trails
    //.. which is variable that has all the trails from Hiking Project API
    showList(currentDifficulty, trails);
    //console.info("afterShowList");
  });
}
