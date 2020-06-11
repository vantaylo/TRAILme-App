//retrieve from local storage on page refresh
//added for loop to go through local storage but only look at btns
//added a property to the html checkbox element (checked = true)
//*use 3 handlers if need to optimize speed (localStorage.getItem("") !== null)*
//USER LOADS PAGE FOR FIRST TIME - all checkboxes empty

$(document).ready(function () {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).endsWith("Btn")) {
      $("#" + localStorage.key(i)).prop("checked", true);
    }
  }

  const uncheckBoxes = (clickedBox) => {
    $("input").each(function () {
      if ($(this).is(":checked") && !$(this).is(clickedBox)) {
        $(this).prop("checked", false);
      }
    });

    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).endsWith("Btn")) {
        $("#" + localStorage.key(i)).prop("checked", true);
      }
    }
  };

  //event listeners for when checkboxes are clicked
  $("#easyBtn").click(function (event) {
    uncheckBoxes($(this));

    if ($(this).is(":checked")) {
      //saving to local storage -checked
      localStorage.setItem("currentDifficulty", "easyBtn");
    }
  });

  $("#easyIntBtn").click(function (event) {
    uncheckBoxes($(this));

    if ($(this).is(":checked")) {
      localStorage.setItem("currentDifficulty", "easyIntBtn");
    }
  });

  $("#intermediateBtn").click(function (event) {
    uncheckBoxes($(this));

    if ($(this).is(":checked")) {
      localStorage.setItem("currentDifficulty", "intermediateBtn");
    }
  });

  $("#intDiffBtn").click(function (event) {
    uncheckBoxes($(this));

    if ($(this).is(":checked")) {
      localStorage.setItem("currentDifficulty", "intDiffBtn");
    }
  });

  $("#difficultBtn").click(function (event) {
    uncheckBoxes($(this));

    if ($(this).is(":checked")) {
      localStorage.setItem("currentDifficulty", "difficultBtn");
    }
  });

  //cities button dropdown and text update
  $(".dropdown-button").dropdown();

  $("li a").click(function (event) {
    let cityPicked = $(this).text();
    $(".dropdown-button").html(cityPicked);
  });

  //object for apiURL
  var cities = {
    Austin: {
      latitude: "30.26",
      longitude: "-97.73",
    },

    "San Marcos": {
      latitude: "29.890661",
      longitude: "-97.91153",
    },

    "Fort Worth": {
      latitude: "32.768799",
      longitude: "-97.309341",
    },

    "San Antonio": {
      latitude: "29.424349",
      longitude: "-98.491142",
    },

    Houston: {
      latitude: "29.749907",
      longitude: "-95.358421",
    },

    Dallas: {
      latitude: "32.779167",
      longitude: "-96.808891",
    },

    Waco: {
      latitude: "31.559814",
      longitude: "-97.1418",
    },

    Amarillo: {
      latitude: "35.199165",
      longitude: "-101.845276",
    },

    "Corpus Christi": {
      latitude: "27.800583",
      longitude: "-97.396378",
    },

    "El Paso": {
      latitude: "31.772543",
      longitude: "-106.460953",
    },
  };

  //prompt user to pick at least one level
  $("#submit-btn").click(function (event) {
    let optionChecked = false;

    $("input").each(function (index) {
      if ($(this).is(":checked")) {
        optionChecked = true;
      }
    });

    var currentCity = $(".dropdown-button").text();

    if (!optionChecked) {
      M.toast({ html: "Please, pick at least one level" });
      return;
    }

    if (currentCity === "Cities") {
      M.toast({ html: "Please, pick a city" });
      return;
    }

    localStorage.setItem("trailme_latitude", cities[currentCity].latitude);
    localStorage.setItem("trailme_longitude", cities[currentCity].longitude);

    getTrailName();
    window.location.href = "results.html";
  });
});

// Here we are building the URL we need to query the database
var weatherArray = [];
var temparray = [];
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url:
    "https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude=daily&appid=76177e785f18f1154ee3d5f16bf4b076",
  method: "GET",
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {
    // console.log(response.hourly[4]);
    for (var i = 0; i < 5; i++) {
      //console.log(response.hourly[i].weather);
      weatherarray.push(response.hourly[i].weather);
      temparray.push(response.hourly[i].temp);
      //console.log(weatherarray[i]);
      //console.log(temparray[i]);
    }
  });
//create 5 variables( current hour + next for hours)

// ajax/promise GET method

//Create an array of the lat an long for every city. (every city has its own array). push the lat and long of the selected array to a working array
//clear the working array before the push

// $(document).ready(function ())
//creates arrays to store only the json info we need
var weatherarray = [];
var temparray = [];
// calls open weather API
$.ajax({
  url:
    "https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude=daily&appid=76177e785f18f1154ee3d5f16bf4b076",
  method: "GET",
}).then(function (response) {
  // console.log(response.hourly[4]);
  //runs 5 times for 5 hours
  for (var i = 0; i < 5; i++) {
    //console.log(response.hourly[i].weather);
    //pushes necessary json info to the arrays created early
    weatherarray.push(response.hourly[i].weather);
    temparray.push(response.hourly[i].temp);
    //changes temperature to farenheight
    temparray[i] = Math.trunc((temparray[i] - 273.15) * 1.8 + 32);
    //console.log(weatherarray[i]);
    //console.log(temparray[i]);
    //console.log(weatherarray[i][0].icon);
    //creates image variable
    var img = $('<img id="weatherico">');
    //pulls the image from the openweather projects own image library
    img.attr(
      "src",
      "https://openweathermap.org/img/wn/" + weatherarray[i][0].icon + "@2x.png"
    );
    //apends to end of page
    img.appendTo("#h-" + i.toString() + "-weather");
    //creates the weather type and appends it to table ie. if the weather for that hour is clear, it will say clear next to the icon
    $("#h-" + i.toString() + "-weather")
      .add("<span>" + weatherarray[i][0].main + "</span>")
      .appendTo("#h-" + i.toString() + "-weather");
    //creates temperature element and appends the data to the temperature column of the table
    $("#h-" + i.toString() + "-temp")
      .add("<span>" + temparray[i] + " Degrees Farenheight" + "</span>")
      .appendTo("#h-" + i.toString() + "-temp");
  }
});
//create 5 variables( current hour + next for hours)

// ajax/promise GET method
/*for(var i = 0; i < 5; i++)
{
  console.log(weatherarray[i]);
  var img = $('<img id="weatherico">')
  img.attr('src', 'https://openweathermap.org/img/wn/' + weatherarray[i] + '@2x.png')
}*/
// get weather API

// create Elements,classes,ID's,attributes and append to html
