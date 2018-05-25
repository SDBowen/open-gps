const key = config.mapsKey;

document.getElementById('menu-toggle').addEventListener('click', (e) => {
  document.getElementById('wrapper').classList.toggle('displayMenu');
  e.preventDefault();
});

function initialize() {
  const mapOptions = {
    center: new google.maps.LatLng(40.435833800555567, -78.44189453125),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 11,
  };
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

initialize();
