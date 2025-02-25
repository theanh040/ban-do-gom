<?php
// Bật CORS
header("Access-Control-Allow-Origin: *"); // Cho phép tất cả các nguồn truy cập
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Cho phép các phương thức HTTP
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Kiểm tra nếu là request OPTIONS, dừng xử lý để trình duyệt không chặn
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../config/db.php");

// Nhận `category_id` từ URL
$category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : 0;

// Nếu có `category_id`, lọc sản phẩm theo danh mục
if ($category_id > 0) {
    $sql = "SELECT * FROM products WHERE category_id = $category_id";
} else {
    $sql = "SELECT * FROM products";
}

$result = mysqli_query($conn, $sql);
$products = [];

while ($row = mysqli_fetch_assoc($result)) {
    // Xử lý đường dẫn ảnh
    $row['image'] = "/BE/" . $row['image']; // Gắn đúng đường dẫn ảnh
    $products[] = $row;
}

echo json_encode($products);
$conn->close();
?>
