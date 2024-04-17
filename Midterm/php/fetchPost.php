<?php
include "connection.php";
session_start();

$loggedInID = $_SESSION['id']; 
$query = "SELECT post.*, accounts.username, accounts.name FROM post JOIN accounts ON post.user_id = accounts.id";
$result = mysqli_query($conn, $query);

$people = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $people[] = $row;
    }
}

echo json_encode($people);

?>
