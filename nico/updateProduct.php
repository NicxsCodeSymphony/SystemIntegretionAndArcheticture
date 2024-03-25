<?php
include "php/connection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productId = $_POST['id'];
    $productName = $_POST['name'];
    $productcategory_id = $_POST['category'];
    $productQuantity = $_POST['quantity'];

    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'components/images/';
        $tempFilePath = $_FILES['photo']['tmp_name'];
        $fileName = uniqid() . '_' . $_FILES['photo']['name'];
        $targetFilePath = $uploadDir . $fileName;

        if (move_uploaded_file($tempFilePath, $targetFilePath)) {
            try {
                $query = "UPDATE prelim_table SET name = :name, category_id = :category_id, quantity = :quantity, photo = :photo WHERE product_id = :id";
                $statement = $connection->prepare($query);
                $statement->bindParam(':name', $productName);
                $statement->bindParam(':category_id', $productcategory_id);
                $statement->bindParam(':quantity', $productQuantity);
                $statement->bindParam(':photo', $fileName);
                $statement->bindParam(':id', $productId);
                $statement->execute();

                echo json_encode(["res" => "success"]);
            } catch (PDOException $th) {
                echo json_encode(['res' => 'error', 'message' => $th->getMessage()]);
            }
        } else {
            echo json_encode(['res' => 'error', 'message' => 'Failed to move uploaded file.']);
        }
    } else {
        try {
            $query = "UPDATE prelim_table SET name = :name, category_id = :category_id, quantity = :quantity WHERE product_id = :id";
            $statement = $connection->prepare($query);
            $statement->bindParam(':name', $productName);
            $statement->bindParam(':category_id', $productcategory_id);
            $statement->bindParam(':quantity', $productQuantity);
            $statement->bindParam(':id', $productId);
            $statement->execute();

            echo json_encode(["res" => "success"]);
        } catch (PDOException $th) {
            echo json_encode(['res' => 'error', 'message' => $th->getMessage()]);
        }
    }
} else {
    echo json_encode(['res' => 'error', 'message' => 'Invalid request method']);
}
?>
