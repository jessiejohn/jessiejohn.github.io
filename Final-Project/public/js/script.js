//changes colour on div boxes
$('.firstDiv, .secondDiv').mouseenter(function() {
    $(this).css('background', '#FFFAFA')
})

$('.firstDiv, .secondDiv').mouseleave(function() {
    $(this).css('background', '#F5F5F5')
})

var currentSearchResult
var map

function initAutocomplete() {

    //to open map to users location
    //var map = new google.maps.Map(document.getElementById('map'))
   // opens map to the location for the user.
    // navigator.geolocation.getCurrentPosition(handleResponse)
    // function handleResponse(position) {

    //console.log(position)
    //   map = new google.maps.Map(document.getElementById('map'), {
    //     center: {
    //       lat: position.coords.latitude, 
    //       lng: position.coords.longitude
    //     },
    //     zoom: 17
    //   });
    // }

    //Launches map with zoomed in on nyc. 
    //https://developers.google.com/maps/documentation/javascript/reference/3.exp/map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.7128,
            lng: -74.0060
        },
        zoom: 10
    });

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

// //To create list of items searched
// $('.buttonTwo').click(addNewItem)

// function addNewItem() {
//     var newItem = $('#input').val()
//     if (newItem === "") {
//         alert("No entry")
//         $('#input').focus() //highlights input tab
//     } else {
//         $("#list").append('<li>' + newItem + '</li>')
//         $('#input').focus() //highlights the input tab and outs cursor there to add items.
//         new google.maps.Marker({
//                 map: map,
//                 icon:icon,
//                 title:place.name,
//                 position: currentSearchResult.position  
//         })
//     }
//  }



// Get a reference to the root of the Database
var restaurantWishList = firebase.database()
// Create a section for messages data in your db
var restaurantsList = restaurantWishList.ref('restaurants')

$('.buttonTwo').click(function(event) {
    event.preventDefault()
    var restaurantName = $('#input').val()
    restaurantsList.push({
        restaurant: restaurantName,
        votes: 0,
        position: currentSearchResult.position,
        user: firebase.auth().currentUser.displayName,
    })
    $('#input').val('')
})

function getFanMessages() {
    // listens for changes to the `messages` node in the DB
    restaurantWishList.ref('restaurants').on('value', function(results) {
        $('#list').empty()
        results.forEach(function(rest) {
            var entity = rest.val()
            var votes = entity.votes
            var user = entity.user
            var position = entity.position
            var restaurant = entity.restaurant
            //var flag = entity.flag
            var id = rest.key
            var markerIcon = new google.maps.Marker({
                map: map,
                position: position,
            })

            //console.log(message, id)
            //below we add $ to the variable name just to make it clear its jquery. dont have to. its to make it very clear is jquery
            //console.log(entity)
            var $li = $('<li>').text(restaurant)
            //var $map = $('#map').append(flag)

            // Create up vote element
            var $upVoteElement = $('<i class="fa fa-thumbs-up pull-right">')
            $upVoteElement.on('click', function() {
                updateMessage(id, ++votes)
            })

            // Create down vote element
            var $downVoteElement = $('<i class="fa fa-thumbs-down pull-right">')
            $downVoteElement.on('click', function() {
                updateMessage(id, --votes)
                //$(this).css('color','red')
            })

            // create delete element
            var $deleteElement = $('<i class="fa fa-trash pull-right delete"></i>')
            $deleteElement.on('click', function() {
                deleteMessage(id)
            })

            $li.append($deleteElement)
            $li.append($downVoteElement)
            $li.append($upVoteElement)
            $li.append('<div class="pull-right">' + votes + '</div>')
            $('#list').append($li)
        })
    })
}

function updateMessage(id, votes) {
    // find message whose objectId is equal to the id we're searching with
    var restaurantsList = restaurantWishList.ref('restaurants/' + id)
    // update votes property
    restaurantsList.update({
        votes: votes,
    })
}

function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var restaurantsList = restaurantWishList.ref('restaurants/' + id)
    restaurantsList.remove()
}

getFanMessages()

//authentication
var ui = new firebaseui.auth.AuthUI(firebase.auth())

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function() {
            return false;
        },
    },
    //below provides paths to sign in. So you can add multiple paths like gmail etc.https://firebase.google.com/docs/auth/web/firebaseui
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, ],
}

ui.start('#firebaseui-auth-container', uiConfig)

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('#sign-in-container').hide()
        $('#index,#map').show()
    } else {
        $('#sign-in-container').show()
        $('#index,#map').hide()
    }
})

$('#sign-out').click(function() {
    firebase.auth().signOut()
})