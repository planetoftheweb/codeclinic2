$(function() {
  function generateChart(data) {
    var chart = c3.generate({
      data: {
        y: 'barometric_pressure',
        x: 'keys',
        xFormat: '%Y-%m-%d %H:%M:%S',
        json: data,
        type: 'spline',
        types: {
          barometric_pressure: 'scatter',
          average: 'line',
          delta: 'line'
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
      },
      subchart: {
        show: true //subchart
      }
    }); // chart
  } // generateChart

  function loadChart() {
    $.ajax({
      url: 'http://pixelprowess.com/i/lake.php',
      dataType: 'json',
      data: {
        // startDate: formatDate(fromDate, ''),
        // endDate: formatDate(toDate, ''),
        format: 'json'
      },
      success: function(response) {
        var sum = response.barometric_pressure.reduce((a, b) => a + b, 0);
        var size = response.barometric_pressure.length;
        var avg = sum / size;
        var begx = (response.barometric_pressure[0] + avg) / 2;
        var endx = (response.barometric_pressure[size - 1] + avg) / 2;
        var slope = (endx - begx) / size;

        // response.average = response.barometric_pressure.map(function(x) {
        //   return avg;
        // });

        // response.delta = response.barometric_pressure.map(function(x) {
        //   return (x + avg) / 2;
        // });

        response.coefficient = response.barometric_pressure.map(function(x, i) {
          return begx + i * slope;
        });

        generateChart(response);
      } //success
    }); //AJAX Call
  } //load Chart

  loadChart();

  document.forms.rangeform.addEventListener(
    'change',
    function(e) {
      fromDate = new Date(document.rangeform.from.value);
      toDate = new Date(document.rangeform.to.value);

      fromDate = fromDate.toUTCString();
      toDate = toDate.toUTCString();

      loadChart();
    },
    false
  );
}); // Page Loaded
//# sourceMappingURL=script.js.map
