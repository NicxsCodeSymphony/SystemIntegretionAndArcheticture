<?php
include_once "php/connection.php";

try {
    $query = "SELECT p.product_id, p.name, p.category_id, p.quantity, p.photo, c.category_name 
              FROM prelim_table p 
              INNER JOIN category_table c ON p.category_id = c.category_id";
    $statement = $connection->prepare($query);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $th) {
    echo json_encode(['error' => $th->getMessage()]);
}
