<?php
include "connection.php";
session_start();

$loggedInUsername = $_SESSION['username']; 
$query = "SELECT * FROM accounts WHERE username != '$loggedInUsername'"; 
$result = mysqli_query($conn, $query);

$people = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $people[] = $row;
    }
}

echo json_encode($people);
?>
