// GOOGLE MAP SETUP HERE:
var map = new google.maps.Map(document.getElementById('map'), {
    center: {
    	lat: 40.7128, 
    	lng: -74.0060
    },
    zoom: 12
  });

 var marker = new google.maps.Marker({
    position: {
    	lat: 40.7128, 
    	lng: -74.0060},
    map: map,
    title: 'New York, NY'
  });


// CITIBIKE PROJECT HERE:
function renderCitiBikeMarkers(stations) {
	stations.forEach (function(station){
  	var marker = new google.maps.Marker({
    position: {
    	lat:  station.lat/1000000,
    	lng:  station.lng/1000000
    },
    map: map,
    title: station.name + '\nHas '+ station.free + ' free bikes' 

  	});
	});
}






// AJAX request to fetch the station data from CitiBike's API
// Warning! Do not break this :D
$.ajax({
	type: 'GET',
	url: 'http://api.citybik.es/citi-bike-nyc.json',
	success: renderCitiBikeMarkers,
});
