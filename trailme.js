//retrieve from local storage on page refresh
//added for loop to go through local storage but only look at btns
//added a property to the html checkbox element (checked = true)
//*use 3 handlers if need to optimize speed (localStorage.getItem("") !== null)*

$(document).ready(function () {
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).endsWith("Btn")) {
      $("#" + localStorage.key(i)).prop("checked", true);
    }
  }
});

//USER LOADS PAGE FOR FIRST TIME - all checkboxes empty
//event listeners for when checkboxes are clicked
$("#easyBtn").click(function (event) {
  if ($(this).is(":checked")) {
    //saving to local storage -checked
    localStorage.setItem("easyBtn", "true");
  } else {
    //remove from local storage - uncliked
    localStorage.removeItem("easyBtn");
  }
});

$("#easyIntBtn").click(function (event) {
  if ($(this).is(":checked")) {
    localStorage.setItem("easyIntBtn", "true");
  } else {
    localStorage.removeItem("easyIntBtn");
  }
});

$("#intermediateBtn").click(function (event) {
  if ($(this).is(":checked")) {
    localStorage.setItem("intermediateBtn", "true");
  } else {
    localStorage.removeItem("intermediateBtn");
  }
});

$("#intDiffBtn").click(function (event) {
  if ($(this).is(":checked")) {
    localStorage.setItem("intDiffBtn", "true");
  } else {
    localStorage.removeItem("intDiffBtn");
  }
});

$("#difficultBtn").click(function (event) {
  if ($(this).is(":checked")) {
    localStorage.setItem("difficultBtn", "true");
  } else {
    localStorage.removeItem("difficultBtn");
  }
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
=======
// $(document).ready(function ())

    // Here we are building the URL we need to query the database
    var weatherarray = [];
    var temparray = [];
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude=daily&appid=76177e785f18f1154ee3d5f16bf4b076",
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
       // console.log(response.hourly[4]);
        for(var i = 0; i < 5; i++){
        //console.log(response.hourly[i].weather);
        weatherarray.push(response.hourly[i].weather);
        temparray.push(response.hourly[i].temp);
        temparray[i] = Math.trunc((temparray[i] - 273.15) * 1.80 + 32);
        //console.log(weatherarray[i]);
        //console.log(temparray[i]);
        //console.log(weatherarray[i][0].icon);
        var img = $('<img id="weatherico">');
        img.attr('src', 'https://openweathermap.org/img/wn/' + weatherarray[i][0].icon + '@2x.png');
        img.appendTo("#h-" + i.toString() + "-weather");
        $("#h-" + i.toString() + "-weather").add( "<span>" + weatherarray[i][0].main + "</span>" ).appendTo("#h-" + i.toString() + "-weather");
        $("#h-" + i.toString() + "-temp").add( "<span>" + temparray[i] + " Degrees Farenheight" + "</span>" ).appendTo("#h-" + i.toString() + "-temp");
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
