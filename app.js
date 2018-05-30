/* eslint-disable */
/* eslint-env browser */
const key = config.mapsKey;

// Sidebar toggle event
document.getElementById('sidebarCollapse').addEventListener('click', (e) => {
  document.getElementById('sidebar').classList.toggle('active');
  e.preventDefault();
});

// Map script load event
document.addEventListener('DOMContentLoaded', InsertMapScriptOnLoad);

// Menu button listener
document.getElementById('tracker-1').addEventListener('click', function () {
  createMarker();
});

function InsertMapScriptOnLoad() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=showGoogleMaps`;
  document.body.appendChild(script);
}

// Set map center location
const position = [27.1959739, 78.02423269999997];

let map;

function showGoogleMaps() {
  const latLng = new google.maps.LatLng(position[0], position[1]);

  const mapOptions = {
    zoom: 16, // initialize zoom level - the max value is 21
    streetViewControl: false, // hide the yellow Street View pegman
    scaleControl: false, // allow users to zoom the Google Map
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latLng,
    fullscreenControl: false,
    mapTypeControl: false,
  };

  map = new google.maps.Map(
    document.getElementById('googleMap'),
    mapOptions,
  );
}
// Show the default red marker at the location
const createMarker = function () {

  marker = new google.maps.Marker({
    position: { lat: 27.1959739, lng: 78.02423269999997 },
    draggable: false,
    animation: google.maps.Animation.DROP
  });
  marker.setMap(map);
}
