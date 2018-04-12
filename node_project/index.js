var express = require('express')
var faker = require('faker')
var request = require ('request')

 // Create a new express application
var app = express()

app.use(express.static('public'))


  // Add a route at "/" that responds to GET requests
app.get('/', function(request, response) {
    response.send('index.html')
  })

app.get('/test',function(request,response) {
	response.send('Testing!!!')
})

app.get('/geo', function(req, response) {
  var latitude = faker.address.latitude()
  var longitude = faker.address.longitude()

  var weatherKey = 'bf051e197da4655b52447684d8d279d3'
  var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherKey

  request(weatherURL, function(error, res, body) {
    response.send(JSON.parse(body))
  })
})

app.get('/coords/lat/:lat/lng/:lng', function(req, res) {
  var params = req.params
  var latitude = params.lat
  var longitude = params.lng
  console.log(latitude, longitude)

  var weatherKey = 'bf051e197da4655b52447684d8d279d3'
  var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherKey

  request(weatherURL, function(error, response, body) {
    response.send(JSON.parse(body))
  })
})


  // Listens for HTTP requests on port 1337
app.listen(1337, function() {
    console.log('The magic is going down on 1337!')
  })
