(function() {
  let fromDate = '2015-01-01';
  let fromTime = '01:00:00';

  let toDate = '2015-01-01';
  let toTime = '10:00:00';

  function generateChart(data) {
    c3.generate({
      data: {
        y: 'barometric_pressure',
        x: 'dates',
        xFormat: '%Y-%m-%d %H:%M:%S',
        json: data,
        type: 'scatter',
        types: {
          barometric_pressure: 'scatter',
          coefficient: 'line'
        }
      },
      point: {
        show: false
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            count: 4,
            format: '%Y-%m-%d %H:%M:%S'
          }
        }
      }
    });
  }

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
        let pressure =
          response.barometric_pressure;
        let sum = pressure.reduce(
          (a, b) => a + b
        );
        let size = pressure.length;
        let avg = sum / size;
        let begx = (pressure[0] + avg) / 2;
        let endx = (pressure[size - 1] + avg) / 2;
        let slope = (endx - begx) / size;

        // response.average = pressure.map(
        //   () => avg
        // );

        // response.delta = pressure.map(
        //   x => (x + avg) / 2
        // );

        response.coefficient = pressure.map(
          (x, i) => begx + i * slope
        );
        generateChart(response);
      })
      .catch(error => console.error(error));
  }

  loadChart();
})();
