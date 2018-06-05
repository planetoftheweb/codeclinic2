$(function() {
  var data_red = ['red'];
  var data_green = ['green'];
  var data_blue = ['blue'];

  var chart = c3.generate({
    data: {
      columns: [['red'], ['green'], ['blue']]
    },
    axis: {
      y: {
        max: 300,
        min: 0
      }
    },
    color: {
      pattern: ['#dc3545', '#28a745', '#007bff']
    }
  });

  setInterval(function() {
    $.ajax({
      url: 'http://pixelprowess.com/i/stream.php',
      dataType: 'json',
      success: function(data) {
        $('#progress-red').css(
          'width',
          data.red_value / 255 * 100 + '%'
        );
        $('#progress-red').text(data.red_value);
        $('#progress-green').css(
          'width',
          data.green_value / 255 * 100 + '%'
        );
        $('#progress-green').text(data.green_value);
        $('#progress-blue').css(
          'width',
          data.blue_value / 255 * 100 + '%'
        );
        $('#progress-blue').text(data.blue_value);

        $('#current-color').css(
          'backgroundColor',
          'rgb(' +
            data.red_value +
            ', ' +
            data.green_value +
            ',' +
            data.blue_value +
            ')'
        );

        $('#time-stamp').text(data.time_stamp);

        $('#progress-pulsometer').css(
          'width',
          (data.pulsometer_readout - 1) / 255 * 100 + '%'
        );
        $('#progress-pulsometer').text(
          data.pulsometer_readout
        );

        $('#progress-efficiency').css(
          'width',
          data.engine_efficiency / 100 * 100 + '%'
        );
        $('#progress-efficiency').text(
          data.engine_efficiency
        );

        if (data_red.length > 10) {
          data_red.splice(1, 1);
          data_green.splice(1, 1);
          data_blue.splice(1, 1);
        }

        data_red.push(data.red_value);
        data_green.push(data.green_value);
        data_blue.push(data.blue_value);

        chart.load({
          columns: [data_red, data_green, data_blue]
        }); //load
      }
    });
  }, 1000);
});
