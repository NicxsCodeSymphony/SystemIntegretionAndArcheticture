<?php

include ('dbconnect.php')

$query = "insert into sample(category_name) values ('"$_GET['name']"')";
$statement = $conn->prepare($query);
$res = $statement->execute();

if($res){
    echo "{\"res\" : \"success\"}"
}