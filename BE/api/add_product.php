<?php
include("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productName = $_POST['productName'];
    $productPrice = $_POST['productPrice'];
    $productDescription = $_POST['productDescription'];
    $category_id = $_POST['category_id'];

    // Xử lý ảnh tải lên
    $targetDir = "../uploads/";
    $imageName = basename($_FILES["productImage"]["name"]);
    $targetFilePath = $targetDir . $imageName;
    $imagePathDB = "uploads/" . $imageName; // Chỉ lưu "uploads/filename.jpg" vào DB

    if (move_uploaded_file($_FILES["productImage"]["tmp_name"], $targetFilePath)) {
        $sql = "INSERT INTO products (product_name, price, description, image, category_id) 
                VALUES ('$productName', '$productPrice', '$productDescription', '$imagePathDB', '$category_id')";
        
        if (mysqli_query($conn, $sql)) {
            echo json_encode(["success" => true, "message" => "Sản phẩm đã thêm!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi SQL: " . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi tải ảnh lên."]);
    }
}
?>
