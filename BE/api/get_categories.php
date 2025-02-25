<?php
include '../config/db.php';

$sql = "SELECT category_id, category_name FROM categories";
$result = $conn->query($sql);

$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

if (empty($categories)) {
    echo json_encode(["success" => false, "message" => "Không có danh mục nào"]);
} else {
    echo json_encode($categories);
}

$conn->close();
?>
