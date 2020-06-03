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

// how we are going to save user's level of difficulty using localStorage
