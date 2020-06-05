// $(document).ready(function ())
    //creates arrays to store only the json info we need
    var weatherarray = [];
    var temparray = [];
    // calls open weather API
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=30.2672&lon=-97.7431&exclude=daily&appid=76177e785f18f1154ee3d5f16bf4b076",
      method: "GET"
    })
      .then(function(response) {
       // console.log(response.hourly[4]);
       //runs 5 times for 5 hours
        for(var i = 0; i < 5; i++){
        //console.log(response.hourly[i].weather);
        //pushes necessary json info to the arrays created early
        weatherarray.push(response.hourly[i].weather);
        temparray.push(response.hourly[i].temp);
        //changes temperature to farenheight
        temparray[i] = Math.trunc((temparray[i] - 273.15) * 1.80 + 32);
        //console.log(weatherarray[i]);
        //console.log(temparray[i]);
        //console.log(weatherarray[i][0].icon);
        //creates image variable
        var img = $('<img id="weatherico">');
        //pulls the image from the openweather projects own image library
        img.attr('src', 'https://openweathermap.org/img/wn/' + weatherarray[i][0].icon + '@2x.png');
        //apends to end of page
        img.appendTo("#h-" + i.toString() + "-weather");
        //creates the weather type and appends it to table ie. if the weather for that hour is clear, it will say clear next to the icon
        $("#h-" + i.toString() + "-weather").add( "<span>" + weatherarray[i][0].main + "</span>" ).appendTo("#h-" + i.toString() + "-weather");
        //creates temperature element and appends the data to the temperature column of the table
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
