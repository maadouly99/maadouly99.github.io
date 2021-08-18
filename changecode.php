<?php


$success["success"]= false;
if(isset($_GET["id"])){
$id = $_GET["id"];
$code = $_GET["code"];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "senmoneydb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = " UPDATE `compte` SET `code` = '$code' WHERE `client`.`id` = '$id'; ";
$result = $conn->query($sql);
$success["success"]= $result;
  echo json_encode($success);
}
else{
    $data = "no data";
    echo json_encode($success);
}

?>