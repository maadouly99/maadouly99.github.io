<?php


$success["success"] = false;
if(isset($_GET["emeteur"])){
$emeteur =$_GET["emeteur"];
$recepteur=$_GET['recepteur'];
$montant=$_GET["montant"];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "senmoneydb";
$depot = "depot";
$retrait = "retrait";
$data = array();


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$sql = "INSERT INTO `transaction` (`id`, `numero`, `mouvement`, `montant`) VALUES (NULL, '$emeteur', '$retrait', '$montant');";
$result = $conn->query($sql);
if($result == true){
  $sql = "INSERT INTO `transaction` (`id`, `numero`, `mouvement`, `montant`) VALUES (NULL, '$recepteur','$depot', '$montant');";
  $result = $conn->query($sql);
  if ($result == true) {
    $sql = "SELECT solde FROM compte WHERE numero='$emeteur';";
    $result = $conn->query($sql);
    while($row = $result->fetch_assoc()) {
        $solde = $row['solde'];}
    $solde = $solde - (int)$montant;
    $sql = "UPDATE `numero` SET `solde` = '$solde' WHERE `numero` ='$emeteur';";
    $result = $conn->query($sql);

    $sql = "SELECT solde FROM compte WHERE numero='$recepteur';";
    $result = $conn->query($sql);
    while($row = $result->fetch_assoc()) {
    $solde = $row['solde'];}
    $solde = $solde + (int)$montant;
    $sql = "UPDATE `numero` SET `solde` = '$solde' WHERE `numero` ='$recepteur';";
    $result = $conn->query($sql);
    $success["success"]= true;
  }
}

 
$conn->close();
}
echo json_encode($success);
?>