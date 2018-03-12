var map = new google.maps.Map(document.getElementById('map'), {
    center: {
    	lat: 40.7128, 
    	lng: -74.0060
    },
    zoom: 10
  });

//var input = document.getElementById('input');
//var searchBox = new google.maps.places.SearchBox(input);
var searchBox = new google.maps.places.SearchBox(document.getElementById('input'));
//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
var markers = [];
searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }
markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      

var marker = new google.maps.Marker({
    position: {
        lat: 40.7128, 
        lng: -74.0060},
    map: map,
    title: 'New York, NY'
  });

document.querySelector('#button').onclick = addNewItem

function addNewItem(){

    var newItem = document.querySelector('#input').value
    if (newItem ==="") {
        alert("No entry")
    }

    var newListItem =document.createElement('li')
    newListItem.innerHTML=newItem
    document.querySelector('#list').appendChild(newListItem)
    document.querySelector('#input').value=("")
}


