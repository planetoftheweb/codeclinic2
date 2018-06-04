<?php
  header('Access-Control-Allow-Origin: http://localhost:3000');
  $host="";
  $user="";
  $password="";
  $dbname="";

  date_default_timezone_set('US/Eastern');

  $con=mysqli_connect($host, $user, $password, $dbname);
  // Check connection
  if (mysqli_connect_errno())
    {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

  $sql="SELECT TIME(time_stamp) as time_stamp, pulsometer_readout, engine_efficiency, red_value, blue_value, green_value from dashboard WHERE TIME(time_stamp)=TIME(CURTIME()) limit 1";
  $result=mysqli_query($con, $sql);


  // Numeric array
  $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
  echo "{
    \"time_stamp\": \"".$row['time_stamp']."\",
    \"pulsometer_readout\": ".$row['pulsometer_readout'].",
    \"engine_efficiency\": ".$row['engine_efficiency'].",
    \"red_value\": ".$row['red_value'].",
    \"green_value\": ".$row['green_value'].",
    \"blue_value\": ".$row['blue_value']."
  }";
  mysqli_close($con);
?>
