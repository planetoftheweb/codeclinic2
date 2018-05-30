(function() {
  function loadChart() {
    fetch('http://pixelprowess.com/i/lake.php', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error(error));
  }

  loadChart();
})();
