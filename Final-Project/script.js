
var currentSearchResult
var map

function initAutocomplete() {

    //to open map to users location
    var map = new google.maps.Map(document.getElementById('map'))
    //opens map to the location for the user.
    navigator.geolocation.getCurrentPosition(handleResponse)
    function handleResponse(position) {

      console.log(position)
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: position.coords.latitude, 
          lng: position.coords.longitude
        },
        zoom: 17
      });
    }

    //Launches map with zoomed in on nyc. 
    // https://developers.google.com/maps/documentation/javascript/reference/3.exp/map
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {
    //         lat: 40.7128,
    //         lng: -74.0060
    //     },
    //     zoom: 10
    // });

    //https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-widget#SearchBox    
    var searchBox = new google.maps.places.SearchBox(document.getElementById('input'));

    // Bias the SearchBox results towards current map's viewport. addListener is javaScript not API event.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    var markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve it in the searchbox
    //if no place is written, just dont return any results.
    searchBox.addListener('places_changed', function() {
        //getPlaces returns an array of PlaceResult.https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-widget#SearchBox
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.Looking at LatLngBounds class.
        var bounds = new google.maps.LatLngBounds();
        //defensive code, if there is no latlong etc. console.log.
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            //url referring to place.icon in the array of PlaceResult. https://developers.google.com/maps/documentation/javascript/reference/3.exp/places-service#PlaceResult
            //https://developers.google.com/maps/documentation/javascript/reference/3.exp/marker#Icon
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

            // update latest search result
            currentSearchResult = {
                position: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                }
            }

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);

        //adds items to the wishList array



    })
}

//To create list of items searched
$('.buttonTwo').click(addNewItem)

function addNewItem() {
    var newItem = $('#input').val()
    if (newItem === "") {
        alert("No entry")
        $('#input').focus() //highlights input tab
    } else {
        $("#list").append('<li>' + newItem + '</li>')
        $('#input').val("") //makes the input tab blank again
        $('#input').focus() //highlights the input tab and outs cursor there to add items.
        new google.maps.Marker({
            map: map,
            position: currentSearchResult.position,

        })
    }
}

//$('.buttonThree').click(wishList)


// $('#buttonTwo').click(addMarker)
// function addMarker (locations) {
//   locations.forEach (function(location){
//     var marker = new google.maps.Marker({
//       position: {
//         lat:  location.position.lat
//         lng:  location.position.lng
//       }
//       map: map,
//       title: 'wishlist'
// }


// pull marker from markers array and create new google.maps.Marker
// get lat and lng using:
// markers[0].position.lat()
// markers[0].position.lng()

//creates list of new items.



//changes colour on div boxes
$('.firstDiv, .secondDiv').mouseenter(function() {
    $(this).css('background', '#F5FFFA')
})

$('.firstDiv, .secondDiv').mouseleave(function() {
    $(this).css('background', '#F5F5F5')
})