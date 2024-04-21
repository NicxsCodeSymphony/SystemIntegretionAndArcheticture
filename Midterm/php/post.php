<?php
include 'connection.php';

$userId = $_POST['id'];
$caption = $_POST['caption'];
$imagePost = $_POST['imagePost'];

$sql = "INSERT INTO post (user_id, caption, imagePost) VALUES ('$userId', '$caption', '$imagePost')";

if ($conn->query($sql) === TRUE) {
    $response = array('res' => 'success');
} else {
    $response = array('res' => 'error', 'message' => $conn->error);
}

$conn->close(); // add the missing semicolon here

echo json_encode($response);
?>
