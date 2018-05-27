/* eslint-env browser */
const key = config.mapsKey;

document.getElementById('sidebarCollapse').addEventListener('click', (e) => {
  document.getElementById('sidebar').classList.toggle('active');
  e.preventDefault();
});

const position = [27.1959739, 78.02423269999997];

function loadScript() {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=showGoogleMaps`;
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', loadScript);

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

  const map = new google.maps.Map(
    document.getElementById('googleMap'),
    mapOptions,
  );

  // Show the default red marker at the location
  const marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  });
}

