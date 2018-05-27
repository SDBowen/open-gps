/* eslint-disable */
const key = config.mapsKey;

document.getElementById('menu-toggle').addEventListener('click', (e) => {
  document.getElementById('wrapper').classList.toggle('displayMenu');
  e.preventDefault();
});

var position = [27.1959739, 78.02423269999997];

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?' +
    'key=' + key + '&callback=showGoogleMaps';
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', loadScript);

function showGoogleMaps() {

  var latLng = new google.maps.LatLng(position[0], position[1]);

  var mapOptions = {
    zoom: 16, // initialize zoom level - the max value is 21
    streetViewControl: false, // hide the yellow Street View pegman
    scaleControl: true, // allow users to zoom the Google Map
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latLng
  };

  map = new google.maps.Map(document.getElementById('googleMap'),
    mapOptions);

  // Show the default red marker at the location
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  });
}

