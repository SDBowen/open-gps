const key = config.mapsKey;
const ctaKey = config.ctaKey;
let marker;

// Sidebar toggle event
document.getElementById('sidebarCollapse').addEventListener('click', e => {
  document.getElementById('sidebar').classList.toggle('active');
  e.preventDefault();
});

// Map script load event
document.addEventListener('DOMContentLoaded', InsertMapScriptOnLoad);

// Menu button listener
document.getElementById('tracker-1').addEventListener('click', createMarker);

function InsertMapScriptOnLoad() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=showGoogleMaps`;
  document.body.appendChild(script);
}

// Set map center location
const position = [33.502351, -111.926193];

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
    mapTypeControl: false
  };

  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
}
// Show the default red marker at the location
function createMarker() {
  marker = new google.maps.Marker({
    position: { lat: 33.502351, lng: -111.926193 },
    draggable: false,
    animation: google.maps.Animation.DROP
  });
  marker.setMap(map);
}

const numDeltas = 100;
const delay = 10; // milliseconds
let i = 0;
let deltaLat;
let deltaLng;

function moveMarker() {
  position[0] += deltaLat;
  position[1] += deltaLng;
  const latlng = new google.maps.LatLng(position[0], position[1]);
  marker.setTitle(`Latitude:${position[0]} | Longitude:${position[1]}`);
  marker.setPosition(latlng);
  if (i !== numDeltas) {
    i += 1;
    setTimeout(moveMarker, delay);
  }
}

// transition([22.502351, -11.926193]);
function transition(result) {
  i = 0;
  deltaLat = (result[0] - position[0]) / numDeltas;
  deltaLng = (result[1] - position[1]) / numDeltas;
  moveMarker();
}

const URL = `http://www.ctabustracker.com/bustime/api/v2/getvehicles?key=${ctaKey}&format=json&rt=126`;

function apiCall() {
  fetch(URL)
    .then(parseJSON)
    .then(displayBusLocation);
}

function parseJSON(response) {
  console.log(response);
  return response.json().then(data => data['bustime-response'].vehicle);
}

function displayBusLocation(data) {
  const vehicle = data[0];

  let lat = vehicle.lat;
  let lon = vehicle.lon;
  
  console.log(lon);
}

apiCall();
