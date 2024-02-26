<?php

$servername = "localhost";
$username = "root";
$password ="";
$db = "sampledb";


try{
    $connection = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOExcepton $th){
    echo "Connection Failed". $th->getMessage();
}
?>