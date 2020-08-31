<?php
  header('Access-Control-Allow-Origin: *');
  date_default_timezone_set('US/Eastern');

  //Database Connection Object
  class c_db{
    private $host='';
    private $user='';
    private $db='';
    private $pass='';
    public $conn;

    public function __construct(){
      $this->conn = new PDO('mysql:host='.$this->host.';dbname='.$this->db. ';charset=utf8',$this->user,$this->pass);
      $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   }
  }

  //Data selector object
  class c_table{
    private $fromDate = '2020-08-01 00:00'; //default value
    private $toDate = '2020-08-01 00:10'; //default value

    private $table = "SELECT JSON_OBJECT( 'barometric_pressure', JSON_ARRAYAGG(`applicant_name`), 
                                          'reading_date', JSON_ARRAYAGG(`applicant_zip`)
                                         ) as `result`
      FROM `lake` WHERE `reading_date` BETWEEN :fromDate AND :toDate;"; //Preparing SQL statement

    public function data($p_filed, $p_data){
      //Validator and value setter
      $l_date = date('Y-m-d', strtotime($p_data));
      switch ($p_filed) {
        case 'fromDate':
          $this->fromDate = $l_date;
        break;
        case 'toDate':
          $this->toDate = $l_date;
        break;
      }
    }

    public function request(){
      //Connecting to DB
      $l_s = new c_db();
      $l_sth = $l_s->conn->prepare($this->table, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

      //Binding values to prepared statement
      $l_sth->bindValue(':fromDate', $this->fromDate, PDO::PARAM_STR);
      $l_sth->bindValue(':toDate', $this->toDate, PDO::PARAM_STR);

      try {
        //Requesting DB
        $l_sth->execute();
        //Fetching results
        $this->rows = $l_sth->fetchAll(PDO::FETCH_ASSOC);
        //Closing DB connection
        $l_s->conn = null;
      } catch (\Exception $e) {
        //Closing DB connection
        $l_s->conn = null;
        //Reporting error
        die(json_encode($e));
      }

    }

  }

$entityBody = file_get_contents('php://input');
$data = json_decode($entityBody);

//Calling parametered data from DB
$l_r = new c_table();
$l_r->data('fromDate', $data->fromDate);
$l_r->data('toDate', $data->toDate);
$l_r->request();

//Showing result
echo $l_r->rows[0]['result'];



?>
