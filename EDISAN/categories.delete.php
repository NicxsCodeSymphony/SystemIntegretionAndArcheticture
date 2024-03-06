<?php
include('dbconnect.php');

try {
    $id = $_POST['id']; 

    $query = "DELETE FROM sample WHERE category_id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':id', $id);
    $result = $statement->execute();

    if ($result) {
        echo json_encode(['res' => 'success']);
    } else {
        echo json_encode(['res' => 'error']);
    }
} catch (PDOException $th) {
    echo json_encode(['res' => 'error', 'message' => $th->getMessage()]);
}
?>
