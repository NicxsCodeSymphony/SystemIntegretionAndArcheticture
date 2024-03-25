<?php
include "php/connection.php";

try {
    $query = "select * from category_table";
    $statement = $connection->prepare($query);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Modify the result to include category_name along with category_id
    $categories = array_map(function($item) {
        return [
            'category_id' => $item['category_id'],
            'category_name' => $item['category_name']
        ];
    }, $result);

    echo json_encode($categories);
} catch (PDOException $th) {
    echo json_encode(['error' => $th->getMessage()]);
}
