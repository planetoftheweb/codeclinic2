<?php
  header('Access-Control-Allow-Origin: *');
  date_default_timezone_set('US/Eastern');

  //Database Connection Constants
  $host="";
  $user="";
  $password="";
  $dbname="";

  $entityBody = file_get_contents('php://input');
  $data = json_decode($entityBody);

  if ($entityBody) {
    $fromDate = $data->{'fromDate'};
    $toDate = $data->{'toDate'};
  } else {
    $fromDate = '2015-01-01 00:00';
    $toDate = '2015-01-01 00:10';
  }

  //Connect to the database
  $con=mysqli_connect($host, $user, $password, $dbname);
  // Check connection
  if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $sql="SELECT reading_date, barometric_pressure from lake  WHERE reading_date BETWEEN \"$fromDate\" and \"$toDate\"";
  $result=mysqli_query($con, $sql);

  // Numeric array
  $bp_arr = array();
  $rd_arr = array();

  // create temporary arrays
  while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)) {
    array_push($bp_arr , $row['barometric_pressure']);
    array_push($rd_arr , "\"".$row['reading_date']."\"");
  }

  //output
  echo "{ \"barometric_pressure\": [". join(', ', $bp_arr)."], \"dates\": [". join(', ', $rd_arr)."]}";

  mysqli_close($con);
?>
