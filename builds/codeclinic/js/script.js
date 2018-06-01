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

    let link = document.createElement('a');
    link.href =
      'https://google.com/maps/search/?api=1&query=' +
      latitude +
      ',' +
      longitude;

    let img = document.createElement('img');

    img.className = 'img-fluid';
    img.src =
      'https://maps.googleapis.com/maps/api/staticmap?center=' +
      latitude +
      ',' +
      longitude +
      '&markers=color:red|' +
      latitude +
      ',' +
      longitude +
      '&zoom=12&size=600x300&scale=2';

    link.appendChild(img);
    myMap.appendChild(link);
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
