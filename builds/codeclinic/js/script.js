(function() {
  let myMap = document.querySelector('.my-map');
  if (!navigator.geolocation) {
    myMap.innerHTML =
      '<p>Geolocation not supported by your browser</p>';
    return;
  }

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let img = document.createElement('img');

    img.className = 'img-fluid';
    img.src =
      'https://maps.googleapis.com/maps/api/staticmap?center=' +
      latitude +
      ',' +
      longitude +
      '&zoom=12&size=600x300';

    myMap.appendChild(img);
  }

  function error() {
    map.innerHTML =
      'Unable to retrieve your location';
  }

  navigator.geolocation.getCurrentPosition(
    success,
    error
  );
})();
