//Launches map with zoomed in on nyc. 
var map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: 40.7128, 
    lng: -74.0060
  },
  zoom: 10
});
      
//line 14 to 59 copied from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
//line 12 customised. powered by google search auto completes search query, when string typed into the input tab
var searchBox = new google.maps.places.SearchBox(document.getElementById('input'));
// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});
var markers = [];
// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
searchBox.addListener('places_changed', function() {
  var places = searchBox.getPlaces();
  if (places.length == 0) {
            return;
  }
// Clear out the old markers.
  markers.forEach(function(marker) {
    marker.setMap(null);
  });
  markers = [];
// For each place, get the icon, name and location.
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
// Create a marker for each place.
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



//To create list of items searched
$('#buttonTwo').click(addNewItem)
function addNewItem () {
  var newItem = $('#input').val()
    if (newItem ==="") {
      alert("No entry")
      $('#input').focus()//highlights input tab
    }
    else {
      $("#list").append('<li>' +newItem +'</li>')
      $('#input').val("") //makes the input tab blank again
      $('#input').focus() //highlights the input tab and outs cursor there to add items.
    }
} 

$(document).on('click', 'li', function () {
    $(this).remove()
  })

// $(document).on('mouseenter','.all', function () {
//     $(this).css('bacground',  '#00FFFF')
//   })

// $('.introduction').mouseenter (function(){
//   $('.introduction').css('background', '#00FFFF')
// })
// $('.introduction').mouseleave(function(){
//   $('.introduction').css('background', '#00CED1')
// })

$('.one').mouseenter(function(){
  $('.one').css('background', '#00FFFF')
})
$('.one').mouseleave(function(){
  $('.one').css('background', '#00CED1')
})

$('.two').mouseenter(function(){
  $('.two').css('background', '#00FFFF')
})

$('.two').mouseleave(function(){
  $('.two').css('background', '#00CED1')
})

$('.three').mouseenter(function(){
  $('.three').css('background', '#00FFFF')
})

$('.three').mouseleave(function(){
  $('.three').css('background', '#00CED1')
})


