<?php
include_once "php/connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $categoryName = $_POST['name'];

    try {
        $query = "INSERT INTO category_table (category_name) VALUES (:name)";
        $statement = $connection->prepare($query);
        $statement->bindParam(':name', $categoryName);
        $statement->execute();

        echo json_encode(["res" => "success"]);
    } catch (PDOException $th) {
        echo json_encode(['res' => 'error', 'message' => $th->getMessage()]);
    }
} else {
    echo json_encode(['res' => 'error', 'message' => 'Invalid request method']);
}
?>
