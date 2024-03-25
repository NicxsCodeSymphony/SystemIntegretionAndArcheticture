<?php 
include_once "php/connection.php";

if(isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'components/images/';
    $tempFilePath = $_FILES['photo']['tmp_name'];
    $fileName = uniqid() . '_' . $_FILES['photo']['name'];
    $targetFilePath = $uploadDir . $fileName;
    if(move_uploaded_file($tempFilePath, $targetFilePath)) {

        $name = $_POST['name'];
        $category_id = $_POST['category'];
        $quantity = $_POST['quantity'];

        try {
            $query = "INSERT INTO prelim_table (photo, name, category_id, quantity) VALUES (:photo, :name, :category_id, :quantity)";
            $statement = $connection->prepare($query);
            $statement->bindParam(':photo', $fileName); 
            $statement->bindParam(':name', $name);
            $statement->bindParam(':category_id', $category_id);
            $statement->bindParam(':quantity', $quantity);
            $statement->execute();

            echo json_encode(["res" => "success"]);
        } catch (PDOException $th) {
            echo json_encode(['res' => 'error', 'message' => $th->getMessage()]);
        }
    } else {
        echo json_encode(['res' => 'error', 'message' => 'Failed to move uploaded file.']);
    }
} else {
    echo json_encode(['res' => 'error', 'message' => 'Failed to upload file.']);
}
?>
