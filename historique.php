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

$sql = "SELECT `mouvement`,`montant` FROM `transaction` WHERE `numero`='$num' ORDER BY `id` DESC LIMIT 5";
$result = $conn->query($sql);

 if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    array_push($data,$row);
  }
}
echo json_encode($data);
$conn->close();
}
else{
    echo json_encode($data);
}
?>