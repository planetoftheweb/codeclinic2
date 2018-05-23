$(function () {

  var myMap = document.querySelector('.my-map');

  if (!navigator.geolocation){
    myMap.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    myMap.innerHTML = '<p><strong>Latitude</strong>: ' + latitude + '° <br><strong>Longitude</strong>: ' + longitude + '°</p>';

    var link = document.createElement('a');
      link.href = 'https://www.google.com/maps/search/?api=1&query='
      + latitude + ',' + longitude;

    var img = document.createElement('img');
      img.className = 'img-fluid';
      img.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
      latitude + ',' + longitude +
      '&markers=color:red|' + latitude + ',' + longitude +
      '&zoom=12&size=600x300&scale=2&sensor=true';

      link.appendChild(img);
      myMap.appendChild(link);
  }

  function error() {
    myMap.innerHTML = 'Unable to retrieve your location';
  }

  myMap.innerHTML = '<p>Locating…</p>';

  navigator.geolocation.getCurrentPosition(success, error);

}); // Page Loaded

// https://developers.google.com/maps/documentation/maps-static/intro
// https://developers.google.com/maps/documentation/urls/guide