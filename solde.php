<?php

if(isset($_GET["numero"])){
$num =$_GET["numero"];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "senmoneydb";
$data = array();

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT solde FROM compte where numero='$num'";
$result = $conn->query($sql);

 if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($data,$row);
  }
} 
else {
  echo "0 results";
}
echo json_encode($data);
$conn->close();
}
else{
    $data = "no data";
    echo json_encode($data);
}
?>