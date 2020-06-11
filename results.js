$(document).ready(function () {
  getTrailName();
  populateTable();
});
// ↑ END $(document).ready(function())
//weather dashboard
//console.log(localStorage.getItem("currentDifficulty"));
function populateTable() {
  var weatherarray = [];
  var temparray = [];

  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      localStorage.getItem("trailme_latitude") +
      "&lon=" +
      localStorage.getItem("trailme_longitude") +
      "&exclude=daily&APPID=6331b558a2d7fa66a892d8e22187e11a",
    method: "GET",
  }).then(function (response) {
    for (var i = 0; i < 5; i++) {
      weatherarray.push(response.hourly[i].weather);
      temparray.push(response.hourly[i].temp);
      temparray[i] = Math.trunc((temparray[i] - 273.15) * 1.8 + 32);

      var img = $('<img id="weatherico">');

      img.attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          weatherarray[i][0].icon +
          "@2x.png"
      );

      img.appendTo("#h-" + i.toString() + "-weather");
      $("#h-" + i.toString() + "-weather")
        .add("<span>" + weatherarray[i][0].main + "</span>")
        .appendTo("#h-" + i.toString() + "-weather");
      $("#h-" + i.toString() + "-temp")
        .add(
          "<span id = 'tempspan'>" +
            temparray[i] +
            " Degrees Farenheight" +
            "</span>"
        )
        .appendTo("#h-" + i.toString() + "-temp");
    }
  });
}

// ↓ Here I am creating a function that appends the cards layout based on the level of
//.. difficulty received from HikingProject API
//.. to understand the card layout look at Cards tab on Materialize CSS framework website(Horizontal Card Layout)
function renderCard(levelOfDifficulty, trail) {
  var linkEl = $(
    "<a class = 'link' href='#' target ='_blank'> More Info </a>"
  ).attr("href", trail.url);
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
  var trailImageEl;
  if (trail.imgSmallMed != "") {
    trailImageEl = $("<img class = 'materialboxed responsive-img'>").attr(
      "src",
      trail.imgSmallMed
    );
  } else {
    trailImgArray = [
      "https://cdn2.apstatic.com/photos/hike/7036387_smallMed_1555022266.jpg",
      "https://cdn2.apstatic.com/photos/hike/7031678_smallMed_1554931541.jpg",
      "https://cdn2.apstatic.com/photos/hike/7055890_smallMed_1555710248.jpg",
      "https://cdn2.apstatic.com/photos/hike/7052925_smallMed_1555697438.jpg",
      "https://cdn2.apstatic.com/photos/hike/7055881_smallMed_1555710228.jpg",
      "https://cdn2.apstatic.com/photos/hike/7027832_smallMed_1554916999.jpg",
      "https://cdn2.apstatic.com/photos/hike/7027979_smallMed_1554917331.jpg",
      "https://cdn2.apstatic.com/photos/hike/7009037_smallMed_1554395717.jpg",
      "https://cdn2.apstatic.com/photos/hike/7055127_smallMed_1555708381.jpg",
      "https://cdn2.apstatic.com/photos/hike/7069728_smallMed_1586964832.jpg",
    ];
    trailImageEl = $(
      `<img class = 'materialboxed responsive-img' src =${
        trailImgArray[Math.floor(Math.random() * trailImgArray.length)]
      }>`
    );
  }

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
    localStorage.clear();
    //↓ same info as above, but just repeated to change the different level of difficulties
  } else if (currentDifficulty === "easyIntBtn") {
    var count = 0;
    trailList.forEach(function (trail) {
      if (trail.difficulty === "greenBlue") {
        if (count < numberOfTrailsToDisplay) {
          renderCard("Easy/Intermediate", trail);
        }
        count++;
      }
    });
    localStorage.clear();
  } else if (currentDifficulty === "intermediateBtn") {
    var count = 0;
    trailList.forEach(function (trail) {
      if (trail.difficulty === "blue") {
        if (count < numberOfTrailsToDisplay) {
          renderCard("Intermediate", trail);
        }
        count++;
      }
    });
    localStorage.clear();
  } else if (currentDifficulty === "intDiffBtn") {
    var count = 0;
    trailList.forEach(function (trail) {
      if (trail.difficulty === "blueBlack") {
        if (count < numberOfTrailsToDisplay) {
          renderCard("Intermediate/Difficult", trail);
        }
        count++;
      }
    });
    localStorage.clear();
  } else if (currentDifficulty === "difficultBtn") {
    var count = 0;
    trailList.forEach(function (trail) {
      if (trail.difficulty === "black") {
        if (count < numberOfTrailsToDisplay) {
          renderCard("Difficult", trail);
        }
        count++;
      }
    });
    localStorage.clear();
  }
}
//↓ This function will retreive the hiking trails from Hiking Project API
function getTrailName() {
  var hikingAPI = "https://www.hikingproject.com/data/get-trails?lat=";
  // ↓ currently hardcoing the max results in the APIkey
  var apiKey = "200774823-429dcd20b5a00db1d5c1120bef4c2278&maxResults=500";

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

    //console.log(localStorage.getItem("currentDifficulty"));

    // ↓ calling showlist function and inputing arguments of KEY name currentDifficulty which is also the variable name and trails
    //.. which is variable that has all the trails from Hiking Project API
    showList(currentDifficulty, trails);
    //console.info("afterShowList");
  });
}
