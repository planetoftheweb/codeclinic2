(function() {
  let fromDate = '2015-01-01';
  let fromTime = '01:00:00';

  let toDate = '2015-01-01';
  let toTime = '10:00:00';

  function loadChart() {
    fetch('http://pixelprowess.com/i/lake.php', {
      method: 'POST',
      body: JSON.stringify({
        fromDate: fromDate + ' ' + fromTime,
        toDate: toDate + ' ' + toTime
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error(error));
  }

  loadChart();
})();
