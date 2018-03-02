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