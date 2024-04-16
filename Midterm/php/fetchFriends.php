<?php
include "connection.php";
session_start();

$loggedInID = $_SESSION['id']; 
$query = "SELECT friends.friend_id, accounts.name 
          FROM friends 
          JOIN accounts ON friends.friend_id = accounts.id
          WHERE friends.user_id = $loggedInID";
$result = mysqli_query($conn, $query);

$people = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $people[] = $row;
    }
}

echo json_encode($people);
?>
