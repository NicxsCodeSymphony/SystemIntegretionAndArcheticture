<?php
include "connection.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $location = mysqli_real_escape_string($conn, $_POST['location']);
    $civilStatus = mysqli_real_escape_string($conn, $_POST['civilStatus']);
    $birthdate = mysqli_real_escape_string($conn, $_POST['birthdate']);
    $id = mysqli_real_escape_string($conn, $_POST['id']);

    if ($username != "" && $name != "" && $gender != "" && $location != "" && $civilStatus != "" && $birthdate != "" && $password != "") {
        $query = "UPDATE accounts SET name = '$name', username = '$username', password = '$password', gender = '$gender', location = '$location', civilStatus = '$civilStatus', birthdate = '$birthdate' WHERE id = '$id'";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $_SESSION['name'] = $name; 
            echo json_encode(array("res" => "success", "message" => "Profile updated successfully."));
            exit;
        } else {
            echo json_encode(array("res" => "error", "message" => "Failed to update profile."));
            exit;
        }
    } else {
        echo json_encode(array("res" => "error", "message" => "Please fill in all the fields."));
        exit;
    }
}
?>
