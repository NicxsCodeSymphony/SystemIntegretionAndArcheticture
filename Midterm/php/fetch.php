<?php
include "connection.php";
session_start();

$loggedInID = $_SESSION['id']; 
$query = "SELECT * FROM accounts WHERE id != $loggedInID AND id NOT IN (SELECT friend_id FROM friends WHERE user_id = $loggedInID)";
$result = mysqli_query($conn, $query);

$people = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $people[] = $row;
    }
}

echo json_encode($people);

?>
