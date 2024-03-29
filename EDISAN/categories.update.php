<?php

include('dbconnect.php');

try {
    $id = $_POST['id'];  
    $name = $_POST['name']; 

    $query = "UPDATE sample SET category_name = :name WHERE category_id = :id";
    $statement = $connection->prepare($query);
    $statement->bindParam(':id', $id);
    $statement->bindParam(':name', $name);
    $result = $statement->execute();

    if ($result) {
        echo json_encode(['res' => 'success']);
    } else {
        echo json_encode(['res' => 'error']);
    }
} catch (PDOException $th) {
    echo json_encode(['res' => 'error', 'message' => $th->getMessage()]);
}
