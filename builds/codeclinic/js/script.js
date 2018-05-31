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
    console.log(latitude);
    console.log(longitude);
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
