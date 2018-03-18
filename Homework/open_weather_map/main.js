/*
Open Weather Map Instructions:

In this exercise, you will be leveraging the Open Weather Map API to fetch weather data for NYC and render the results in the DOM.

1) Setup an AJAX request to the Open Weather Map API:
- This task invovles building an endpoint using your API key, city of choice, and units of choice
- First, grab your API key from https://home.openweathermap.org/api_keys and plug it into API_KEY, below
- Next, add the following query parameters to URL, below:
  * 'q' - stands for 'query' - should be set equal to 'new+york,us'
  * 'units' should be set equal to your units of choice (imperial or metric)
  * 'APPID' should be set equal to API_KEY
- HINT: you will have to rely on string concatenation to build this URL
- CONSIDER: checking out the API docs to learn more about building your endpoint: https://openweathermap.org/current

2) Handle the API's response:
- First, investigate the data you are dealing with and print the AJAX's response using 'console.log(response)'
- Then, use jQuery DOM manipulation - *cough* .append() *cough* - to render the following into #nyc-weather:
  * The temperature
  * The hummidity
  * The wind speed

3) Change the background based on the temperature
- If the weather is good (your opinion) change the background to a happy Mayor de Blasio
- If the weather is bad (also, your opinion) change the background to a not-so-happy Mayor de Blasio

4) Want to be hardcore? Throw in a Google Map based off the response's lat/lng.
*/


// PART 1:
var API_KEY = 'bf051e197da4655b52447684d8d279d3'
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=las+vegas,us&units=metric&APPID=bf051e197da4655b52447684d8d279d3'

// can't touch this - dunnn dun dun dun
$.ajax({
  type: 'GET',
  url: URL,
  success: handleSuccess
})

// PART 2 (and possibly 3 and 4):
function handleSuccess(response) {
  console.log(response)
  $("#nyc-weather").append('<h2>'+ response.main.temp + '°C' +'</h2>').append('<h2>'+ response.main.humidity + ' Humidity' +'</h2>').append('<h2>'+ response.wind.speed+' Wind' + '</h2>')
  if (response.main.temp <= 10) {
  $('body').css('background','red')
  }
  else {
  $('body').css('background','green')
  }

var map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: response.coord.lat, 
    lng: response.coord.lon
  },
  zoom: 15
  });

}








