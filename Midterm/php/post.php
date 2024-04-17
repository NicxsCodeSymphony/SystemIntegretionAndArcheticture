<?php

include 'connection.php';

$userId = $_POST['id'];
$caption = $_POST['caption'];
$image = $_POST['image'];


$sql = "INSERT INTO post (user_id, caption, image) VALUES ('$userId', '$caption', '$image')";

if ($conn->query($sql) === TRUE) {
    $response = array('res' => 'success');
} else {
    $response = array('res' => 'error', 'message' => $conn->error);
}


$conn->close();

echo json_encode($response);
?>
