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
        console.log(weatherarray[i]);
        console.log(temparray[i]);
        }
      });
//create 5 variables( current hour + next for hours)

// ajax/promise GET method

// get weather API

// create Elements,classes,ID's,attributes and append to html

// how we are going to save user's level of difficulty using localStorage
