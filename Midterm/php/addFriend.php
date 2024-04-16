    <?php

    include 'connection.php';

    $personId = $_POST['personId'];
    $userId = $_POST['userId'];


    $sql = "INSERT INTO friends (user_id, friend_id) VALUES ($userId, $personId)";

    if ($conn->query($sql) === TRUE) {
        $response = array('res' => 'success');
    } else {
        $response = array('res' => 'error', 'message' => $conn->error);
    }


    $conn->close();

    echo json_encode($response);
    ?>
