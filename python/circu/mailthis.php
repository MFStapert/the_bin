<?php
// the message
$name = $_POST["name"];
$email = $_POST["email"];
$msg = $_POST["message"];

$mesage = "Naam: " . $name . " email: " . $email . " bericht: " . $msg;
// send email
mail("info@circu.nl", "Contactform", $mesage);

header("Location: https://circu.nl");
die();
?>
