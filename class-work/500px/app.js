_500px.init({
    sdk_key: '96d63a59eac69bb0d038b322713f50b7543c6943'
});


$('#login').click(function() {
    _500px.login();
});


// When a successful login to 500px is made, they fire off the 'authorization_obtained' event
_500px.on('authorization_obtained', function() {
    // Successful OAuth login!
    $('.sign-in-view').hide()
    $('.image-results-view').show()
});


// check if navigator geolocation is available from the browser
if (navigator.geolocation) {
    // if it is use the getCurrentPosition method to retrieve the Window's location
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log('lat: ', lat);
        console.log('long: ', long);

        // Feel free to adjust the search radius as you see fit
        var radius = '25mi';

        var searchOptions = {
            geo: lat + ',' + long + ',' + radius,
            only: 'Landscapes', // We only want landscape photos
            image_size: 3, // This isn't neccessary but by default the images are thumbnail sized
            sort: 'highest_rating'
        };

        _500px.api('/photos/search', searchOptions, function(response) {
            if (response.data.photos.length === 0) {
                alert('No photos found!');
            } else {
                console.log(response);
                response.data.photos.forEach(function(photo) {
                    $('.images').append('<img class="image" src=' + photo.image_url[0] + '></img>')
                    
                })

            }
        });

    })
} else {
    $('.images').append('Sorry, the browser does not support geolocation');
}