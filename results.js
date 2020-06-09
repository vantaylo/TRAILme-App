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
  var trailLevel = $(
    `<p class ="trail-data"><a href="https://icons8.com/icon/64470/effort"></a><img
    class="trail-data"
    src="https://img.icons8.com/ios-filled/25/000000/effort.png"
  /> ${levelOfDifficulty} </p>`
  );
  var lengthText = trail.length + " miles";
  var trailLengthP = $(
    `<p class ='trail-data'><span class= 'iconify icons' data-icon='mdi-hiking' data-inline='false'></span> ${lengthText}</p>`
  );

  //var summary = $("<p class = 'trail-data'>").text("Summary: " + trail.summary);
  var ratingText = trail.stars + "/5";
  var rating = $(
    `<p class = 'trail-data'><i class="apps material-icons icons">star</i> ${ratingText}</p>`
  );
  var cardContentDiv = $("<div class ='card-content .targetDiv'>").append(
    trailLevel,
    trailLengthP,
    rating
  );
  var trailImageEl = $("<img class = 'materialboxed responsive-img'>").attr(
    "src",
    trail.imgSmallMed
  );
  var nameOfTrail = trail.name;
  var h2CardTitle = $(
    `<span class = 'card-title text'><strong>${nameOfTrail}</span></h2>`
  );
  var cardImgDiv = $("<div class ='card-image'>").append(
    trailImageEl,
    h2CardTitle
  );

  var cardDiv = $("<div class ='card'>").append(
    cardImgDiv,
    cardContentDiv,
    cardActionDiv
  );

  var cardColumnDiv = $("<div class ='col s12 m12 amber lighten-5 '>").append(
    cardDiv
  );

  var cardRow = $("<div class ='row'>").append(cardColumnDiv);
  //var h2CardTitle = $("<h2 class = 'card-title'>").text(trail.name);

  $(".append-trail-info").append(cardRow);
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



    // ↓ declaring variable to receive the data from local storage that user picked from index.html
    //.. currentDifficulty string (not variable name) is the KEY in local storage
    var currentDifficulty = localStorage.getItem("currentDifficulty");
    // ↓ calling showlist function and inputing arguments of KEY name currentDifficulty which is also the variable name and trails
    //.. which is variable that has all the trails from Hiking Project API
    showList(currentDifficulty, trails);
    //console.info("afterShowList");
  });
}
